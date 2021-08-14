import styled from 'styled-components/native';
import Colors from '../../Colors';

export const Container = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-family: 'Open Sans Bold';
  font-size: 20px;
  margin: 30px auto;
  margin-top: 40px;
`;

export const Subtitle = styled.Text`
  font-family: 'Open Sans Regular';
  padding: 10px 25px;
  text-align: center;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 30px;
`;

export const ActionButton = styled.TouchableOpacity`
  padding: 10px 20px;
  background-color: ${props =>
    props.showAsCancel ? '#fff' : Colors.Purple.UnderlayColor};
  elevation: 3;
  border-width: 1px;
  border-color: #dedede;
  border-radius: 5px;
  justify-content: center;
  margin: 0px 5px;
`;

export const ActionButtonText = styled.Text`
  text-align: center;
  color: ${props => (props.showAsCancel ? '#555' : '#fff')};
`;
