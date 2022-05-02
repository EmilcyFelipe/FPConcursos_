import React, { useEffect, useState, useContext, useRef } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import { HomeContext } from "../../contexts/home";
import { Container, TimeLineWrapper, StepBox } from "./styles";

export default function TimelineComponent() {
  const { timelineSteps, loadingSteps } = useContext(HomeContext);

  const navigation = useNavigation();

  if (loadingSteps) {
    return (
      <Container>
        <ActivityIndicator color="white" size="large" />
      </Container>
    );
  }

  function formatDate(date) {
    let day =
      date.getDate() + 1 < 10 ? "0" + (date.getDate() + 1) : date.getDate() + 1;
    return day + "/" + 0 + (date.getMonth() + 1) + "/" + date.getFullYear();
  }

  function stepColor(step) {
    let dateOfDay = new Date();
    let currentDate = Date.parse(
      dateOfDay.getFullYear() +
        "/" +
        (dateOfDay.getMonth() < 10
          ? "0" + (dateOfDay.getMonth() + 1)
          : dateOfDay.getMonth()) +
        "/" +
        (dateOfDay.getDate() < 10
          ? "0" + dateOfDay.getDate()
          : dateOfDay.getDate())
    );

    let initialDateMili = Date.parse(
      step.initialDate.slice(6) +
        "/" +
        step.initialDate.slice(3, 5) +
        "/" +
        step.initialDate.slice(0, 2)
    );

    let finalDateMili = Date.parse(
      step.finalDate.slice(6) +
        "/" +
        step.finalDate.slice(3, 5) +
        "/" +
        step.finalDate.slice(0, 2)
    );

    if (initialDateMili <= currentDate) {
      if (finalDateMili < currentDate) {
        return "#505050";
      } else {
        return "#FF5C00";
      }
    } else {
      return "#FFF";
    }
  }

  return (
    <Container>
      {Object.keys(timelineSteps).length === 0 ? (
        <View
          style={{
            height: 100,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{ width: "100%", backgroundColor: "#121212", padding: 20 }}
            onPress={() => navigation.navigate("Timeline")}
          >
            <Text style={{ fontSize: 18, color: "#fff" }}>
              Adicione seu cronograma
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TimeLineWrapper
          horizontal={true}
          data={timelineSteps}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <StepBox key={item.key}>
              <MaterialIcons
                name="label-important"
                size={130}
                color={stepColor(item)}
              />
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="label-important" size={12} color="#505050" />
          <Text style={{ color: "#505050", marginLeft: 5, fontSize: 10 }}>
            Decorrido
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="label-important" size={12} color="#FF5C00" />
          <Text style={{ color: "#FF5C00", marginLeft: 5, fontSize: 10 }}>
            Ativo
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="label-important" size={12} color="#FFF" />
          <Text style={{ color: "#FFF", marginLeft: 5, fontSize: 10 }}>
            A incorrer
          </Text>
        </View>
      </View>
    </Container>
  );
}
