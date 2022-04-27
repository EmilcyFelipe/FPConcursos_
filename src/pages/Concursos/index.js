import React, { useEffect, useContext, useState } from "react";
import { Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { Container, List, ActionToRegister } from "./styles";

import app from "../../services/firebaseConnection";
import { onValue, ref, getDatabase } from "firebase/database";

import { AuthContext } from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";

import ConcItem from "../../components/ConcItem";

import { Ionicons } from "@expo/vector-icons";
import ContentsIcon from "../../assets/contents.svg";

export default function Concursos() {
  const [items, setItems] = useState("");

  const { user } = useContext(AuthContext);
  const uid = user.uid;
  const navigation = useNavigation();

  const db = getDatabase(app);

  useEffect(() => {
    const concRef = ref(db, "concursos/" + uid);
    onValue(concRef, (snapshot) => {
      setItems([]);
      snapshot.forEach((childItem) => {
        let list = {
          key: childItem.key,
          orgao: childItem.val().orgao,
          cargo: childItem.val().cargo,
        };
        setItems((oldArray) => [...oldArray, list]);
      });
    });
  }, []);

  return (
    <Container>
      <Text style={{ marginLeft: "5%", marginTop: 30, color: "#FF5C00" }}>
        Selecione um concurso
      </Text>
      <ContentsIcon
        width={200}
        height={200}
        style={{ marginLeft: "auto", marginRight: "auto" }}
      />
      <ActionToRegister
        onPress={() => navigation.navigate("Register")}
        style={{ flexDirection: "row" }}
      >
        <Text style={{ marginRight: 10, color: "#fff" }}>
          Registrar novo concurso
        </Text>
        <Ionicons name="add-circle-outline" size={24} color="#fff" />
      </ActionToRegister>
      {items === "" ? (
        <ActivityIndicator color="#FFF" size="large" />
      ) : (
        <List
          data={items}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => <ConcItem data={item} />}
        />
      )}
    </Container>
  );
}
