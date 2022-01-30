import React from "react";

import { Container, ConcText } from "./styles";

export default function ConcItem({ data }) {
  return (
    <Container>
      <ConcText>{data.orgao}</ConcText>
      <ConcText>{data.cargo}</ConcText>
    </Container>
  );
}
