import React from 'react';

import MainContainer from './src/components/MainContainer';
import AdMobFooterContainer from './src/components/AdMobFooterContainer';
import TabNavigatorContainer from './src/components/TabNavigatorContainer';

const App = () => {
  return (
    <MainContainer>
      <TabNavigatorContainer />
      <AdMobFooterContainer />
    </MainContainer>
  );
};

export default App;
