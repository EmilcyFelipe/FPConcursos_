import styled from "styled-components";

export const Container = styled.View`
  width: 90%;
  padding: 20px;
  background-color: #1c1c1c;
  margin: auto;
  border-radius: 10px;
`;

export const ValueInput = styled.TextInput`
  background-color: #121212;
  border-radius: 5px;
  margin-top: 10px;
  padding: 5px;
  color: #fff;
`;

export const DateInput = styled.TextInput`
  background-color: #121212;
  border-radius: 5px;
  margin-top: 10px;
  padding: 5px;
  color: #fff;
`;

export const ActionView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

export const ApplyButton = styled.TouchableOpacity`
  background-color: #3865a8;
  padding: 10px 20px;
  border-radius: 5px;
`;

export const CancelButton = styled.TouchableOpacity`
  background-color: #ac3f3f;
  padding: 10px 20px;
  border-radius: 5px;
`;
