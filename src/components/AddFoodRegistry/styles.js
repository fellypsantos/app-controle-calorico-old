import styled from 'styled-components/native';
import Colors from '../../Colors';

export const Container = styled.ScrollView`
  flex: 1;
`;

export const AppSection = styled.View`
  flex: 1;
  padding: 20px;
`;

export const AdSection = styled.View`
  min-height: 50px;
  justify-content: center;
  align-items: center;
`;

export const HeaderIcons = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const CloseIconBox = styled.TouchableOpacity`
  color: red;
  padding-left: 15px;
`;

export const MainTitle = styled.Text`
  font-family: 'Open Sans Bold';
  font-size: 22px;
  margin: 10px 0;
`;

export const SubTitle = styled.Text`
  font-family: 'Open Sans Regular';
  font-size: 15px;
  color: ${Colors.Grey.Default};
`;

export const FormContainer = styled.View``;

export const FormInputLabel = styled.Text`
  font-family: 'Open Sans Bold';
  font-size: 18px;
  margin-top: 25px;
  margin-bottom: 10px;
`;

export const ButtonsContainer = styled.View`
  margin-top: 25px;
`;
