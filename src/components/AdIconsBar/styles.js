import styled from 'styled-components/native';
import Colors from '../../Colors';

export const AdButtonContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  background-color: ${Colors.Purple.Idle};
  padding: 10px 15px;
`;

export const AdButtonBlock = styled.View`
  flex: 1;
  align-items: ${props => (props.alignToRight ? 'flex-end' : 'flex-start')};
`;
