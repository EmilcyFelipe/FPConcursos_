import React from "react";
import { Text } from "react-native";

import { Feather } from "@expo/vector-icons";

import { Container, Title, Button, Subtitle } from "./styles";

export default function Header({ data }) {
  return (
    <Container>
      <Button>
        <Feather name="menu" size={24} color="#fff" />
      </Button>
      <Title>Agente</Title>
      <Subtitle>PCDF</Subtitle>
    </Container>
  );
}
