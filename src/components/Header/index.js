import React from "react";
import { Text } from "react-native";

import { Feather } from "@expo/vector-icons";

import { Container, Title, Button, Subtitle } from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function Header({ data }) {

  const navigation = useNavigation();
  return (
    <Container>
      <Button onPress={()=>{navigation.toggleDrawer()}}>
        <Feather name="menu" size={24} color="#fff" />
      </Button>
      <Title>Agente</Title>
      <Subtitle>PCDF</Subtitle>
    </Container>
  );
}
