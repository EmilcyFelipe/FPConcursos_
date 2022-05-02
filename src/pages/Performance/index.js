import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  Alert,
} from "react-native";

import { AuthContext } from "../../contexts/auth";

import Header from "../../components/Header";
import { Container, Historic, TitleWrapper, PerformanceChart } from "./styles";
import ModalHistoric from "../../components/ModalHistoric";

import {
  getDatabase,
  onValue,
  ref,
  push,
  set,
  remove,
} from "firebase/database";
import app from "../../services/firebaseConnection";

import { LineChart } from "react-native-chart-kit";
import { FlatList } from "react-native-gesture-handler";

import { AntDesign } from "@expo/vector-icons";

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
    onValue(subjectRef, (snapshot) => {
      setHistoric([]);
      let perforObj = snapshot.val().performance;
      if (perforObj) {
        Object.keys(perforObj).forEach((item) => {
          let perforItem = {
            value: perforObj[item].value,
            total: perforObj[item].total,
            id: perforObj[item].id,
            key: item,
          };
          setHistoric((oldList) => [...oldList, perforItem]);
        });
      }
      setSubjectData(snapshot.val());
    });
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

  function addHistoric(value, total, id) {
    let proportion = (value * 100) / total;
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
      total: total,
      id: id,
    }).then(() => {
      setHistoric([
        ...historic,
        {
          key: value,
          value: value,
          total: total,
          id: id,
        },
      ]);
    });

    setModalVisible(false);
  }

  function handleDelete(itemKey) {
    Alert.alert("Deseja excluir esse item?", "Essa ação não é reversível!", [
      {
        text: "Confirmar",
        style: "default",
        onPress: () => {
          deleteHistoricItem(itemKey);
        },
      },
      {
        text: "Cancelar",
        style: "cancel",
        onPress: () => {},
      },
    ]);
  }

  function deleteHistoricItem(itemKey) {
    let historicItemRef = ref(
      db,
      "concursos/" +
        user.uid +
        "/" +
        concursoSelected +
        "/subjects/" +
        subjectKey +
        "/performance/" +
        itemKey
    );
    remove(historicItemRef);
  }

  function help() {
    alert(
      "A representação gráfica é referente a quantidade de acertos em relação a 100 unidades de questões. Dessa forma, os dados inseridos são convertidos para essa proporção de x acertos para cada 100 questões"
    );
  }

  let xAxios = historic.map((item) => item.id);
  let yAxios = historic.map((item) => {
    let value = (item.value * 100) / item.total;
    return value;
  });

  return (
    <Container>
      <Modal visible={modalVisible} transparent={true}>
        <ModalHistoric shows={setModalVisible} addHistoric={addHistoric} />
      </Modal>
      <Header goBack={true} concursoSelected={route.params.concursoSelected} />
      <TouchableOpacity
        onPress={help}
        style={{ marginLeft: "auto", marginRight: "5%", marginTop: 10 }}
      >
        <AntDesign name="questioncircle" size={24} color="#fff" />
      </TouchableOpacity>
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
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{ width: "100%", height: 2, backgroundColor: "#8DB8F8" }}
              ></View>
            );
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onLongPress={() => {
                handleDelete(item.key);
              }}
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: "#fff" }}>{item.id}</Text>
              <Text style={{ color: "#fff" }}>
                {item.value}/{item.total}
              </Text>
            </TouchableOpacity>
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
          getDotColor={() => "red"}
          segments={
            [...new Set(yAxios)].length > 5 ? 5 : [...new Set(yAxios)].length
          }
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#8DB8F8",
            backgroundGradientTo: "#8DB8F8",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: () => `#fff`,
            labelColor: () => `#fff`,
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
