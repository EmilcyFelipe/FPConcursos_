import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import {
  Container,
  HeaderProfile,
  EditButton,
  EditText,
  ExitButton,
  ExitText,
  UserInformations,
} from "./styles";
import { Feather } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../../contexts/auth";
import FemaleAvatar from "../../assets/female_avatar.svg";
import MaleAvatar from "../../assets/male_avatar.svg";

export default function Profile() {
  const { logOut, user } = useContext(AuthContext);
  const navigation = useNavigation();
  const [name, setName] = useState(user.name);

  return (
    <Container>
      <HeaderProfile>
        <TouchableOpacity
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <Feather name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, marginLeft: 20, color: "#fff" }}>
          Perfil
        </Text>
      </HeaderProfile>
      {user.genrer === "M" ? (
        <MaleAvatar width={200} height={200} />
      ) : (
        <FemaleAvatar width={200} height={200} />
      )}
      <UserInformations>
        <Text style={{ color: "#fff" }}>Nome: {user.name}</Text>
        <Text style={{ color: "#fff" }}>Email: {user.email}</Text>
        <Text style={{ color: "#fff" }}>
          Gênero: {user.genrer === "M" ? "Masculino" : "Feminino"}
        </Text>
      </UserInformations>
      <EditButton onPress={() => navigation.navigate("EditProfile")}>
        <EditText>Editar</EditText>
      </EditButton>
      <ExitButton onPress={logOut}>
        <ExitText>Sair</ExitText>
      </ExitButton>
    </Container>
  );
}
