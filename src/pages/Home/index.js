import React, {useEffect, useContext} from 'react';
import {Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import dayjs from 'dayjs';
import ScrollViewContainer from '../../components/ScrollViewContainer';

import {
  BottomContainer,
  ListContainer,
  ListItemTouchable,
  TopContainer,
} from './styles';

import DataBase from '../../DataBase';
import AdIconsBar from '../../components/AdIconsBar';
import Profile from '../../components/Profile';
import CaloriesCalculator from '../../components/CaloriesCalculator';
import TopBarAddFoodRegistry from '../../components/TopBarAddFoodRegistry';
import NoFoodRegistry from '../../components/NoFoodRegistry';
import AddFoodRegistry from '../../components/AddFoodRegistry';
import FoodRegistryListItem from '../../components/FoodRegistryListItem';
import Toaster from '../../Toaster';
import {ProfileContext} from '../../Contexts/ProfileContext';
import AdModRewardIntro from '../AdMobRewardIntro';

const Stack = createStackNavigator();

const MainSection = ({navigation}) => {
  const {theFoodHistory, setFoodHistory, getDeviceLocale} = useContext(
    ProfileContext,
  );
  const isEmptyFoodList = theFoodHistory.length > 0;

  const handleDeleteListItem = itemToDelete => {
    console.log('itemToDelete', itemToDelete);

    DataBase.deleteFoodRegistry(itemToDelete, result => {
      console.log('DELETE RESULT', result);
      if (result.rowsAffected > 0) {
        // UPDATE FOOD LIST
        const updatedList = theFoodHistory.filter(
          item => item.id !== itemToDelete.id,
        );
        setFoodHistory(updatedList);

        Toaster.ShowToast('Item removido com sucesso', 'SHORT');
      }
    });
  };

  const handleConfirmDeleteListItem = item => {
    Alert.alert('Cuidado', 'Quer mesmo remover esse item ?', [
      {text: 'Cancelar', onPress: () => null},
      {text: 'Sim, quero apagar', onPress: () => handleDeleteListItem(item)},
    ]);
  };

  const handleEditListitem = itemToEdit => {
    console.log('itemToEdit', itemToEdit);
    navigation.navigate('AddFoodRegistrySection', itemToEdit);
  };

  const handlePressListItem = item => {
    const theMoment = dayjs(item.datetime_moment).locale(getDeviceLocale);

    Alert.alert(
      'Detalhes do Registro',
      `Nome: ${item.name}\nCalorias: ${
        item.kcal
      } kcal\nData: ${theMoment.format('LL')}\nHora: ${theMoment.format('LT')}`,
      [
        {text: 'Excluir', onPress: () => handleConfirmDeleteListItem(item)},
        {text: 'Editar', onPress: () => handleEditListitem(item)},
        {text: 'Fechar', onPress: () => {}},
      ],
    );
  };

  return (
    <ScrollViewContainer>
      {/* PURPLE TOP AREA */}
      <TopContainer>
        <AdIconsBar />
        <Profile />
        <CaloriesCalculator />
      </TopContainer>

      {/* WHITE CONTAINER */}
      <BottomContainer>
        <TopBarAddFoodRegistry />
        <NoFoodRegistry hidden={isEmptyFoodList} />
        <ListContainer>
          {theFoodHistory.map(item => (
            <ListItemTouchable
              key={item.id}
              onPress={() => handlePressListItem(item)}>
              <FoodRegistryListItem foodInformations={item} />
            </ListItemTouchable>
          ))}
        </ListContainer>
      </BottomContainer>
    </ScrollViewContainer>
  );
};

const AddFoodRegistrySection = ({navigation}) => (
  <AddFoodRegistry handleClose={() => navigation.goBack()} />
);

const Home = () => {
  useEffect(() => {
    Toaster.ShowToast('Olá! Bom te ver por aqui.', 'SHORT');
    DataBase.getProfileData();
  }, []);

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="MainSection" component={MainSection} />
      <Stack.Screen name="AdMobRewardIntro" component={AdModRewardIntro} />
      <Stack.Screen
        name="AddFoodRegistrySection"
        component={AddFoodRegistrySection}
      />
    </Stack.Navigator>
  );
};

export default Home;
