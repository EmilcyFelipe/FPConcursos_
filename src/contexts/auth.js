import React, { createContext, useEffect, useState } from "react";

import app from "../services/firebaseConnection";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { set, ref, push, getDatabase, onValue } from "firebase/database";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState("");
  const [concursoSelected, setConcursoSelected] = useState();

  useEffect(async () => {
    if (user) {
      storageUser(user);
    }
  }, [user]);

  const auth = getAuth(app);
  const db = getDatabase();

  useEffect(async () => {
    try {
      const value = await AsyncStorage.getItem("Auth_user");
      if (value !== null) {
        setUser(JSON.parse(value));
      }
    } catch (e) {
      alert("Error ao carregar usuário");
    }
    try {
      const concursoValue = await AsyncStorage.getItem("@concurso_Selected");
      if (concursoValue !== null) {
        console.log("caiu");
        setConcursoSelected(concursoValue);
      } else {
        let concursosRef = ref(db, "concursos/" + user.uid);
        onValue(
          concursosRef,
          (snapshot) => {
            if (snapshot.exists()) {
              Object.keys(snapshot.val()).length > 0
                ? setConcursoSelected(Object.keys(snapshot.val())[0])
                : setConcursoSelected();
            }
          },
          { onlyOnce: true }
        );
      }
    } catch (e) {
      alert(e.message + "1");
    }
  }, []);

  function signIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((value) => {
        let uid = value.user.uid;
        let userRef = ref(db, "users/" + uid);
        onValue(
          userRef,
          (snapshot) => {
            let data = {
              name: snapshot.val().name,
              uid: uid,
              email: snapshot.val().email,
              genrer: snapshot.val().genrer,
            };
            setUser(data);
            storageUser(data);
          },
          { onlyOnce: true }
        );
      })
      .catch((error) => {
        alert(error.message + "2");
      });
  }

  function signUp(name, email, password, genrer) {
    createUserWithEmailAndPassword(auth, email, password, genrer)
      .then((value) => {
        let uid = value.user.uid;
        const userRef = ref(db, "users/" + uid);
        set(userRef, {
          name: name,
          uid: uid,
          email: email,
          genrer: genrer ? "F" : "M",
        })
          .then(() => {
            let data = {
              name: name,
              uid: uid,
              email: email,
              genrer: genrer ? "F" : "M",
            };
            setUser(data);
            storageUser(data);
          })
          .catch((error) => {
            alert(error.message + "3");
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  function logOut() {
    signOut(auth)
      .then(() => {
        setUser(null);
        storageUser("");
        storageConcursoSelected("");
        alert("usuário deslogado");
      })
      .catch((error) => {
        alert(error.message + "4");
      });
  }

  async function storageUser(data) {
    try {
      await AsyncStorage.setItem("Auth_user", JSON.stringify(data));
    } catch (error) {
      alert(error.message + "5");
    }
  }

  async function storageConcursoSelected(data) {
    try {
      if (data === null || data === undefined || data === "") {
        await AsyncStorage.removeItem("@concurso_Selected", () => {
          alert("removido");
          setConcursoSelected("");
        });
      } else {
        await AsyncStorage.setItem("@concurso_Selected", JSON.stringify(data));
      }
    } catch (error) {
      alert(error.message + "6");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signed: !!user,
        user,
        setUser,
        storageUser,
        storageConcursoSelected,
        signIn,
        logOut,
        concursoSelected,
        setConcursoSelected,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
