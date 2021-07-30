import styled from 'styled-components/native';
import Colors from '../../Colors';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PhraseRegistryCount = styled.Text`
  font-family: 'Open Sans Regular';
  font-size: 15px;
  color: ${Colors.Grey.Default};
`;

export const ButtonAddFoodRegistry = styled.TouchableOpacity`
  padding: 2px 0px 2px 10px;
`;
