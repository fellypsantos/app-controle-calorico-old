import styled from 'styled-components/native';
import Colors from '../../Colors';

const getBorderWidth = props => (props.isMiddle ? '1px' : '0px');

export const Container = styled.View`
  flex-direction: row;
  margin-top: 25px;
  margin-bottom: 25px;
`;

export const ContainerKcalInfo = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  border-color: ${Colors.Purple.Light};
  border-left-width: ${getBorderWidth};
  border-right-width: ${getBorderWidth};
`;

export const KcalValue = styled.Text`
  font-family: 'Open Sans Regular';
  font-size: ${props => (props.isMiddle ? '30px' : '20px')}
  font-weight: ${props => (props.isMiddle ? 'bold' : 'normal')};
  color: ${Colors.Purple.Light};
  margin-bottom: 5px;
`;

export const KcalLabel = styled.Text`
  font-family: 'Open Sans Regular';
  font-size: 12px;
  color: ${Colors.Purple.Light};
`;
