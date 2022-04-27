import styled from "styled-components";

export const Container = styled.View`
  width: 100%;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
`;

export const MainMenu = styled.TouchableOpacity`
  width: 100%;
  padding: 20px;
  flex-direction: row;
  background-color: #121212;
  justify-content: space-between;
`;

export const Submenu = styled.TouchableOpacity`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #1c1c1c;
  margin-top: 5px;
`;
