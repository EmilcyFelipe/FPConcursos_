import styled from "styled-components";

export const Container = styled.View`
  flex: 1;
  background-color: #191919;
  align-items: center;
`;

export const TitleWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  margin-top: 40px;
  margin-bottom: 10px;
`;

export const Step = styled.View`
  background-color: #121212;
  width: 90%;
  height: 70px;
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

export const StepText = styled.Text`
  font-size: 25px;
  color: #fff;
`;

export const StepDate = styled.View``;

export const StepDateText = styled.Text`
  font-size: 18px;
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
  placeholderTextColor: "rgba(0, 0, 0, 0.6)",
})`
  width: 90%;
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
  font-size: 18px;
  color: #fff;
`;

export const ModalButton = styled.TouchableOpacity`
  width: 40%;
  padding: 10px;
  background-color: #3865a8;
  border-radius: 10px;
  margin-top: 10px;
  align-items: center;
`;
