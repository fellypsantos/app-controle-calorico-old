import styled from 'styled-components/native';
import Colors from '../../Colors';

export const Container = styled.TouchableOpacity`
  elevation: 5;
  background-color: #fff;
  padding: 15px;
  margin: 10px;
  border-radius: 10px;
  flex-direction: row;
`;

export const RightContentBox = styled.View`
  flex: 1;
  margin-left: 10px;
`;

export const BlockTitle = styled.Text`
  color: ${Colors.Grey.Default};
  font-size: 15px;
  font-family: 'Open Sans Bold';
`;

export const BlockDescription = styled.Text`
  margin-top: 5px;
  color: ${Colors.Grey.Default};
  font-family: 'Open Sans Regular';
  font-size: 15px;
`;
