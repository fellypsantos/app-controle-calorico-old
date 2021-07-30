import React from 'react';

import {
  ButtonClearInput,
  ClearInputIcon,
  Container,
  TextInputControl,
} from './styles';

const TextInputCustom = ({value, placeholder}) => (
  <Container>
    <TextInputControl value={value} placeholder={placeholder} />

    <ButtonClearInput onPress={() => console.log('clear')}>
      <ClearInputIcon name="trash" size={18} />
    </ButtonClearInput>
  </Container>
);

export default TextInputCustom;
