import React from 'react';

import DatePickerMenuBar from '../../components/DatePickerMenuBar';
import FoodRegistryListItem from '../../components/FoodRegistryListItem';

import {Container, FoodHistoryList, ListItemContainer} from './styles';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Abacate',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Abacaxi',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Canela',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aee5-3ad53abb28ba',
    title: 'Danone',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd9daa97f63',
    title: 'Esfirra',
  },
  {
    id: '5869va0f-3da1-471f-bd96-145571e29d72',
    title: 'Feijão',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ass53abb28ba',
    title: 'Galinha',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91ca97f63',
    title: 'Jujuba',
  },
  {
    id: '58694a0f-5da1-471f-bd96-145571e29d72',
    title: 'Linhaça',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aee5-3ad53abb28bn',
    title: 'Linxia',
  },
  {
    id: '3acç8afc-c605-48d3-a4f8-fbd9daa97f63',
    title: 'Manga',
  },
  {
    id: '5869va0f-3da1-471f-bd96-145571e69d72',
    title: 'Maçã',
  },
];

const History = () => {
  const renderItem = ({item}) => (
    <ListItemContainer>
      <FoodRegistryListItem foodName={item.title} />
    </ListItemContainer>
  );

  return (
    <Container>
      <DatePickerMenuBar />
      <FoodHistoryList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </Container>
  );
};

export default History;
