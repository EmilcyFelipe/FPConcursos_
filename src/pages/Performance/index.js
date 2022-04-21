import React, { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity, Modal, Dimensions } from "react-native";

import { AuthContext } from "../../contexts/auth";

import Header from "../../components/Header";
import { Container, Historic, TitleWrapper, PerformanceChart } from "./styles";
import ModalHistoric from "../../components/ModalHistoric";

import { getDatabase, onValue, ref, push, set } from "firebase/database";
import app from "../../services/firebaseConnection";

import { LineChart } from "react-native-chart-kit";
import { FlatList } from "react-native-gesture-handler";

export default function Performance({ route }) {
  const [concursoSelected, setConcursoSelected] = useState(
    route.params.concursoSelected
  );
  const [subjectKey, setSubjectKey] = useState(route.params.subjectKey);
  const { user } = useContext(AuthContext);
  const [subjectData, setSubjectData] = useState("");

  const db = getDatabase(app);
  const [historic, setHistoric] = useState([]);

  const subjectRef = ref(
    db,
    "concursos/" + user.uid + "/" + concursoSelected + "/subjects/" + subjectKey
  );

  useEffect(() => {
    onValue(
      subjectRef,
      (snapshot) => {
        setHistoric([]);
        let perforObj = snapshot.val().performance;
        if (perforObj) {
          Object.keys(perforObj).forEach((item) => {
            let perforItem = {
              value: perforObj[item].value,
              id: perforObj[item].id,
            };
            setHistoric((oldList) => [...oldList, perforItem]);
          });
        }
        setSubjectData(snapshot.val());
      },
      { onlyOnce: true }
    );
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

  function addHistoric(value, id) {
    if (value === "" || id === "") {
      alert("Campo com informação ausente");
    } else {
      const performanceRef = ref(
        db,
        "concursos/" +
          user.uid +
          "/" +
          concursoSelected +
          "/subjects/" +
          subjectKey +
          "/performance"
      );
      let perfKey = push(performanceRef);
      set(perfKey, {
        value: value,
        id: id,
      }).then(() => {
        setHistoric([
          ...historic,
          {
            key: value,
            value: value,
            id: id,
          },
        ]);
      });
    }
    setModalVisible(false);
  }

  let xAxios = historic.map((item) => item.id);
  let yAxios = historic.map((item) => item.value);

  console.log(typeof yAxios[0]);

  return (
    <Container>
      <Modal visible={modalVisible} transparent={true}>
        <ModalHistoric shows={setModalVisible} addHistoric={addHistoric} />
      </Modal>
      <Header goBack={true} concursoSelected={route.params.concursoSelected} />
      <TitleWrapper>
        <Text style={{ color: "#3865A8", fontSize: 20 }}>
          {subjectData.name}
        </Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={{ color: "#FFF", fontSize: 20 }}>Inserir</Text>
        </TouchableOpacity>
      </TitleWrapper>
      <Historic>
        <Text style={{ fontSize: 18, color: "#fff" }}>Histórico</Text>
        <FlatList
          data={historic}
          renderItem={({ item }) => (
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: "#fff" }}>{item.id}</Text>
              <Text style={{ color: "#fff" }}>{item.value}</Text>
            </View>
          )}
        />
      </Historic>
      <PerformanceChart>
        <LineChart
          data={{
            labels: xAxios,
            datasets: [
              {
                data: yAxios.length >= 1 ? yAxios : [0],
              },
            ],
          }}
          onDataPointClick={({ value }) => {
            alert(value);
          }}
          width={Dimensions.get("window").width * 0.9} // from react-native
          height={300}
          yAxisInterval={1} // optional, defaults to 1
          yAxisSuffix="/100"
          fromZero={true}
          verticalLabelRotation={65}
          segments={
            [...new Set(yAxios)].length > 5 ? 5 : [...new Set(yAxios)].length
          }
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: 0,
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "1",
              strokeWidth: "2",
              stroke: "#FFFF",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </PerformanceChart>
    </Container>
  );
}
