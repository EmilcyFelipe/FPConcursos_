import React, { useContext } from "react";
import { View, Text } from "react-native";

import { Container, ExitButton, ExitText, UserInformations } from "./styles";

import { AuthContext } from "../../contexts/auth";
import FemaleAvatar from "../../assets/female_avatar.svg";
import MaleAvatar from "../../assets/male_avatar.svg";

export default function Profile() {
  const { logOut, user } = useContext(AuthContext);
  return (
    <Container>
      {user.genrer === "M" ? (
        <MaleAvatar width={200} height={200} />
      ) : (
        <FemaleAvatar width={200} height={200} />
      )}
      <UserInformations>
        <Text>Nome: {user.name}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Gênero: {user.name === "M" ? "Masculino" : "Feminino"}</Text>
      </UserInformations>
      <ExitButton onPress={logOut}>
        <ExitText>Sair</ExitText>
      </ExitButton>
    </Container>
  );
}
