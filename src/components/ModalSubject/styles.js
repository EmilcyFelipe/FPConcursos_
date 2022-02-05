import styled from "styled-components";

export const Container = styled.View`
  width: 90%;
  padding: 20px;
  background-color: #1c1c1c;
  margin: auto;
`;

export const ModalInput = styled.TextInput.attrs({
  placeholderTextColor: "#fff",
})`
  background-color: #121212;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px;
  color: #fff;
  margin-top: 10px;
`;

export const ActionWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;
export const ActionButton = styled.TouchableOpacity`
  width: 40%;
  padding: 10px;
  background-color: #3865a8;
  align-items: center;
  border-radius: 10px;
`;
