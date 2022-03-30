import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { HomeContext } from "../../contexts/home";
import { Container, TimeLineWrapper, StepBox } from "./styles";

export default function TimelineComponent({ data }) {
  const { timelineSteps, loadingSteps } = useContext(HomeContext);

  if (loadingSteps) {
    return (
      <Container>
        <ActivityIndicator color="white" size="large" />
      </Container>
    );
  }

  return (
    <Container>
      {timelineSteps === [] ? (
        <Text>Adicione seu Cronograma</Text>
      ) : (
        <TimeLineWrapper
          horizontal={true}
          data={timelineSteps}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <StepBox>
              <MaterialIcons name="label-important" size={130} color="#FFFF" />
              <Text style={{ color: "#ffff" }}>{item.etapa}</Text>
              <Text style={{ color: "#ffff", fontSize: 12 }}>
                {item.initialDate}
              </Text>
              <Text style={{ color: "#ffff", fontSize: 12 }}>
                {item.finalDate}
              </Text>
            </StepBox>
          )}
          contentContainerStyle={{ alignItems: "center" }}
        />
      )}
    </Container>
  );
}
