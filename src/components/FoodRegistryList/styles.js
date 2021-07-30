import styled from 'styled-components/native';
import Colors from '../../Colors';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 25px;
`;

export const IconContainer = styled.View`
  background-color: ${Colors.Purple.Idle};
  padding: 15px;
  border-radius: 7px;
  margin-right: 10px;
`;

export const IconImage = styled.Image`
  width: 25px;
  height: 25px;
`;

export const RegistryDataContainer = styled.View`
  flex: 1;
  margin-right: 5px;
`;

export const FoodName = styled.Text`
  font-family: 'Open Sans Regular';
  font-size: 17px;
  margin-bottom: 2px;
  color: ${Colors.Grey.Default};
`;

export const FoodInfo = styled.Text`
  font-family: 'Open Sans Regular';
  font-size: 13px;
  margin-bottom: 2px;
  color: ${Colors.Grey.Default};
`;
