import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import {
  Container,
  Welcome,
  ActionsWrapper,
  ActionRow,
  ActionItem,
  ActionText,
} from "./styles";
import Header from "../../components/Header";
import TimelineComponent from "../../components/TimelineComponent";

import { AuthContext } from "../../contexts/auth";

import { useNavigation } from "@react-navigation/native";

import TimelineIcon from "../../assets/timeline.svg";
import ConteudoIcon from "../../assets/subject.svg";
import PerformanceIcon from "../../assets/performance.svg";

export default function Home() {
  const { user, concursoSelected } = useContext(AuthContext);

  const navigation = useNavigation();

  useEffect(() => {
    console.log(concursoSelected + "oa");
  }, []);
  if (!concursoSelected) {
    return (
      <Container>
        <Header />
        <TouchableOpacity
          style={{ alignItems: "center", justifyContent: "center" }}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={{ color: "#FFF", fontSize: 25 }}>
            Selecione ou adicione um concurso
          </Text>
        </TouchableOpacity>
      </Container>
    );
  }
  return (
    <Container>
      <Header concursoSelected={concursoSelected} />
      <Welcome>
        Bem vind{user.genrer === "F" ? "a" : "o"}, {user.name}
      </Welcome>
      <TimelineComponent data={concursoSelected} />
      <ActionsWrapper>
        <ActionRow>
          <ActionItem
            onPress={() => {
              navigation.navigate("Timeline", {
                concursoSelected: concursoSelected,
              });
            }}
          >
            <TimelineIcon width={80} height={80} />
            <ActionText>Cronograma</ActionText>
          </ActionItem>
          <ActionItem
            onPress={() => {
              navigation.navigate("Subjects", {
                concursoSelected: concursoSelected,
              });
            }}
          >
            <ConteudoIcon width={80} height={80} />
            <ActionText>Conteúdo</ActionText>
          </ActionItem>
        </ActionRow>
        <ActionRow>
          <ActionItem
            onPress={() => {
              navigation.navigate("Performance", {
                concursoSelected: concursoSelected,
              });
            }}
          >
            <PerformanceIcon width={80} height={80} />
            <ActionText>Desempenho</ActionText>
          </ActionItem>
          <ActionItem>
            <TimelineIcon width={80} height={80} />
            <ActionText>Visão Geral</ActionText>
          </ActionItem>
        </ActionRow>
      </ActionsWrapper>
    </Container>
  );
}
