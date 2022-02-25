import React, { useState, useContext, useEffect } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import app from "../../services/firebaseConnection";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { AuthContext } from "../../contexts/auth";

import Header from "../../components/Header";

import {
  Container,
  TitleWrapper,
  Step,
  StepText,
  StepDate,
  StepDateText,
  ModalContent,
  ModalHeadText,
  ModalInput,
  ModalButton,
} from "./styles";

export default function Timeline({ route }) {
  const [stepName, setStepName] = useState("");
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [editing, setEditing] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useContext(AuthContext);
  const db = getDatabase(app);

  const [items, setItems] = useState([]);
  const data = route.params.data;
  const timelineRef = ref(
    db,
    "concursos/" + user.uid + "/" + data + "/cronograma"
  );

  useEffect(() => {
    async function loadList() {
      onValue(timelineRef, (snapshot) => {
        setItems([]);
        snapshot.forEach((childItem) => {
          let timeItem = {
            key: childItem.key,
            etapa: childItem.val().etapa,
            initialDate: childItem.val().initialDate,
            finalDate: childItem.val().finalDate,
          };
          setItems((oldArray) => [...oldArray, timeItem]);
        });
      });
    }
    loadList();
  }, []);

  let timelineItems = items.map((item) => (
    <Step
      key={item.key}
      onLongPress={() => {
        setEditing(true);
        handleAddStep(item.key);
      }}
    >
      <StepText>{item.etapa}</StepText>
      <StepDate>
        <StepDateText>{item.initialDate}</StepDateText>
        <StepDateText>{item.finalDate}</StepDateText>
      </StepDate>
    </Step>
  ));

  function handleAddStep(key) {
    if (key) {
      const stepRef = ref(
        db,
        "concursos/" + user.uid + "/" + data + "/cronograma/" + key
      );
      onValue(stepRef, (snapshot) => {
        setStepName(snapshot.val().etapa);
        setInitialDate(snapshot.val().initialDate);
        setFinalDate(snapshot.val().finalDate);
      });
    }
    setModalVisible(true);
  }

  function addStep() {
    const stepKey = push(timelineRef);

    set(stepKey, {
      etapa: stepName,
      initialDate: initialDate,
      finalDate: finalDate,
    })
      .then(() => {
        setStepName("");
        setInitialDate("");
        setFinalDate("");
        setModalVisible(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  function cancelAddStep() {
    setStepName("");
    setInitialDate("");
    setFinalDate("");
    setEditing(false);
    setModalVisible(false);
  }

  return (
    <Container>
      <Header goBack={true} />
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={{ flex: 1 }}>
            <ModalContent>
              <ModalHeadText>Adicionar</ModalHeadText>
              <ModalInput
                value={stepName}
                onChangeText={(text) => setStepName(text)}
                placeholder="Nome da fase"
              />
              <ModalInput
                value={initialDate}
                onChangeText={(text) => setInitialDate(text)}
                placeholder='Data Inicial. Ex: "dd/MM/YYYY"'
              />
              <ModalInput
                value={finalDate}
                onChangeText={(text) => setFinalDate(text)}
                placeholder='Data Final. Ex: "dd/MM/YYYY"'
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "90%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <ModalButton onPress={addStep}>
                  <Text style={{ color: "#FFF" }}>
                    {editing ? "Editar" : "Adicionar"}
                  </Text>
                </ModalButton>
                <ModalButton
                  style={{ backgroundColor: "#AC3F3F" }}
                  onPress={cancelAddStep}
                >
                  <Text style={{ color: "#FFF" }}>Cancelar</Text>
                </ModalButton>
              </View>
            </ModalContent>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <TitleWrapper>
        <Text style={{ color: "#3865A8", fontSize: 20 }}>Cronograma</Text>
        <TouchableOpacity
          onPress={() => {
            handleAddStep();
          }}
        >
          <Text style={{ color: "#FFF", fontSize: 20 }}>Adicionar Etapa</Text>
        </TouchableOpacity>
      </TitleWrapper>
      {timelineItems}
    </Container>
  );
}
