import React, { useState, useContext, useEffect } from "react";
import { Dimensions } from "react-native";

import {
  Container,
  LogoWrapper,
  InputWrapper,
  Input,
  Submit,
  SubmitText,
} from "../SignIn/styles";

import SignupImg from "../../assets/signup.svg";

import { AuthContext } from "../../contexts/auth";

import {
  View,
  Text,
  Switch,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [genrer, setGenrer] = useState(false);

  const { signUp } = useContext(AuthContext);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <Text
          style={{ color: "#FF5C00", position: "absolute", top: 20, left: 20 }}
        >
          FPConcursos
        </Text>
        <LogoWrapper>
          <SignupImg
            width={Dimensions.get("window").width * 0.8}
            height={300}
            fill={"red"}
          />
        </LogoWrapper>
        <InputWrapper>
          <Input
            placeholder="Nome"
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
          />
          <Input
            placeholder="E-mail"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: "#fff" }}>M</Text>
            <Switch
              value={genrer}
              onValueChange={(value) => {
                setGenrer(value);
              }}
            />
            <Text style={{ color: "#fff" }}>F</Text>
          </View>
          <Submit onPress={() => signUp(name, email, password, genrer)}>
            <SubmitText>Cadastrar</SubmitText>
          </Submit>
        </InputWrapper>
      </Container>
    </TouchableWithoutFeedback>
  );
}
