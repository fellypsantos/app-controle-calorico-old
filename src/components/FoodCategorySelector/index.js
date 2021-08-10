import React, {useState} from 'react';

import {
  TouchableContainer,
  Container,
  TheLabel,
  MainContainer,
  TheIcon,
} from './styles';

const FoodCategorySelector = ({arrOptions, handleChange}) => {
  const [options, setOptions] = useState(arrOptions);

  const handleUpdateOptions = item => {
    const updatedOptions = arrOptions.map(checkbox => {
      if (checkbox.id === item.id) {
        return {
          ...checkbox,
          checked: !checkbox.checked,
        };
      }

      return {
        ...checkbox,
        checked: false,
      };
    });

    handleChange(item.id);
    setOptions(updatedOptions);
  };

  return (
    <MainContainer>
      {options.map(item => (
        <TouchableContainer
          onPress={() => handleUpdateOptions(item)}
          key={item.id}
          isMiddle={item.id === 2}
          isChecked={item.checked}>
          <Container isChecked={item.checked}>
            <TheIcon
              name={item.icon}
              size={25}
              color="#333"
              isChecked={item.checked}
            />

            <TheLabel isChecked={item.checked}>{item.label}</TheLabel>
          </Container>
        </TouchableContainer>
      ))}
    </MainContainer>
  );
};

export default FoodCategorySelector;
