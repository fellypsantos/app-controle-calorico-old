import React, { useEffect, useContext } from 'react';
import { Alert, Linking } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
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
import { ProfileContext } from '../../Contexts/ProfileContext';
import AdModRewardIntro from '../AdMobRewardIntro';
import BlockOption from '../../components/BlockOption';

const Stack = createStackNavigator();

const MainSection = ({ navigation }) => {
  const {
    theFoodHistory,
    setFoodHistory,
    getDeviceLocale,
    Translator,
  } = useContext(ProfileContext);

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

        Toaster.ShowToast(Translator('Toast.ItemRemoved'), 'SHORT');
      }
    });
  };

  const handleConfirmDeleteListItem = item => {
    Alert.alert(
      Translator('Alert.Caution'),
      Translator('Alert.Message.ConfirmRemoveItem'),
      [
        { text: Translator('Modal.Button.Cancel'), onPress: () => null },
        {
          text: Translator('Modal.Button.YesWantDelete'),
          onPress: () => handleDeleteListItem(item),
        },
      ],
    );
  };

  const handleEditListitem = itemToEdit => {
    console.log('itemToEdit', itemToEdit);
    navigation.navigate('AddFoodRegistrySection', itemToEdit);
  };

  const handlePressListItem = item => {
    const theMoment = dayjs(item.datetime_moment).locale(getDeviceLocale);

    Alert.alert(
      Translator('Modal.Title.RegistryDetails'),
      `${Translator('Modal.Label.Name')}: ${item.name}
${Translator('Modal.Label.Calories')}: ${item.kcal} kcal
${Translator('Modal.Label.Date')}: ${theMoment.format('LL')}
${Translator('Modal.Label.Hour')}: ${theMoment.format('LT')}`,
      [
        {
          text: Translator('Modal.Button.Delete'),
          onPress: () => handleConfirmDeleteListItem(item),
        },
        {
          text: Translator('Modal.Button.Edit'),
          onPress: () => handleEditListitem(item),
        },
        { text: Translator('Modal.Button.Close'), onPress: () => { } },
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

      {/* BLOCK */}
      <BlockOption
        handleOnPress={() => {
          Linking.openURL(
            'https://play.google.com/store/apps/dev?id=4983605265674024761',
          );
        }}
      />
    </ScrollViewContainer>
  );
};

const AddFoodRegistrySection = ({ navigation }) => (
  <AddFoodRegistry handleClose={() => navigation.goBack()} />
);

const Home = () => {
  const { Translator } = useContext(ProfileContext);

  useEffect(() => {
    Toaster.ShowToast(Translator('Toast.Welcome'), 'SHORT');
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
