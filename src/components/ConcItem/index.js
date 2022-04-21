import React, { useContext, useState } from "react";
import { View, Text, Modal, Alert } from "react-native";

import app from "../../services/firebaseConnection";
import { getDatabase, ref, remove } from "firebase/database";

import { Container, ConcText } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ConcItem({ data }) {
  const {
    user,
    concursoSelected,
    setConcursoSelected,
    storageConcursoSelected,
  } = useContext(AuthContext);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const db = getDatabase(app);

  async function setConcursoAndGoHome() {
    setConcursoSelected(data.key);
    navigation.navigate("Home", { selectedData: data });
    try {
      await AsyncStorage.setItem("@concurso_Selected", data.key);
    } catch (e) {
      alert(e.message);
    }
  }

  function handleDelete() {
    Alert.alert(
      `Deseja excluir ${data.cargo} - ${data.orgao}?`,
      "Essa ação não é reversível!",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: () => {
            deleteConcurso();
          },
        },
      ]
    );
  }

  function deleteConcurso() {
    let concursoRef = ref(db, "concursos/" + user.uid + "/" + data.key);
    if (concursoSelected === data.key) {
      setConcursoSelected();
      storageConcursoSelected();
    }
    remove(concursoRef);
  }
  return (
    <Container
      style={{
        borderWidth: 2,
        borderColor: concursoSelected === data.key ? "#FF5C00" : "#1C1C1C",
      }}
      onPress={setConcursoAndGoHome}
      onLongPress={handleDelete}
    >
      <ConcText>{data.orgao}</ConcText>
      <ConcText>{data.cargo}</ConcText>
    </Container>
  );
}
