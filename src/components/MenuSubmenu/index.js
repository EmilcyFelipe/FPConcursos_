import React, { useState, useEffect, useContext } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  Keyboard,
} from "react-native";
import { Container, MainMenu, Submenu, SubmenuText } from "./styles";

import ModalSubmenu from "../ModalSubmenu";

import { MaterialIcons } from "@expo/vector-icons";
import {
  getDatabase,
  remove,
  ref,
  onValue,
  set,
  push,
} from "firebase/database";
import app from "../../services/firebaseConnection";
import { AuthContext } from "../../contexts/auth";
import { HomeContext } from "../../contexts/home";

export default function MenuSubmenu({ data, concursoSelected }) {
  const [showSubs, setShowSubs] = useState(false);
  const [modalSubmenuVisible, setModalSubmenuVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");

  const { user } = useContext(AuthContext);

  const db = getDatabase(app);
  var subMenus;

  if (data.matters) {
    subMenus = data.matters.map((item) => (
      <Submenu key={item.key}>
        <Text>{item.name}</Text>
      </Submenu>
    ));
  }

  function handleModalSubmenu() {
    setModalSubmenuVisible(true);
    setSelectedSubject(data);
  }
  function handleDeleteSubject() {
    Alert.alert(
      "Tem certeza que deseja excluir esse conteúdo?",
      "Essa ação não é reversível",
      [
        {
          text: "Excluir",
          style: "default",
          onPress: deleteSubject,
        },
        {
          text: "Cancelar",
          style: "cancel",
          onPress: () => {},
        },
      ]
    );
  }
  function deleteSubject() {
    const subjectRef = ref(
      db,
      "concursos/" + user.uid + "/" + concursoSelected + "/subjects/" + data.key
    );
    remove(subjectRef)
      .then(() => {
        alert("Conteúdo excluído com sucesso");
      })
      .catch((err) => {
        alert("Ops, algo inesperado aconteceu");
      });
  }

  function addContent(subject, value) {
    const contentRef = ref(
      db,
      "concursos/" +
        user.uid +
        "/" +
        concursoSelected +
        "/subjects/" +
        selectedSubject.key +
        "/matters"
    );
    let contentKey = push(contentRef);
    set(contentKey, {
      name: value,
    }).then(() => {
      setModalSubmenuVisible(false);
      Keyboard.dismiss();
      alert("adicionado");
    });
  }
  return (
    <Container>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalSubmenuVisible}
      >
        <ModalSubmenu
          showModalSubmenu={setModalSubmenuVisible}
          addContent={addContent}
          selectedSubject={selectedSubject}
        ></ModalSubmenu>
      </Modal>
      <MainMenu
        onPress={() => setShowSubs(!showSubs)}
        onLongPress={handleDeleteSubject}
      >
        <Text style={{ color: "#FFF", fontSize: 20 }}>{data.name}</Text>
        <MaterialIcons
          name={showSubs ? "expand-less" : "expand-more"}
          size={24}
          color="#fff"
        />
      </MainMenu>
      {showSubs && (
        <View>
          <TouchableOpacity
            onPress={() => {
              handleModalSubmenu();
            }}
          >
            <Text style={{ color: "#FFF", marginLeft: "auto", marginRight: 0 }}>
              Inserir
            </Text>
          </TouchableOpacity>
          {subMenus}
        </View>
      )}
    </Container>
  );
}
