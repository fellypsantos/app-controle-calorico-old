import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../Colors';

const handleMarginMiddleBlock = props => (props.isMiddle ? '5px' : '0');

export const MainContainer = styled.View`
  flex-direction: row;
`;

export const TouchableContainer = styled.TouchableHighlight`
  flex: 1;
  margin-left: ${handleMarginMiddleBlock};
  margin-right: ${handleMarginMiddleBlock};
  border-radius: 10px;
  overflow: hidden;
`;

export const Container = styled.View`
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.isChecked ? Colors.Purple.Idle : '#dfdfdf'};
`;

export const TheLabel = styled.Text`
  margin-top: 8px;
  color: ${props => (props.isChecked ? '#fff' : '#000')};
`;

export const TheIcon = styled(Icon)`
  color: ${props => (props.isChecked ? Colors.Purple.Light : '#000')};
`;
