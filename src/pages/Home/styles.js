import styled from 'styled-components/native';
import Colors from '../../Colors';

export const TopContainer = styled.View`
  background-color: ${Colors.Purple.Idle};
  height: 380px;
`;

export const BottomContainer = styled.View`
  elevation: 5;
  background-color: #fff;
  padding: 15px;
  margin: 10px;
  margin-top: -50px;
  border-radius: 10px;
`;

export const ListContainer = styled.View`
  margin-top: 10px;
`;

export const ListItemTouchable = styled.TouchableOpacity`
  padding: 2px 0px;
`;
