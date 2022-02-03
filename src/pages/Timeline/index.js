import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

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

export default function Timeline({ data }) {
  const [stepName, setStepName] = useState("");
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [items, setItems] = useState([
    {
      etapa: "Edital",
      initialDate: "22/02/2022",
      finalDate: "23/05/2022",
    },
    {
      etapa: "Inscrição",
      initialDate: "22/02/2022",
      finalDate: "23/05/2022",
    },
    {
      etapa: "Provas",
      initialDate: "22/02/2022",
      finalDate: "23/05/2022",
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  let timelineItems = items.map((item) => (
    <Step>
      <StepText>{item.etapa}</StepText>
      <StepDate>
        <StepDateText>{item.initialDate}</StepDateText>
        <StepDateText>{item.finalDate}</StepDateText>
      </StepDate>
    </Step>
  ));

  function handleAddStep() {
    setModalVisible(true);
  }

  function addStep() {}

  function cancelAddStep() {
    setStepName("");
    setInitialDate("");
    setFinalDate("");
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
                <ModalButton>
                  <Text style={{ color: "#FFF" }}>Adicionar</Text>
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
