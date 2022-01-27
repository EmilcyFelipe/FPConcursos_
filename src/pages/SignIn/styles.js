import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #202020;
  align-items: center;
  justify-content: center;
`;
export const LogoWrapper = styled.View``;

export const Logo = styled.Image``;

export const InputWrapper = styled.View`
  width: 90%;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: "#979797",
})`
  background-color: #1c1c1c;
  width: 100%;
  height: 55px;
  font-size: 16px;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
  color: #fff
`;

export const Submit = styled.TouchableOpacity`
  height: 55px;
  background-color: #ff5c00;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const SubmitText = styled.Text`
  font-size: 20px;
  color: #fff;
`;

export const Link = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const LinkText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;
