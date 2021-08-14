import styled from 'styled-components/native';
import Colors from '../../Colors';

export const AdButtonContainer = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  background-color: ${Colors.Purple.Idle};
  padding: 0px 15px;
  height: 48px;
`;

export const AdButtonBlock = styled.View`
  flex: 1;
  align-items: ${props => (props.alignToRight ? 'flex-end' : 'flex-start')};
`;
