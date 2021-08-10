import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Colors from '../../Colors';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  border: 1px solid #ccc;
  background-color: ${Colors.Purple.Idle};
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  padding: 12px 5px;
`;

export const IconBox = styled(Icon)`
  color: #fff;
  padding: 2px 10px;
`;

export const Label = styled.Text`
  font-family: 'Open Sans Regular';
  color: #fff;
`;
