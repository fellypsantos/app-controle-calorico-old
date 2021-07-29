import React from 'react';
import {StatusBar} from 'react-native';

import MainContainer from './src/components/MainContainer';
import AdMobFooterContainer from './src/components/AdMobFooterContainer';
import TabNavigatorContainer from './src/components/TabNavigatorContainer';

import Colors from './src/Colors';

const App = () => {
  return (
    <MainContainer>
      <StatusBar
        backgroundColor={Colors.Purple.Idle}
        barStyle="light-content"
      />
      <TabNavigatorContainer />
      <AdMobFooterContainer />
    </MainContainer>
  );
};

export default App;
