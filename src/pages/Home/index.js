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

import { AntDesign } from "@expo/vector-icons";

import { AuthContext } from "../../contexts/auth";

import { useNavigation } from "@react-navigation/native";

import TimelineIcon from "../../assets/timeline.svg";
import ConteudoIcon from "../../assets/subject.svg";
import PerformanceIcon from "../../assets/performance.svg";
import Pick from "../../assets/pick.svg";

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
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: "auto",
            marginBottom: "auto",
          }}
          onPress={() => {
            navigation.navigate("Concursos");
          }}
        >
          <View
            style={{
              borderColor: "#ffff",
              borderWidth: 3,
              borderStyle: "solid",
              borderRadius: 20,
              padding: 10,
              margin: "5%",
            }}
          >
            <Text style={{ color: "#FFF", fontSize: 20 }}>
              Selecione ou adicione um concurso.
            </Text>
            <AntDesign name="select1" size={24} color="#FFF" />
          </View>
          <Pick height={200} />
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
