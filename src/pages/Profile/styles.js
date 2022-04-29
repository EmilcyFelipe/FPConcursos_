import styled from "styled-components";

export const Container = styled.View`
  flex: 1;
  background-color: #1c1c1c;
  align-items: center;
`;

export const HeaderProfile = styled.View`
  background-color: #121212;
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 20px;
`;

export const UserInformations = styled.View``;

export const EditButton = styled.TouchableOpacity`
  width: 90%;
  padding: 10px;
  background-color: #22540b;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 10px;
`;

export const EditText = styled.Text`
  font-size: 20px;
  color: #fff;
`;

export const ExitButton = styled.TouchableOpacity`
  width: 90%;
  padding: 10px;
  background-color: #ac3f3f;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 10px;
`;

export const ExitText = styled.Text`
  text-align: center;
  color: #fff;
  font-size: 20px;
`;
