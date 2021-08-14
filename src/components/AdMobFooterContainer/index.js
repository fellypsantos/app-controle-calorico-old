import React, {useContext} from 'react';
import {AdMobBanner} from 'react-native-admob';

import {ProfileContext} from '../../Contexts/ProfileContext';

const AdMobFooterContainer = () => {
  const {isPremiumTime} = useContext(ProfileContext);

  return (
    <>
      {!isPremiumTime && (
        <AdMobBanner
          adSize="fullBanner"
          adUnitID="ca-app-pub-3940256099942544/6300978111"
          onAdFailedToLoad={error => console.error(error)}
        />
      )}
    </>
  );
};

export default AdMobFooterContainer;
