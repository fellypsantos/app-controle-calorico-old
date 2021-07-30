import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../Colors';

export const Container = styled.View`
  flex-direction: row;
  padding: 1px;
  border-width: 1px;
  border-radius: 5px;
  border-color: ${Colors.Purple.Idle};
`;

export const TextInputControl = styled.TextInput`
  flex: 1;
  font-family: 'Open Sans Regular';
  font-size: 16px;
  padding: 8px 10px;
`;

export const ButtonClearInput = styled.TouchableOpacity`
  justify-content: center;
  padding: 0 10px;
`;

export const ClearInputIcon = styled(Icon)`
  color: ${Colors.Purple.Idle};
`;
