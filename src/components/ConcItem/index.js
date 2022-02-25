import React from "react";

import { Container, ConcText } from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function ConcItem({ data }) {
  const navigation = useNavigation();
  return (
    <Container onPress={()=>navigation.navigate('Home',{selectedData:data})}>
      <ConcText>{data.orgao}</ConcText>
      <ConcText>{data.cargo}</ConcText>
    </Container>
  );
}
