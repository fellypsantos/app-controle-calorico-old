import React, {useState, useContext, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import Colors from '../../Colors';

import DatePickerMenuBar from '../../components/DatePickerMenuBar';
import FoodRegistryListItem from '../../components/FoodRegistryListItem';
import NoFoodRegistry from '../../components/NoFoodRegistry';
import {ProfileContext} from '../../Contexts/ProfileContext';
import DataBase from '../../DataBase';

import {Container, FoodHistoryList, ListItemContainer} from './styles';

const History = () => {
  const {dateInHistoryTab} = useContext(ProfileContext);
  const [foodListHistoryTab, setFoodListHistoryTab] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    console.log('LOAD FOOD HISTORY TAB');
    setLoading(true);

    DataBase.getFoodHistory(dateInHistoryTab.format('YYYY-MM-DD'), result => {
      const dbFoodList = result.rows.raw();
      setFoodListHistoryTab(dbFoodList);
    });

    setTimeout(() => setLoading(false), 1500);
  }, [dateInHistoryTab]);

  const renderItem = ({item}) => (
    <ListItemContainer>
      <FoodRegistryListItem foodInformations={item} />
    </ListItemContainer>
  );

  return (
    <Container>
      <DatePickerMenuBar />
      {isLoading ? (
        <ActivityIndicator
          color={Colors.Purple.Idle}
          size={30}
          style={{marginTop: 25}}
        />
      ) : foodListHistoryTab.length === 0 ? (
        <NoFoodRegistry />
      ) : (
        <FoodHistoryList
          data={foodListHistoryTab}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      )}
    </Container>
  );
};

export default History;
