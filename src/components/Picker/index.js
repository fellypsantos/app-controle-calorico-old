import React from 'react';
import FormLabelControl from '../FormLabelControl';
import {Container, PickerControl, PickerControlItem} from './styles';

const Picker = ({label, items, selectedValue, onValueChange}) => (
  <>
    <FormLabelControl text={label} />
    <Container>
      <PickerControl
        selectedValue={selectedValue}
        onValueChange={onValueChange}>
        {items.map(item => (
          <PickerControlItem
            key={item.label}
            label={item.label}
            value={item.value}
          />
        ))}
      </PickerControl>
    </Container>
  </>
);

export default Picker;
