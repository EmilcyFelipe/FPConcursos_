import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Keyboard,
  FlatList,
} from "react-native";

import { Container, TitleWrapper } from "./styles";

import Header from "../../components/Header";
import MenuSubmenu from "../../components/MenuSubmenu";
import ModalSubject from "../../components/ModalSubject";
import ModalSubmenu from "../../components/ModalSubmenu";

import { AuthContext } from "../../contexts/auth";
import { HomeContext } from "../../contexts/home";

import { getDatabase, onValue, push, ref, set } from "firebase/database";
import app from "../../services/firebaseConnection";

export default function Subjects({ route }) {
  const { user, concursoSelected } = useContext(AuthContext);

  const db = getDatabase(app);
  const subjectRef = ref(
    db,
    "concursos/" + user.uid + "/" + concursoSelected + "/subjects"
  );

  const [subsObject, setSubsObject] = useState([]);

  useEffect(() => {
    onValue(subjectRef, (snapshot) => {
      setSubsObject([]);
      snapshot.forEach((childItem) => {
        if (childItem.val().matters) {
          var matters = [];
          var obj = childItem.val().matters;
          Object.keys(obj).forEach((item) => {
            let matter = {
              key: item,
              name: obj[item].name,
            };
            matters = [...matters, matter];
          });
        }
        let subjectItem = {
          key: childItem.key,
          name: childItem.val().name,
          matters: matters,
        };
        setSubsObject((oldArray) => [...oldArray, subjectItem]);
      });
    });
  }, []);

  const [modalSubjectVisible, setModalSubjectVisible] = useState(false);

  function handleAdd() {
    setModalSubjectVisible(true);
  }
  function addSubject(value) {
    setSubsObject();
    const subjectKey = push(subjectRef);
    set(subjectKey, {
      name: value,
    });
    setSubsObject([...subsObject, { key: subjectKey.key, name: value }]);
    setModalSubjectVisible(false);
    Keyboard.dismiss();
  }

  return (
    <Container>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalSubjectVisible}
      >
        <ModalSubject shows={setModalSubjectVisible} addSubject={addSubject} />
      </Modal>
      <Header goBack={true} concursoSelected={concursoSelected} />
      <TitleWrapper>
        <Text style={{ color: "#3865A8", fontSize: 20 }}>
          Conteúdo Sintético
        </Text>
        <TouchableOpacity onPress={handleAdd}>
          <Text style={{ color: "#fff", fontSize: 18 }}>Adicionar</Text>
        </TouchableOpacity>
      </TitleWrapper>
      <FlatList
        style={{
          width: "90%",
        }}
        showsVerticalScrollIndicator={false}
        data={subsObject}
        renderItem={({ item }) => (
          <MenuSubmenu key={item.key} data={item} subKey={item.key} />
        )}
      />
    </Container>
  );
}
