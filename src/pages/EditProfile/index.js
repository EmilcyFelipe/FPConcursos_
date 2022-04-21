import React, { useEffect, useState, useContext } from "react";
import { View, Text } from "react-native";

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
  const [email, setEmail] = useState(user.email);

  let userRef = ref(db, "users/" + user.uid);

  function updateProfile() {
    if (name) {
      if (name != user.name) {
        setUser((oldValue) => {
          return { ...oldValue, name: name };
        });
        update(userRef, { name: name });
        navigation.goBack();
      }
    }
  }

  return (
    <Container>
      <InputWrapper>
        <Text>Nome</Text>
        <InputElement
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Nome"
        />
      </InputWrapper>
      <ActionEdit onPress={updateProfile}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Confirmar Edição
        </Text>
      </ActionEdit>
    </Container>
  );
}
