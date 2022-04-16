import React, { useState, useContext, useEffect } from "react";
import { Text } from "react-native";
import { HomeContext } from "../../contexts/home";
import { AuthContext } from "../../contexts/auth";

import { Feather } from "@expo/vector-icons";

import { Container, Title, Button, Subtitle } from "./styles";
import { useNavigation } from "@react-navigation/native";

import app from "../../services/firebaseConnection";
import { getDatabase, ref, onValue } from "firebase/database";

export default function Header({ data, goBack, concursoSelected }) {
  const db = getDatabase(app);
  const { user } = useContext(AuthContext);
  const [concursoCargo, setConcursoCargo] = useState();
  const [concursoSigla, setConcursoSigla] = useState();
  useEffect(() => {
    const concursoRef = ref(
      db,
      "concursos/" + user.uid + "/" + concursoSelected
    );

    onValue(
      concursoRef,
      (snapshot) => {
        if (concursoSelected) {
          setConcursoCargo(snapshot.val().cargo);
          setConcursoSigla(snapshot.val().sigla);
        } else {
          setConcursoCargo("Selecione um concurso");
          setConcursoSigla("");
        }
      },
      { onlyOnce: true }
    );
  }, [concursoSelected]);

  function headerButton() {
    if (goBack) {
      navigation.goBack();
    } else {
      navigation.toggleDrawer();
    }
  }

  const navigation = useNavigation();
  return (
    <Container>
      <Button
        onPress={() => {
          headerButton();
        }}
      >
        {goBack ? (
          <Feather name="arrow-left" size={24} color="#fff" />
        ) : (
          <Feather name="menu" size={24} color="#fff" />
        )}
      </Button>
      <Title>{concursoCargo}</Title>
      <Subtitle>{concursoSigla}</Subtitle>
    </Container>
  );
}
