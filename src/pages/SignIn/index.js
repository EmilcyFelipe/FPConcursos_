import React, {useContext, useState} from "react";
import { useNavigation } from "@react-navigation/native";

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
} from "./styles";
import { 
    View, 
    Text, 
    Keyboard, 
    TouchableWithoutFeedback
} from "react-native";

import { AuthContext } from "../../contexts/auth";


export default function SignIn() {
    const navigation = useNavigation();

    const {signIn} = useContext(AuthContext);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

  return (
      <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
        <Container>
        <Text style={{ color: "#FF5C00", position: 'absolute', top: 20, left:20}}>FPConcursos</Text>
        <LogoWrapper>
            <Logo source={require("../../assets/login.png")} resizeMode="cover" />
        </LogoWrapper>
        <InputWrapper>
            <Input 
            placeholder="E-mail" 
            value={email} 
            onChangeText={(text)=>setEmail(text)}
            />
            <Input 
            placeholder="Password" 
            value={password}
            onChangeText={(text)=>setPassword(text)}
            />
            <Submit onPress={()=>signIn(email,password)}>
            <SubmitText>Entrar</SubmitText>
            </Submit>
        </InputWrapper>
        <Link onPress={()=>{navigation.navigate('SignUp')}}>
            <LinkText>Criar uma conta</LinkText>
        </Link>
        </Container>
      </TouchableWithoutFeedback>
  );
}
