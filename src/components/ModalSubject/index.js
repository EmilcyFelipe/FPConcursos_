import React,{useState} from "react";
import { View, Text, TextInput } from "react-native";

import { Container, ModalInput, ActionWrapper, ActionButton } from "./styles";

export default function ModalSubject({ shows, addSubject }) {
    const [subjectValue, setSubjectValue] = useState('');

    function handleAddButton(){
        addSubject(subjectValue);
        setSubjectValue('')
    }
  return (
    <Container>
      <Text style={{ fontSize: 18, color: "#FFF" }}>Adicionar</Text>
      <ModalInput placeholder="Conteúdo" value={subjectValue} onChangeText={(text)=>{setSubjectValue(text)}} />
      <ActionWrapper>
        <ActionButton
          style={{ backgroundColor: "#AC3F3F" }}
          onPress={() => shows(false)}
        >
          <Text style={{ color: "#FFF" }}>Cancelar</Text>
        </ActionButton>
        <ActionButton onPress={handleAddButton}>
          <Text style={{ color: "#FFF" }}>Adicionar</Text>
        </ActionButton>
      </ActionWrapper>
    </Container>
  );
}
