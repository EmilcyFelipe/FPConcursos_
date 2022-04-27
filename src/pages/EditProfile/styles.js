import styled from "styled-components";

export const Container = styled.View`
  padding: 20px;
  background-color: #1c1c1c;
  flex: 1;
`;

export const InputWrapper = styled.View``;

export const InputElement = styled.TextInput.attrs({
  placeholderTextColor: "#fff",
})`
  color: #ff5c00;
  font-size: 18px;
  background-color: #121212;
  border-radius: 10px;
  padding: 10px;
`;

export const ActionEdit = styled.TouchableOpacity`
  background-color: #3865a8;
  border-radius: 10px;
  width: 200px;
  padding: 15px;
  align-items: center;
  margin-top: 20px;
  margin-left: auto;
  margin-right: 0;
`;
