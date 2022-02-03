import React, {useContext} from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { Container, Welcome, ActionsWrapper, ActionRow, ActionItem, ActionText} from "./styles";
import Header from "../../components/Header";
import TimelineComponent from "../../components/TimelineComponent";

import {AuthContext} from '../../contexts/auth'

import { NavigationContainer, useNavigation } from "@react-navigation/native";



export default function Home({ data }) {
  
  const {user} = useContext(AuthContext);
  
  const navigation = useNavigation();



  return (
    <Container>
      <Header />
      <Welcome>Bem vind{user.genrer==='F'?'a':'o'}, {user.name}</Welcome>
      <TimelineComponent />
      <ActionsWrapper>
        <ActionRow>
          <ActionItem onPress={()=>{navigation.navigate('Timeline')}}><ActionText>Cronograma</ActionText></ActionItem>
          <ActionItem onPress={()=>{navigation.navigate('Subjects')}}><ActionText>Conteúdo</ActionText></ActionItem>
        </ActionRow>
        <ActionRow>
          <ActionItem><ActionText>Desempenho</ActionText></ActionItem>
          <ActionItem><ActionText>Desempenho</ActionText></ActionItem>
        </ActionRow>
      </ActionsWrapper>
    </Container>
  );
}
