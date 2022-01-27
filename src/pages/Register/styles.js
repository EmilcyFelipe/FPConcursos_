import styled from "styled-components";

export const Container = styled.View`
  flex: 1;
  background-color: #1c1c1c;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 12px;
  color: #ff5c00;
  margin-left: 5%;
`;

export const InputArea = styled.View`
  align-items: center;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: "#505050",
})`
  padding: 10px;
  font-size: 18px;
  width: 90%;
  height: 50px;
  background-color: #121212;
  margin-top: 20px;
  border-radius: 10px;
  color: #fff;
`;

export const Submit = styled.TouchableOpacity`
  background-color: #3865a8;
  height: 50px;
  width: 90%;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-left: 5%;
`;

export const SubmitText = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
`;
