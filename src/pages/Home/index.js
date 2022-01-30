import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { Container, Welcome, ActionsWrapper, ActionRow, ActionItem, ActionText} from "./styles";
import Header from "../../components/Header";
import TimelineComponent from "../../components/TimelineComponent";


export default function Home({ data }) {
  return (
    <Container>
      <Header />
      <Welcome>Bem vindo, Felipe</Welcome>
      <TimelineComponent />
      <ActionsWrapper>
        <ActionRow>
          <ActionItem><ActionText>Cronograma</ActionText></ActionItem>
          <ActionItem><ActionText>Conteúdo</ActionText></ActionItem>
        </ActionRow>
        <ActionRow>
          <ActionItem><ActionText>Desempenho</ActionText></ActionItem>
          <ActionItem><ActionText>Desempenho</ActionText></ActionItem>
        </ActionRow>
      </ActionsWrapper>
    </Container>
  );
}
