import React, { useState, useEffect } from "react";

import { View, Text, TouchableOpacity } from "react-native";

import {Container, MainMenu, Submenu, SubmenuText} from './styles'

export default function MenuSubmenu() {
  const [subject, setSubject] = useState({
    name: "Portugues",
    matters: [{ name: "Pronome" }, { name: "Vírgula" }, { name: "Acentuação" }],
  });
  const [showSubs, setShowSubs] = useState(false);

  useEffect(() => {
    console.log(subject);
  }, []);

  const subMenus = subject.matters.map((item) => (
    <Submenu>
      <Text style={{color:'#FF5C00'}}>{item.name}</Text>
    </Submenu>
  ));
  return (
    <Container>
      <MainMenu onPress={() => setShowSubs(!showSubs)}>
        <Text style={{color: '#FFF', fontSize: 20}}>{subject.name}</Text>
      </MainMenu>
      {showSubs && subMenus}
    </Container>
  );
}
