import React, {useContext} from 'react';
import {AdMobBanner} from 'react-native-admob';
import AdMobUnit from '../../AdMobUnit';
import {ProfileContext} from '../../Contexts/ProfileContext';

const AdMobFooterContainer = () => {
  const {isPremiumTime} = useContext(ProfileContext);

  return (
    <>
      {!isPremiumTime && (
        <AdMobBanner
          adSize="fullBanner"
          adUnitID={AdMobUnit.Banner.Footer}
          onAdFailedToLoad={error =>
            console.log('AdMobBanner: Failed to load! ' + error)
          }
        />
      )}
    </>
  );
};

export default AdMobFooterContainer;
