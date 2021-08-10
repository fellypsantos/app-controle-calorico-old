import React from 'react';

import {Container, IconBox, Label} from './styles';

const ButtonDefault = ({text = '', onPress}) => (
  <Container onPress={onPress}>
    <>
      <IconBox name="check" size={18} />
      <Label>{text}</Label>
    </>
  </Container>
);

export default ButtonDefault;
