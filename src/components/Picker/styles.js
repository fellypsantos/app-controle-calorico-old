import styled from 'styled-components/native';
import {Picker} from '@react-native-picker/picker';
import Colors from '../../Colors';

export const Container = styled.View`
  border-width: 1px;
  border-color: ${Colors.Purple.Idle};
  border-radius: 5px;
`;

export const PickerControl = styled(Picker)`
  height: 50px;
  margin-top: -5px;
`;

export const PickerControlItem = styled(Picker.Item)``;
