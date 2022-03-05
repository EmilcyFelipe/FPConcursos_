import React, { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity, Modal, Keyboard } from "react-native";

import { Container, TitleWrapper } from "./styles";

import Header from "../../components/Header";
import MenuSubmenu from "../../components/MenuSubmenu";
import ModalSubject from "../../components/ModalSubject";

import { getDatabase, onValue, push, ref, set } from "firebase/database";
import app from "../../services/firebaseConnection";

import { AuthContext } from "../../contexts/auth";
import { HomeContext } from "../../contexts/home";

export default function Subjects() {
  const { user } = useContext(AuthContext);
  const { concursoSelected } = useContext(HomeContext);

  const db = getDatabase(app);
  const subjectRef = ref(db, "concursos/" + user.uid + "/" + concursoSelected);

  const [subObject, setSubsObject] = useState([
    {
      name: "Portugues",
      matters: [
        { name: "Pronome" },
        { name: "Vírgula" },
        { name: "Acentuação" },
      ],
    },
    {
      name: "Raciocínio Logico",
      matters: [
        { name: "Arranjo" },
        { name: "Combinação" },
        { name: "Algebra" },
      ],
    },
    {
      name: "Constitucional",
      matters: [
        { name: "Principios" },
        { name: "Objetivos" },
        { name: "blablabla" },
      ],
    },
  ]);
  useEffect(() => {
    console.log(concursoSelected);
  }, [concursoSelected]);

  const [modalVisible, setModalVisible] = useState(false);

  function handleAdd() {
    setModalVisible(true);
  }
  function addSubject(value) {
    const subjectKey = push(subjectRef);
    set(subjectKey, {
      name: value,
    });
    setSubsObject([...subObject, { name: value, matters: [] }]);
    setModalVisible(false);
    Keyboard.dismiss();
  }

  let subjectMenu = subObject.map((item) => <MenuSubmenu data={item} />);
  return (
    <Container>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <ModalSubject shows={setModalVisible} addSubject={addSubject} />
      </Modal>
      <Header goBack={true} />
      <TitleWrapper>
        <Text style={{ color: "#3865A8", fontSize: 20 }}>
          Conteúdo Sintético
        </Text>
        <TouchableOpacity onPress={handleAdd}>
          <Text style={{ color: "#fff", fontSize: 18 }}>Adicionar</Text>
        </TouchableOpacity>
      </TitleWrapper>
      {subjectMenu}
    </Container>
  );
}
