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
  const [user, setUser] = useState();

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
        alert(error.message);
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
            alert(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function logOut() {
    signOut(auth)
      .then(() => {
        setUser(null);
        storageUser("");
        alert("usuário deslogado");
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  async function storageUser(data) {
    try {
      await AsyncStorage.setItem("Auth_user", JSON.stringify(data));
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <AuthContext.Provider
      value={{ signUp, signed: !!user, user, signIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
