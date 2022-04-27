import React, { useEffect, useState, useContext } from "react";
import { View, Text, Switch } from "react-native";

import { Container, InputWrapper, InputElement, ActionEdit } from "./styles";

import { AuthContext } from "../../contexts/auth";
import app from "../../services/firebaseConnection";
import { getDatabase, onValue, ref, update } from "firebase/database";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditProfile() {
  const { user, setUser, storageUser } = useContext(AuthContext);
  const navigation = useNavigation();

  const db = getDatabase(app);

  const [name, setName] = useState(user.name);
  const [genrer, setGenrer] = useState(user.genrer === "F" ? true : false);

  let userRef = ref(db, "users/" + user.uid);

  function updateProfile() {
    let genrerString = genrer ? "F" : "M";
    if (name) {
      if (name != user.name || genrerString != user.genrer) {
        setUser((oldValue) => {
          return { ...oldValue, name: name, genrer: genrer ? "F" : "M" };
        });
        update(userRef, { name: name, genrer: genrer ? "F" : "M" });
        navigation.goBack();
      }
    }
  }
  useEffect(() => {
    console.log(user.genrer);
  }, [user]);

  return (
    <Container>
      <InputWrapper>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Nome</Text>
        <InputElement
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Nome"
        />
        <Text style={{ color: "#fff", fontWeight: "bold", marginTop: 20 }}>
          Genrer
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>M</Text>
          <Switch
            value={genrer}
            onValueChange={(value) => {
              setGenrer(value);
            }}
          />
          <Text style={{ color: "#fff", fontWeight: "bold" }}>F</Text>
        </View>
      </InputWrapper>
      <ActionEdit onPress={updateProfile}>
        <Text style={{ fontWeight: "bold", fontSize: 16, color: "#fff" }}>
          Confirmar Edição
        </Text>
      </ActionEdit>
    </Container>
  );
}
