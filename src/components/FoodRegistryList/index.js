import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../Colors';

import {
  Container,
  FoodInfo,
  FoodName,
  IconContainer,
  IconImage,
  RegistryDataContainer,
} from './styles';

const TimeIcons = {
  sunrise: require('../../../assets/images/sunrise.png'),
  sun: require('../../../assets/images/sun.png'),
  moon: require('../../../assets/images/moon.png'),
};

const tempFlatListData = [
  {id: 1, food: 'Pizza'},
  {id: 2, food: 'Strogonoff'},
  {id: 3, food: 'Porco Assado'},
  {id: 4, food: 'Pizza'},
  {id: 5, food: 'Strogonoff'},
  {id: 6, food: 'Porco Assado'},
  {id: 7, food: 'Pizza'},
  {id: 8, food: 'Strogonoff'},
  {id: 9, food: 'Porco Assado'},
  {id: 10, food: 'Pizza'},
  {id: 11, food: 'Strogonoff'},
  {id: 12, food: 'Porco Assado'},
];

const FoodRegistryList = () => {
  return tempFlatListData.map(item => (
    <TouchableOpacity key={item.id}>
      <Container>
        <IconContainer>
          <IconImage source={TimeIcons.sun} />
        </IconContainer>

        <RegistryDataContainer>
          <FoodName>{item.food}</FoodName>
          <FoodInfo>Alimentação Pesada | 12h02</FoodInfo>
          <FoodInfo>540 kcal</FoodInfo>
        </RegistryDataContainer>

        {/* smile | exclamation-triangle | sad-tear */}
        <Icon name="smile" size={20} color={Colors.Purple.Idle} />
      </Container>
    </TouchableOpacity>
  ));
};

export default FoodRegistryList;
