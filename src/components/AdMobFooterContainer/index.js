import React from 'react';
import {AdMobBanner} from 'react-native-admob';

const AdMobFooterContainer = () => (
  <AdMobBanner
    adSize="fullBanner"
    adUnitID="ca-app-pub-3940256099942544/6300978111"
    testDevices={[AdMobBanner.simulatorId]}
    onAdFailedToLoad={error => console.error(error)}
  />
);

export default AdMobFooterContainer;
