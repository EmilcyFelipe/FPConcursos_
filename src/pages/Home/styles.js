import styled from "styled-components";

export const Container = styled.View`
  flex: 1;
  background-color: #202020;
`;

export const Welcome = styled.Text`
  color: #ff5c0a;
  margin-left: 5%;
  margin-top: 20px;
`;

export const ActionsWrapper = styled.View`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
`;

export const ActionRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 50px;
 
`;

export const ActionItem = styled.TouchableOpacity`
  height: 100px;
  width: 100px;
  background-color: #1C1C1C;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const ActionText = styled.Text`
  color: #FFF
`;