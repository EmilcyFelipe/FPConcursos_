import React, { useState, useContext, useEffect } from "react";
import { Text, View, Dimensions } from "react-native";
import { AuthContext } from "../../contexts/auth";

import { Feather } from "@expo/vector-icons";

import { Container, Title, Button, Subtitle } from "./styles";
import { useNavigation } from "@react-navigation/native";

import app from "../../services/firebaseConnection";
import { getDatabase, ref, onValue, get } from "firebase/database";

export default function Header({ goBack }) {
  const db = getDatabase(app);
  const { user, concursoSelected } = useContext(AuthContext);
  const [concursoCargo, setConcursoCargo] = useState();
  const [concursoSigla, setConcursoSigla] = useState();
  useEffect(() => {
    let concursoRef = ref(db, "concursos/" + user.uid + "/" + concursoSelected);
    onValue(
      concursoRef,
      (snapshot) => {
        if (snapshot.exists()) {
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
      <View style={{ maxWidth: Dimensions.get("window").width * 0.65 }}>
        <Title numberOfLines={1}>{concursoCargo}</Title>
      </View>
      <Subtitle>{concursoSigla}</Subtitle>
    </Container>
  );
}
