import styled from "styled-components";

export const Container = styled.View`
  align-items: center;
  background-color: #1c1c1c;
  flex: 1;
`;

export const EmailInput = styled.TextInput.attrs({
  placeholderTextColor: "#fff",
})`
  background-color: #121212;
  margin-top: 20px;
  width: 90%;
  padding: 10px;
  border-radius: 10px;
  color: #ffff;
`;

export const ActionReset = styled.TouchableOpacity`
  background-color: #8db8f8;
  border-radius: 10px;
  margin-top: 20px;
  width: 90%;
  padding: 10px;
  align-items: center;
`;
