import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import {
  Container,
  ValueInput,
  DateInput,
  ActionView,
  ApplyButton,
  CancelButton,
} from "./styles";

import { AntDesign } from "@expo/vector-icons";

export default function ModalHistoric({ shows, addHistoric }) {
  const [successValue, setSuccessValue] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [sequence, setSequence] = useState("");

  function handleAddHistoric() {
    if (successValue === "" || totalValue === "" || sequence === "") {
      alert("Campo com informação ausente");
      return;
    }
    addHistoric(successValue, totalValue, sequence);
    setSuccessValue("");
    setSequence("");
  }

  function cancelModalAction() {
    shows(false);
    setSuccessValue("");
    setSequence("");
  }

  function help() {
    alert(
      "A representação gráfica é referente a quantidade de acertos em relação a 100 unidades de questões. Dessa forma, os dados inseridos são convertidos para essa proporção de x acertos para cada 100 questões"
    );
  }
  return (
    <Container>
      <View>
        <Text style={{ color: "white", fontSize: 20 }}>
          Insira seu desempenho:
        </Text>
        <TouchableOpacity
          onPress={help}
          style={{ marginLeft: "auto", marginRight: 0 }}
        >
          <AntDesign name="questioncircle" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <ValueInput
        value={successValue}
        onChangeText={(text) => setSuccessValue(text)}
        placeholder="Acertos"
        keyboardType="numeric"
      />
      <ValueInput
        value={totalValue}
        onChangeText={(text) => setTotalValue(text)}
        placeholder="Total de questões"
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
