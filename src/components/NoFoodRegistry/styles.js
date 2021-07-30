import styled from 'styled-components/native';

export const Container = styled.View`
  display: ${props => (props.hidden ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

export const NoRegistryLabel = styled.Text`
  font-family: 'Open Sans Regular';
  font-size: 15px;
  padding: 15px;
  margin-top: 5px;
`;
