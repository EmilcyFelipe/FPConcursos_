import React, { useContext } from "react";

import { Container, ConcText } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ConcItem({ data }) {
  const { concursoSelected, setConcursoSelected } = useContext(AuthContext);
  const navigation = useNavigation();

  async function setConcursoAndGoHome() {
    setConcursoSelected(data.key);
    navigation.navigate("Home", { selectedData: data });
    try {
      await AsyncStorage.setItem("@concurso_Selected", data.key);
    } catch (e) {
      alert(e.message);
    }
  }
  return (
    <Container onPress={setConcursoAndGoHome}>
      <ConcText>{data.orgao}</ConcText>
      <ConcText>{data.cargo}</ConcText>
      <ConcText>{data.key}</ConcText>
    </Container>
  );
}
