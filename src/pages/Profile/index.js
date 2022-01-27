import React, { useContext } from "react";
import { View, Text } from "react-native";

import { Container, ExitButton, ExitText } from "./styles";

import { AuthContext } from "../../contexts/auth";

export default function Profile() {
  const { logOut } = useContext(AuthContext);
  return (
    <Container>
      <ExitButton onPress={logOut}>
        <ExitText>Sair</ExitText>
      </ExitButton>
    </Container>
  );
}
