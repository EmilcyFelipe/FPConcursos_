import React, { useEffect, useContext, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";

import app from "../../services/firebaseConnection";
import { onValue, ref, getDatabase } from "firebase/database";

import { AuthContext } from "../../contexts/auth";
import { HomeContext } from "../../contexts/home";
import { FlatList } from "react-native";

import { Container, List } from "./styles";

import ConcItem from "../../components/ConcItem";

export default function Concursos() {
  const [items, setItems] = useState("");

  const { user } = useContext(AuthContext);
  const uid = user.uid;

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
