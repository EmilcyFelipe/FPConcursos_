import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import {
  Container,
  Title,
  InputArea,
  Input,
  Submit,
  SubmitText,
} from "./styles";

import { AuthContext } from "../../contexts/auth";

import ContentIcon from "../../assets/content.svg";

import { app } from "../../services/firebaseConnection";
import { set, ref, getDatabase, push } from "firebase/database";

export default function Register() {
  const [orgao, setOrgao] = useState("");
  const [sigla, setSigla] = useState("");
  const [cargo, setCargo] = useState("");
  const [banca, setBanca] = useState("");

  const { user } = useContext(AuthContext);

  const navigation = useNavigation();

  const db = getDatabase(app);

  function addConcurso() {
    if (orgao === "" || sigla === "" || cargo === "" || banca === "") {
      alert("Por favor, preencha todos os campos");
      return;
    }
    const concursosRef = ref(db, "concursos/" + user.uid);
    let key = push(concursosRef);
    set(key, {
      orgao: orgao,
      sigla: sigla,
      cargo: cargo,
      banca: banca,
      timeline: [{}],
      Subjects: [{}],
      performance: [{}],
    })
      .then(() => {
        setOrgao("");
        setSigla("");
        setCargo("");
        setBanca("");
        navigation.navigate("Concursos");
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={{ backgroundColor: "#1C1C1C" }}>
        <Container>
          <Title>Adicione um concurso</Title>
          <View style={{ alignItems: "center" }}>
            <ContentIcon width={200} height={200} />
          </View>
          <InputArea>
            <Input
              placeholder="Órgão..."
              value={orgao}
              onChangeText={(text) => setOrgao(text)}
            />

            <Input
              placeholder="Sigla..."
              value={sigla}
              onChangeText={(text) => setSigla(text)}
            />

            <Input
              placeholder="Cargo..."
              value={cargo}
              onChangeText={(text) => setCargo(text)}
            />

            <Input
              placeholder="Banca..."
              value={banca}
              onChangeText={(text) => setBanca(text)}
            />
          </InputArea>
          <Submit onPress={() => addConcurso()}>
            <SubmitText>Adicionar</SubmitText>
          </Submit>
        </Container>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
