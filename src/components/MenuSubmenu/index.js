import React, { useState, useEffect } from "react";

import { View, Text, TouchableOpacity } from "react-native";
import { Container, MainMenu, Submenu, SubmenuText } from "./styles";

import { MaterialIcons } from "@expo/vector-icons";

export default function MenuSubmenu({ data }) {
  const [subject, setSubject] = useState(data);
  const [showSubs, setShowSubs] = useState(false);

  const subMenus = subject.matters.map((item) => (
    <Submenu>
      <Text style={{ color: "#FF5C00" }}>{item.name}</Text>
    </Submenu>
  ));
  return (
    <Container>
      <MainMenu onPress={() => setShowSubs(!showSubs)}>
        <Text style={{ color: "#FFF", fontSize: 20 }}>{subject.name}</Text>
        <MaterialIcons
          name={showSubs ? "expand-less" : "expand-more"}
          size={24}
          color="#fff"
        />
      </MainMenu>
      {showSubs && (
        <View>
          <TouchableOpacity>
            <Text style={{ color: "#FFF", marginLeft: "auto", marginRight: 0 }}>
              Inserir
            </Text>
          </TouchableOpacity>
          {subMenus}
        </View>
      )}
    </Container>
  );
}
