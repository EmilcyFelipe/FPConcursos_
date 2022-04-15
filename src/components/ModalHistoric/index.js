import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import {
  Container,
  ValueInput,
  DateInput,
  ActionView,
  ApplyButton,
  CancelButton,
} from "./styles";

export default function ModalHistoric({ shows, addHistoric }) {
  const [textValue, setTextValue] = useState("");
  const [sequence, setSequence] = useState("");

  function handleAddHistoric() {
    addHistoric(textValue, sequence);
    if (textValue === "" || sequence === "") {
      return;
    }
    setTextValue("");
    setSequence("");
  }

  function cancelModalAction() {
    shows(false);
    setTextValue("");
    setSequence("");
  }
  return (
    <Container>
      <Text style={{ color: "white", fontSize: 20 }}>
        Insira seu desempenho:
      </Text>
      <ValueInput
        value={textValue}
        onChangeText={(text) => setTextValue(text)}
        placeholder="Desempenho: 80/100...."
        keyboardType="numeric"
      />
      <DateInput
        value={sequence}
        onChangeText={(text) => setSequence(text)}
        placeholder="1ºSimul, 2ºSimul...."
        maxLength={5}
      />
      <ActionView>
        <CancelButton onPress={cancelModalAction}>
          <Text style={{ color: "#ffff", fontSize: 18 }}>Cancelar</Text>
        </CancelButton>
        <ApplyButton onPress={handleAddHistoric}>
          <Text style={{ color: "#ffff", fontSize: 18 }}>Confirmar</Text>
        </ApplyButton>
      </ActionView>
    </Container>
  );
}
