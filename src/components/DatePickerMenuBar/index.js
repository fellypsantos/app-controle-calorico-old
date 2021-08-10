import React from 'react';
import {
  Container,
  DatePickerButton,
  DatePickerButtonIcon,
  DatePickerCurrentDateContainer,
  DatePickerCurrentDate,
} from './styles';

const DatePickerMenuBar = () => (
  <Container>
    <DatePickerButton onPress={() => null}>
      <DatePickerButtonIcon name="chevron-left" />
    </DatePickerButton>

    <DatePickerCurrentDateContainer onPress={() => null}>
      <DatePickerCurrentDate>31 de Julho de 2021</DatePickerCurrentDate>
    </DatePickerCurrentDateContainer>

    <DatePickerButton onPress={() => null}>
      <DatePickerButtonIcon name="chevron-right" />
    </DatePickerButton>
  </Container>
);

export default DatePickerMenuBar;
