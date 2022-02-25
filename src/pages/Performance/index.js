import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import Header from "../../components/Header";

import { Container, Historic, TitleWrapper, PerformanceChart } from "./styles";

import {
  Chart,
  VerticalAxis,
  HorizontalAxis,
  Line,
  Area,
} from "react-native-responsive-linechart";

export default function Performance() {
  const [historic, setHistoric] = useState([
    {
      value: "90/100",
      date: "20/05/20022",
    },
    {
      value: "93/100",
      date: "22/05/20022",
    },
    {
      value: "93/100",
      date: "25/05/20022",
    },
  ]);

  const historicItems = historic.map((item) => (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={{ color: "#fff" }}>{item.value}</Text>
      <Text style={{ color: "#fff" }}>{item.date}</Text>
    </View>
  ));

  //chart data
  const data2 = [
    { x: 0, y: 12 },
    { x: 2, y: 20 },
    { x: 3, y: 40 },
    { x: 4, y: 50 },
    { x: 5, y: 55 },
    { x: 8, y: 60 },
    { x: 9, y: 70 },
    { x: 10, y: 90 },
  ];

  return (
    <Container>
      <Header goBack={true} />
      <TitleWrapper>
        <Text style={{ color: "#3865A8", fontSize: 20 }}>Português</Text>
        <TouchableOpacity>
          <Text style={{ color: "#FFF", fontSize: 20 }}>Inserir</Text>
        </TouchableOpacity>
      </TitleWrapper>
      <Historic>
        <Text style={{ fontSize: 18, color: "#fff" }}>Histórico</Text>
        {historicItems}
      </Historic>
      <PerformanceChart>
        <Chart
          style={{ height: 200, width: "100%" }}
          xDomain={{ min: 0, max: 10 }}
          yDomain={{ min: 0, max: 100 }}
          padding={{ left: 20, top: 20, bottom: 20, right: 10 }}
          data={data2}
        >
          <VerticalAxis
            tickValues={[0, 20, 40, 60, 80, 100]}
            theme={{
              labels: {
                formatter: (v) => v.toFixed(0),
                label: { color: "#fff", fontSize: 14 },
              },
            }}
          />
          <HorizontalAxis
            tickCount={10}
            theme={{
              labels: {
                formatter: (v) => v.toFixed(0),
                label: { color: "#fff", fontSize: 14 },
              },
            }}
          />
          <Area
            smoothing="cubic-spline"
            theme={{
              gradient: {
                from: {
                  color: "#A6CEE3",
                  opacity: 1,
                },
                to: {
                  color: "blue",
                  opacity: 0.2,
                },
              },
            }}
          />
          <Line
            smoothing="cubic-spline"
            theme={{ stroke: { color: "#FF5C00", width: 2 } }}
          />
        </Chart>
      </PerformanceChart>
    </Container>
  );
}
