import styled from "styled-components";

export const Container = styled.View`
  flex: 1;
  background-color: #191919;
  align-items: center;
`;

export const TitleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const Step = styled.TouchableOpacity`
  background-color: #121212;
  width: 100%;
  border-radius: 5px;
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

export const StepText = styled.Text`
  font-size: 20px;
  color: #fff;
`;

export const StepDate = styled.View``;

export const StepDateText = styled.Text`
  font-size: 16px;
  color: #fff;
`;

export const ModalContent = styled.View`
  width: 90%;
  border-radius: 10px;
  background-color: #202020;
  margin: auto;
  padding: 20px;
`;

export const ModalHeadText = styled.Text`
  color: #ff5c00;
  font-size: 20px;
  margin-left: 5%;
`;

export const ModalInput = styled.TextInput.attrs({
  placeholderTextColor: "#fff8",
})`
  width: 90%;
  padding: 10px;
  background-color: #121212;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
  font-size: 18px;
  color: #fff;
`;

export const ModalButton = styled.TouchableOpacity`
  padding: 10px;
  height: 50px;
  background-color: #3865a8;
  border-radius: 10px;
  margin-top: 10px;
  align-items: center;
`;
