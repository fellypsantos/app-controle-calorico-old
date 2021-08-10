import React from 'react';
import {Text} from 'react-native';

import {
  ButtonInputHandler,
  ButtonInputHandlerIcon,
  Container,
  TextInputControl,
} from './styles';

import FormLabelControl from '../FormLabelControl';

const TextInputCustom = ({
  value,
  placeholder,
  onChange,
  renderAsDateTimePicker,
  handleIconFunction,
  keyboardType = 'default',
  label = 'TheLabel',
}) => (
  <>
    <FormLabelControl text={label} />
    <Container>
      <TextInputControl
        value={value}
        placeholder={placeholder}
        onChangeText={onChange}
        editable={!renderAsDateTimePicker}
        keyboardType={keyboardType}
      />

      <ButtonInputHandler onPress={handleIconFunction}>
        <ButtonInputHandlerIcon
          name={renderAsDateTimePicker ? 'clock' : 'trash'}
          size={18}
        />
      </ButtonInputHandler>
    </Container>
  </>
);

export default TextInputCustom;
