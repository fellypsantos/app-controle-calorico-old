import React from 'react';
import {View, Text} from 'react-native';
import {AdMobBanner} from 'react-native-admob';

const App = () => {
  console.log('loaded');

  return (
    <View>
      <Text>Hello WOrld</Text>
      <AdMobBanner
        adSize="fullBanner"
        adUnitID="ca-app-pub-3940256099942544/6300978111"
        testDevices={[AdMobBanner.simulatorId]}
        onAdFailedToLoad={error => console.error(error)}
      />
    </View>
  );
};

export default App;
