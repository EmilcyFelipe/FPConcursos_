import React, { useState, useContext, useEffect } from "react";

import {
  Container,
  LogoWrapper,
  Logo,
  InputWrapper,
  Input,
  Submit,
  SubmitText,
  Link,
  LinkText,
} from "../SignIn/styles";

import { AuthContext } from "../../contexts/auth";

import { View, Text, Switch, Keyboard, TouchableWithoutFeedback} from "react-native";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [genrer, setGenrer] = useState(false);


  const { signUp } = useContext(AuthContext);

  return (
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
    <Container>
      <Text style={{ color: "#FF5C00", position: 'absolute', top: 20, left:20}}>FPConcursos</Text>
      <InputWrapper>
        <Input placeholder="Nome" value={name} onChangeText={(text)=>{setName(text)}}/>
        <Input placeholder="E-mail" value={email} onChangeText={(text)=>{setEmail(text)}}/>
        <Input placeholder="Password" value={password} onChangeText={(text)=>{setPassword(text)}}/>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{color:'#fff'}}>M</Text>
          <Switch
          value={genrer}
            onValueChange={(value) => {setGenrer(value)}}
          />
          <Text style={{color:'#fff'}}>F</Text>
        </View>
        <Submit onPress={()=>signUp(name, email, password, genrer)}>
          <SubmitText>Cadastrar</SubmitText>
        </Submit>
      </InputWrapper>
    </Container>
    </TouchableWithoutFeedback>
  );
}
