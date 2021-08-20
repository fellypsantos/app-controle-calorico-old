import React, {useContext} from 'react';
import {AdMobBanner} from 'react-native-admob';
import {ProfileContext} from '../../Contexts/ProfileContext';

const adUnitId = {
  DEBUG: 'ca-app-pub-3940256099942544/6300978111',
  RELEASE: 'ca-app-pub-3444194669126701/2896287464',
};

const AdMobFooterContainer = () => {
  const {isPremiumTime} = useContext(ProfileContext);

  return (
    <>
      {!isPremiumTime && (
        <AdMobBanner
          adSize="fullBanner"
          adUnitID={__DEV__ ? adUnitId.DEBUG : adUnitId.RELEASE}
          onAdFailedToLoad={error =>
            console.log('AdMobBanner: Failed to load! ' + error)
          }
        />
      )}
    </>
  );
};

export default AdMobFooterContainer;
