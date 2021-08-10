import React, {useEffect, useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
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

const Stack = createStackNavigator();

const MainSection = ({navigation}) => {
  const {theFoodHistory} = useContext(ProfileContext);
  const isEmptyFoodList = theFoodHistory.length > 0;

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
        <TopBarAddFoodRegistry navigation={navigation} />
        <NoFoodRegistry hidden={isEmptyFoodList} />
        <ListContainer>
          {theFoodHistory.map(item => (
            <ListItemTouchable key={item.id} onPress={() => null}>
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
    DataBase.getProfileData(result => console.log('getProfileData', result));
  }, []);

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="MainSection" component={MainSection} />
      <Stack.Screen
        name="AddFoodRegistrySection"
        component={AddFoodRegistrySection}
      />
    </Stack.Navigator>
  );
};

export default Home;
