import React, { useEffect, useState, useContext, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { HomeContext } from "../../contexts/home";
import { Container, TimeLineWrapper, StepBox } from "./styles";

export default function TimelineComponent() {
  const { timelineSteps, loadingSteps } = useContext(HomeContext);
  const activity = useRef();

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
    let currentDate = Date.parse(new Date());
    console.log(currentDate);
    if (step.initialDate < currentDate) {
      if (step.finalDate < currentDate) {
        return "#FFF";
      } else {
        return "#FF5C00";
      }
    } else {
      return "#8DB8F8";
    }
  }

  return (
    <Container>
      {!timelineSteps ? (
        <View
          style={{
            height: 100,
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 20 }}>
            Sem cronograma, adicione algumas etapas
          </Text>
        </View>
      ) : (
        <TimeLineWrapper
          ref={activity}
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
                {formatDate(new Date(item.initialDate))}
              </Text>
              <Text style={{ color: "#ffff", fontSize: 12 }}>
                {formatDate(new Date(item.finalDate))}
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
          <MaterialIcons name="label-important" size={12} color="#fff" />
          <Text style={{ color: "#FFF", marginLeft: 5, fontSize: 10 }}>
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
          <MaterialIcons name="label-important" size={12} color="#8DB8F8" />
          <Text style={{ color: "#8DB8F8", marginLeft: 5, fontSize: 10 }}>
            A incorrer
          </Text>
        </View>
      </View>
    </Container>
  );
}
