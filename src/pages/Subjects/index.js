import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { Container, TitleWrapper } from "./styles";
import Header from "../../components/Header";
import MenuSubmenu from '../../components/MenuSubmenu'

export default function Subjects() {
  return (
    <Container>
      <Header goBack={true} />
      <TitleWrapper>
        <Text style={{ color: "#3865A8", fontSize: 20 }}>
          Conteúdo Sintético
        </Text>
        <TouchableOpacity>
          <Text style={{ color: "#fff", fontSize: 18 }}>Adicionar</Text>
        </TouchableOpacity> 
      </TitleWrapper>
      <MenuSubmenu/>
    </Container>
  );
}
