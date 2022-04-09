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

export default function ModalHistoric({ shows }) {
  const [textValue, setTextValue] = useState("");
  const [dateValue, setDateValue] = useState("");

  useEffect(() => {
    console.log(textValue);
  }, [textValue]);

  function cancelModalAction() {
    shows(false);
    setTextValue("");
    setDateValue("");
  }
  return (
    <Container>
      <Text style={{ color: "white", fontSize: 20 }}>
        Insira seu desempenho:
      </Text>
      <ValueInput
        value={textValue}
        onChangeText={(text) => setTextValue(text)}
      />
      <DateInput
        value={dateValue}
        onChangeText={(text) => setTextValue(text)}
      />
      <ActionView>
        <ApplyButton>
          <Text style={{ color: "#ffff", fontSize: 18 }}>Confirmar</Text>
        </ApplyButton>
        <CancelButton onPress={cancelModalAction}>
          <Text style={{ color: "#ffff", fontSize: 18 }}>Cancelar</Text>
        </CancelButton>
      </ActionView>
    </Container>
  );
}
