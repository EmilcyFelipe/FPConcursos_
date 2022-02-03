import React, { useState } from "react";
import { Text } from "react-native";

import { Feather } from "@expo/vector-icons";

import { Container, Title, Button, Subtitle } from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function Header({ data, goBack }) {
  function headerButton(){
    if(goBack){
      navigation.goBack();
    }else{
      navigation.toggleDrawer();
    }
  }

  const navigation = useNavigation();
  return (
    <Container>
      <Button onPress={()=>{headerButton()}}>
        {goBack?<Feather name="arrow-left" size={24} color="#fff" />:<Feather name="menu" size={24} color="#fff" />}
      </Button>
      <Title>Agente</Title>
      <Subtitle>PCDF</Subtitle>
    </Container>
  );
}
