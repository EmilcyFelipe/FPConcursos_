import React, { useState } from "react";
import Header from "../../components/Header";
import { View, Text } from "react-native";

import {
  Container,
  TitleWrapper,
  ListWrapper,
  SyntheticPerformance,
} from "./styles";

export default function PerformanceBasis() {
  const [subjectList, setSubjectList] = useState([
    {
      key: "portugues",
      name: "Portugues",
      performance: "90/100",
    },
    {
      key: "constitucional",
      name: "Constitucional",
      performance: "90/100",
    },
    {
      key: "raciocinio logico",
      name: "Raciocínio Lógico",
      performance: "70/100",
    },
    {
      key: "informatica",
      name: "Informática",
      performance: "80/100",
    },
  ]);

  let syntheticList = subjectList.map((item) => (
    <SyntheticPerformance onPress={()=>{}}>
      <Text style={{ color: "#FFF", fontSize: 20 }}>{item.name}</Text>
      <Text style={{ color: "#FF8A00", fontSize: 20 }}>{item.performance}</Text>
    </SyntheticPerformance>
  ));
  return (
    <Container>
      <Header goBack={true} />
      <TitleWrapper>
        <Text style={{ color: "#3865a8", fontSize: 25, marginTop: 20 }}>
          Desempenho Sintético
        </Text>
      </TitleWrapper>
      <ListWrapper>{syntheticList}</ListWrapper>
    </Container>
  );
}