import React, {useState, useContext, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import Colors from '../../Colors';

import DatePickerMenuBar from '../../components/DatePickerMenuBar';
import FoodRegistryListItem from '../../components/FoodRegistryListItem';
import NoFoodRegistry from '../../components/NoFoodRegistry';
import {ProfileContext} from '../../Contexts/ProfileContext';
import DataBase from '../../DataBase';

import {
  Container,
  FoodHistoryList,
  ListItemContainer,
  KcalSumContainer,
  KcalSumText,
} from './styles';

const History = () => {
  const {dateInHistoryTab, theFoodHistory, Translator} = useContext(
    ProfileContext,
  );
  const [foodListHistoryTab, setFoodListHistoryTab] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [kcalTotalValue, setKcalTotalValue] = useState(0);

  useEffect(() => {
    console.log('LOAD FOOD HISTORY TAB');
    setLoading(true);

    let tempKcalTotal = 0;
    DataBase.getFoodHistory(dateInHistoryTab.format('YYYY-MM-DD'), result => {
      const dbFoodList = result.rows.raw();
      setFoodListHistoryTab(dbFoodList);

      dbFoodList.map(item => {
        tempKcalTotal += item.kcal;
        return item;
      });

      setKcalTotalValue(tempKcalTotal);
    });

    setTimeout(() => setLoading(false), 1500);
  }, [dateInHistoryTab, theFoodHistory]);

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
          // eslint-disable-next-line react-native/no-inline-styles
          style={{marginTop: 25}}
        />
      ) : foodListHistoryTab.length === 0 ? (
        <NoFoodRegistry />
      ) : (
        <>
          <FoodHistoryList
            data={foodListHistoryTab}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
          <KcalSumContainer>
            <KcalSumText>
              {Translator('TotalCaloriesInList')} {kcalTotalValue} Kcal
            </KcalSumText>
          </KcalSumContainer>
        </>
      )}
    </Container>
  );
};

export default History;
