import React from 'react';
import ScrollViewContainer from '../../components/ScrollViewContainer';

import {TopContainer} from './styles';

import AdIconsBar from '../../components/AdIconsBar';
import Profile from '../../components/Profile';
import CaloriesCalculator from '../../components/CaloriesCalculator';

const Home = () => (
  <ScrollViewContainer>
    {/* PURPLE TOP AREA */}
    <TopContainer>
      <AdIconsBar />
      <Profile />
      <CaloriesCalculator />
    </TopContainer>
  </ScrollViewContainer>
);

export default Home;
