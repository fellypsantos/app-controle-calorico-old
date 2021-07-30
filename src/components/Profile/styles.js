import styled from 'styled-components/native';
import Colors from '../../Colors';

export const Container = styled.View`
  align-items: center;
`;

export const ProfilePicture = styled.Image`
  background-color: #f6f6f5;
  border-width: 2px;
  border-color: ${Colors.Purple.Light};
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-bottom: 10px;
`;

export const Name = styled.Text`
  font-family: 'Open Sans Regular';
  font-size: 25px;
  color: ${Colors.Purple.Light};
  margin-bottom: 5px;
`;

export const Phrase = styled.Text`
  font-family: 'Open Sans Regular';
  font-size: 12px;
  color: ${Colors.Purple.Light};
  font-style: italic;
`;
