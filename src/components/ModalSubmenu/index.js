import React, { useState } from "react";
import { View, Text } from "react-native";

import {
  Container,
  InputSubmenu,
  ActionButton,
  ModalHeader,
  ActionWrapper,
} from "./styles";

export default function ModalSubmenu({
  showModalSubmenu,
  addContent,
  selectedSubject,
}) {
  const [contentValue, setContentValue] = useState("");
  function handleAddContent() {
    if (contentValue) {
      addContent(contentValue);
      setContentValue("");
    }
  }
  function cancel() {
    showModalSubmenu(false);
    setContentValue("");
  }
  return (
    <Container>
      <ModalHeader>Adicione um conteúdo</ModalHeader>
      <InputSubmenu
        value={contentValue}
        onChangeText={(value) => {
          setContentValue(value);
        }}
        placeholder="Conteúdo"
      />
      <ActionWrapper>
        <ActionButton onPress={cancel} style={{ backgroundColor: "#AC3F3F" }}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Cancelar</Text>
        </ActionButton>
        <ActionButton
          style={{ backgroundColor: "#3865A8" }}
          onPress={handleAddContent}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Adicionar</Text>
        </ActionButton>
      </ActionWrapper>
    </Container>
  );
}
