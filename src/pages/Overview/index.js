import React from "react";
import { View, Text } from "react-native";
import { Container } from "./styles";
import Building from "../../assets/building.svg";

export default function Overview() {
  return (
    <Container>
      <View style={{ width: "90%" }}>
        <Text style={{ color: "#fff" }}>
          No momento, esta funcionalidade ainda está em desenvolvimento. Em
          breve, vamos trazer mais novidades 😜
        </Text>
      </View>
      <Building style={{ marginTop: 20 }} height={200} />
    </Container>
  );
}
