import React, { useState } from "react";
import { View, Text } from "react-native";

import { Container, HeaderText, EmailInput, ActionReset } from "./styles";
import app from "../../services/firebaseConnection";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function ForgottenPassword() {
  const [emailValue, setEmailValue] = useState("");

  const auth = getAuth(app);

  function sendEmailToReset() {
    if (emailValue === "") {
      alert("Insira um e-mail válido");
      return;
    }
    sendPasswordResetEmail(auth, emailValue)
      .then(() => {
        alert(`Email de recuperação enviado para ${emailValue}`);
        setEmailValue("");
      })
      .catch((err) => {
        alert(err);
      });
  }
  return (
    <Container>
      <EmailInput
        placeholder="Email"
        autoCapitalize="none"
        value={emailValue}
        onChangeText={(text) => {
          setEmailValue(text);
        }}
      />
      <ActionReset onPress={sendEmailToReset}>
        <Text style={{ fontWeight: "bold" }}>Enviar email de recuperação</Text>
      </ActionReset>
    </Container>
  );
}
