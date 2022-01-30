import styled from "styled-components";

export const Container = styled.View`
  width: 100%;
  height: 70px;
  background-color: #121212;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding-left: 5%;
  padding-right: 5%;
`;

export const Button = styled.TouchableOpacity`
  margin-top: auto;
  margin-bottom: auto;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 20px;
  margin: auto;
`;

export const Subtitle = styled.Text`
  color: #ff5c0a;
  margin-bottom: 0px;
`;
