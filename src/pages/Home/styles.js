import styled from 'styled-components/native';
import Colors from '../../Colors';

export const TopContainer = styled.View`
  background-color: ${Colors.Purple.Idle};
  padding-bottom: 80px;
`;

export const BottomContainer = styled.SafeAreaView`
  elevation: 5;
  background-color: #fff;
  padding: 15px;
  margin: 10px;
  margin-top: -80px;
  border-radius: 10px;
`;
