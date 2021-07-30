import React, {useState} from 'react';

import {
  TouchableContainer,
  Container,
  TheLabel,
  MainContainer,
  TheIcon,
} from './styles';

const FoodCategorySelector = () => {
  const [options, setOptions] = useState([
    {id: 1, label: 'Leve', icon: 'smile', checked: false},
    {id: 2, label: 'Moderada', icon: 'exclamation-triangle', checked: true},
    {id: 3, label: 'Pesada', icon: 'sad-tear', checked: false},
  ]);

  const handleUpdateOptions = item => {
    const updatedOptions = options.map(checkbox => {
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
