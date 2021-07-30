import React from 'react';
import {Text, Modal} from 'react-native';
import ScrollViewContainer from '../../components/ScrollViewContainer';

import {BottomContainer, TopContainer} from './styles';

import AdIconsBar from '../../components/AdIconsBar';
import Profile from '../../components/Profile';
import CaloriesCalculator from '../../components/CaloriesCalculator';
import TopBarAddFoodRegistry from '../../components/TopBarAddFoodRegistry';
import NoFoodRegistry from '../../components/NoFoodRegistry';
import FoodRegistryList from '../../components/FoodRegistryList';

const Home = () => (
  <>
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
        <NoFoodRegistry hidden />
        <FoodRegistryList />
      </BottomContainer>
    </ScrollViewContainer>
  </>
);

export default Home;
