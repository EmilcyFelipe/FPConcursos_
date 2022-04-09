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
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  update,
  remove,
} from "firebase/database";
import { AuthContext } from "../../contexts/auth";

import Header from "../../components/Header";
import { FontAwesome } from "@expo/vector-icons";

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
  const [selectedStep, setSelectedStep] = useState();

  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useContext(AuthContext);
  const db = getDatabase(app);

  const [items, setItems] = useState([]);
  const [data, setData] = useState(route.params.concursoSelected);
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
        setSelectedStep(item.key);
        handleAddStep();
      }}
    >
      <StepText>{item.etapa}</StepText>
      <StepDate>
        <StepDateText>{item.initialDate}</StepDateText>
        <StepDateText>{item.finalDate}</StepDateText>
      </StepDate>
    </Step>
  ));

  function handleAddStep() {
    if (selectedStep) {
      const stepRef = ref(
        db,
        "concursos/" + user.uid + "/" + data + "/cronograma/" + selectedStep
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
    if (stepName === "" || initialDate === "") {
      alert("Por favor, insira todos os dados");
      return;
    }
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
  function editStep() {
    const stepRef = ref(
      db,
      "concursos/" + user.uid + "/" + data + "/cronograma/" + selectedStep
    );
    update(stepRef, {
      etapa: stepName,
      initialDate: initialDate,
      finalDate: finalDate,
    })
      .then(() => {
        setStepName("");
        setInitialDate("");
        setFinalDate("");
        setEditing(false);
        setSelectedStep();
        setModalVisible(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  function deleteStep() {
    const stepRef = ref(
      db,
      "concursos/" + user.uid + "/" + data + "/cronograma/" + selectedStep
    );
    remove(stepRef).then(() => {
      setStepName("");
      setInitialDate("");
      setFinalDate("");
      setEditing(false);
      setSelectedStep();
      setModalVisible(false);
      alert("Etapa ecluída com sucesso");
    });
  }

  function cancelAddStep() {
    setStepName("");
    setInitialDate("");
    setFinalDate("");
    setEditing(false);
    setSelectedStep();
    setModalVisible(false);
  }

  function help() {
    alert("Para editar ou deletar uma etapa, mantenha pressionado o elemento");
  }

  return (
    <Container>
      <Header goBack={true} concursoSelected={route.params.concursoSelected} />
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
                <ModalButton onPress={editing ? editStep : addStep}>
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
                {editing && (
                  <ModalButton
                    style={{ backgroundColor: "#AC3F3F" }}
                    onPress={deleteStep}
                  >
                    <Text style={{ color: "#FFF" }}>Excluir</Text>
                  </ModalButton>
                )}
              </View>
            </ModalContent>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <TouchableOpacity
        style={{ marginLeft: "auto", marginRight: "5%", marginTop: 20 }}
        onPress={help}
      >
        <FontAwesome name="question-circle" size={24} color="black" />
      </TouchableOpacity>
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
