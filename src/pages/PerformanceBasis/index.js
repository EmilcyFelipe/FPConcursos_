import React, { useEffect, useState, useContext } from "react";
import Header from "../../components/Header";
import { View, Text, TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/auth";
import app from "../../services/firebaseConnection";
import { getDatabase, onValue, ref } from "firebase/database";

import { MaterialIcons } from "@expo/vector-icons";

import {
  Container,
  TitleWrapper,
  ListWrapper,
  SyntheticPerformance,
} from "./styles";

export default function PerformanceBasis({ route }) {
  const navigation = useNavigation();

  const { user } = useContext(AuthContext);
  const db = getDatabase(app);
  const [concursoSelected, setConcursoSelected] = useState(
    route.params.concursoSelected
  );
  const [subjectList, setSubjectList] = useState([]);

  useEffect(() => {
    const subjectRef = ref(
      db,
      "concursos/" + user.uid + "/" + concursoSelected + "/subjects"
    );
    onValue(subjectRef, (snapshot) => {
      setSubjectList([]);
      snapshot.forEach((childItem) => {
        let performanceValue = 0;
        let performanceLength = 1;
        if (childItem.child("performance").exists()) {
          performanceLength = Object.keys(
            childItem.child("performance").val()
          ).length;
        }
        childItem.child("performance").forEach((grandChildItem) => {
          performanceValue += parseInt(grandChildItem.val().value);
        });
        let item = {
          key: childItem.key,
          name: childItem.val().name,
          performance: `${(performanceValue / performanceLength).toFixed(
            1
          )}/100`,
        };
        setSubjectList((oldList) => [...oldList, item]);
      });
    });
  }, []);

  let syntheticList = subjectList.map((item) => (
    <SyntheticPerformance
      onPress={() => {
        navigation.navigate("Performance", {
          concursoSelected: concursoSelected,
          subjectKey: item.key,
        });
      }}
      key={item.key}
    >
      <Text style={{ color: "#FFF", fontSize: 20 }}>{item.name}</Text>
      <Text style={{ color: "#FF8A00", fontSize: 20 }}>{item.performance}</Text>
      <MaterialIcons name="chevron-right" size={28} color="#fff" />
    </SyntheticPerformance>
  ));

  function helpPerformanceBasis() {
    alert(
      "Aqui é representada a média do desempenho nos simulados por matéria, é recomendado não deixar valores muito antigos no desempenho histórico para o estudante ter a real noção do seu desempenho sintético"
    );
  }

  return (
    <Container>
      <Header goBack={true} concursoSelected={concursoSelected} />
      {subjectList == [] && (
        <View>
          <Text>Primeiro adicione algum conteúdo</Text>
        </View>
      )}
      <TitleWrapper>
        <Text style={{ color: "#3865a8", fontSize: 25 }}>
          Desempenho Sintético
        </Text>
        <TouchableOpacity
          onPress={helpPerformanceBasis}
          style={{ marginLeft: "auto", marginRight: 0 }}
        >
          <AntDesign name="questioncircle" size={24} color="#fff" />
        </TouchableOpacity>
      </TitleWrapper>
      <ListWrapper>{syntheticList}</ListWrapper>
    </Container>
  );
}
