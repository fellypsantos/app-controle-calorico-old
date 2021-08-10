import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../Colors';

const TouchableHighlightStyledProps = {
  underlayColor: Colors.Purple.UnderlayColor,
};

export const Container = styled.View`
  flex-direction: row;
  background-color: ${Colors.Purple.Idle};
  margin-bottom: 5px;
`;

export const DatePickerButton = styled.TouchableHighlight.attrs(
  TouchableHighlightStyledProps,
)`
  padding: 20px 25px;
`;

export const DatePickerButtonIcon = styled(Icon)`
  color: #fff;
`;

export const DatePickerCurrentDateContainer = styled.TouchableHighlight.attrs(
  TouchableHighlightStyledProps,
)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const DatePickerCurrentDate = styled.Text`
  font-family: 'Open Sans Regular';
  color: #fff;
  font-size: 16px;
`;
