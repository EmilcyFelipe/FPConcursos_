import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Container, TimeLineWrapper, StepBox } from "./styles";

export default function TimelineComponent({ data }) {
  const [timeList, setTimeList] = useState([]);

  useEffect(() => {
    setTimeList([
      {
        etapa: "inscrição",
        date: "25/07/2022",
      },
      {
        etapa: "Provas",
        date: "25/07/2022",
      },
      {
        etapa: "Certidoes",
        date: "25/07/2022",
      },
      {
        etapa: "Exames",
        date: "25/07/2022",
      },
    ]);
  }, []);

  return (
    <Container>
      {timeList === [] ? (
        <Text>Adicione seu Cronograma</Text>
      ) : (
        <TimeLineWrapper
          horizontal={true}
          data={timeList}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <StepBox>
              <MaterialIcons name="label-important" size={130} color="#FFFF" />
              <Text style={{ color: "#ffff" }}>{item.etapa}</Text>
            </StepBox>
          )}
          contentContainerStyle={{ alignItems: "center" }}
        />
      )}
    </Container>
  );
}
