import React, { useState, useContext, useEffect } from "react";
import DatePicker from "react-native-datepicker";

import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
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

export default function Timeline() {
  const [stepName, setStepName] = useState("");
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [editing, setEditing] = useState(false);
  const [selectedStep, setSelectedStep] = useState();

  const [modalVisible, setModalVisible] = useState(false);
  const { user, concursoSelected } = useContext(AuthContext);
  const db = getDatabase(app);

  const [items, setItems] = useState([]);
  const timelineRef = ref(
    db,
    "concursos/" + user.uid + "/" + concursoSelected + "/cronograma"
  );

  function formatDate(date) {
    return (
      date.getFullYear() +
      "-" +
      0 +
      (date.getMonth() + 1) +
      "-" +
      (date.getDate() + 1)
    );
  }
  useEffect(() => {
    async function loadList() {
      onValue(timelineRef, (snapshot) => {
        setItems([]);
        snapshot.forEach((childItem) => {
          let timeItem = {
            key: childItem.key,
            etapa: childItem.val().etapa,
            initialDate: formatDate(new Date(childItem.val().initialDate)),
            finalDate: formatDate(new Date(childItem.val().finalDate)),
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

  function handleAddStep(itemKey) {
    // condition to set edit mode
    if (itemKey) {
      const stepRef = ref(
        db,
        "concursos/" +
          user.uid +
          "/" +
          concursoSelected +
          "/cronograma/" +
          itemKey
      );
      onValue(
        stepRef,
        (snapshot) => {
          setStepName(snapshot.val().etapa);
          setInitialDate(formatDate(new Date(snapshot.val().initialDate)));
          setFinalDate(formatDate(new Date(snapshot.val().finalDate)));
        },
        { onlyOnce: true }
      );
    }
    setModalVisible(true);
  }

  function addStep() {
    if (stepName === "" || initialDate === "" || finalDate === "") {
      alert("Por favor, insira todos os dados");
      return;
    }
    if (Date.parse(initialDate) > Date.parse(finalDate)) {
      alert("A data final deve ser igual ou posterior a data inicial!");
      return;
    }
    const stepKey = push(timelineRef);
    set(stepKey, {
      etapa: stepName,
      initialDate: Date.parse(initialDate),
      finalDate: Date.parse(finalDate),
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
      "concursos/" +
        user.uid +
        "/" +
        concursoSelected +
        "/cronograma/" +
        selectedStep
    );
    update(stepRef, {
      etapa: stepName,
      initialDate: Date.parse(initialDate),
      finalDate: Date.parse(finalDate),
    })
      .then(() => {
        setStepName("");
        setInitialDate("");
        setFinalDate("");
        setEditing(false);
        setSelectedStep("");
        setModalVisible(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  function deleteStep() {
    const stepRef = ref(
      db,
      "concursos/" +
        user.uid +
        "/" +
        concursoSelected +
        "/cronograma/" +
        selectedStep
    );
    remove(stepRef).then(() => {
      setStepName("");
      setInitialDate("");
      setFinalDate("");
      setEditing(false);
      setSelectedStep();
      setModalVisible(false);
      alert("Etapa excluída com sucesso");
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
      <Header goBack={true} concursoSelected={concursoSelected} />
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={{ flex: 1 }}>
            <ModalContent>
              {selectedStep ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: "5%",
                  }}
                >
                  <FontAwesome name="edit" size={20} color="#AC3F3F" />
                  <Text style={{ color: "#AC3F3F", fontSize: 20 }}>Editar</Text>
                </View>
              ) : (
                <ModalHeadText>Adicionar</ModalHeadText>
              )}
              <ModalInput
                value={stepName}
                onChangeText={(text) => setStepName(text)}
                placeholder="Nome da fase"
              />
              <DatePicker
                style={{
                  width: "90%",
                  marginTop: 10,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                date={initialDate}
                mode="date"
                placeholder="Data Inicial"
                format="YYYY-MM-DD"
                minDate="2010-05-01"
                maxDate="2030-05-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateText: {
                    color: "#FF5C00",
                  },
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                    tintColor: "#FF5C00",
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                }}
                onDateChange={(date) => {
                  setInitialDate(date);
                }}
              />

              <DatePicker
                style={{
                  width: "90%",
                  marginTop: 10,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                date={finalDate}
                mode="date"
                placeholder="Data Final"
                format="YYYY-MM-DD"
                minDate="2010-05-01"
                maxDate="2030-05-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateText: {
                    color: "#8DB8F8",
                  },
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                    tintColor: "#8DB8F8",
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                }}
                onDateChange={(date) => {
                  setFinalDate(date);
                }}
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
                <ModalButton
                  style={{ backgroundColor: "#AC3F3F" }}
                  onPress={cancelAddStep}
                >
                  <Text style={{ color: "#FFF" }}>Cancelar</Text>
                </ModalButton>
                <ModalButton
                  onPress={editing ? editStep : addStep}
                  style={{ backgroundColor: "#22540B" }}
                >
                  <Text style={{ color: "#FFF" }}>
                    {editing ? "Editar" : "Adicionar"}
                  </Text>
                </ModalButton>
                {editing && (
                  <ModalButton
                    style={{ backgroundColor: "#3865A8" }}
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
        <FontAwesome name="question-circle" size={24} color="#fff" />
      </TouchableOpacity>
      <TitleWrapper>
        <Text style={{ color: "#3865A8", fontSize: 24 }}>Cronograma</Text>
        <TouchableOpacity
          onPress={() => {
            handleAddStep();
          }}
          style={{ marginBottom: 0 }}
        >
          <Text style={{ color: "#FFF", fontSize: 18 }}>Adicionar Etapa</Text>
        </TouchableOpacity>
      </TitleWrapper>
      <ScrollView
        style={{ width: "90%" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        {timelineItems}
      </ScrollView>
    </Container>
  );
}
