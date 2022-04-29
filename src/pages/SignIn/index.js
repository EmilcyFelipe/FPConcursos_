import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  Container,
  LogoWrapper,
  InputWrapper,
  Input,
  Submit,
  SubmitText,
  Link,
  LinkText,
} from "./styles";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import { AuthContext } from "../../contexts/auth";

import Logo from "../../assets/research.svg";

export default function SignIn() {
  const navigation = useNavigation();

  const { signIn, setWrongAuth, wrongAuth } = useContext(AuthContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <Text
          style={{ color: "#FF5C00", position: "absolute", top: 20, left: 20 }}
        >
          FPConcursos
        </Text>
        <LogoWrapper>
          <Logo
            width={Dimensions.get("window").width * 0.8}
            height={300}
            fill={"red"}
          />
        </LogoWrapper>
        <InputWrapper>
          <Input
            placeholder="E-mail"
            value={email}
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder="Senha"
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
          <Submit onPress={() => signIn(email, password)}>
            <SubmitText>Entrar</SubmitText>
          </Submit>
          {wrongAuth && (
            <Text style={{ color: "red", fontSize: 12 }}>
              Email ou senha incorretos
            </Text>
          )}
        </InputWrapper>
        <Link
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <LinkText>Criar uma conta</LinkText>
        </Link>
        <Link
          onPress={() => navigation.navigate("ForgottenPass", { email: email })}
        >
          <LinkText>Esqueci minha senha</LinkText>
        </Link>
      </Container>
    </TouchableWithoutFeedback>
  );
}
