import styled from "styled-components/native";

export const Container = styled.View`
  background-color: #1c1c1c;
  width: 90%;
  margin: auto;
  min-height: 200px;
  padding: 5%;
  justify-content: space-around;
`;
export const ModalHeader = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

export const InputSubmenu = styled.TextInput.attrs({
  placeholderTextColor: "#505050",
})`
  color: #fff;
  background-color: #121212;
  border-radius: 10px;
  height: 40px;
  padding: 5px;
`;

export const ActionWrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;
export const ActionButton = styled.TouchableOpacity`
  color: #fff;
  background-color: #121212;
  padding: 10px;
  border-radius: 10px;
`;
