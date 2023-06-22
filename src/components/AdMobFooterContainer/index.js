import React, { useContext } from 'react';
import { BannerAd, BannerAdSize } from '@react-native-admob/admob';
import AdMobUnit from '../../AdMobUnit';
import { ProfileContext } from '../../Contexts/ProfileContext';

const AdMobFooterContainer = () => {
  const { isPremiumTime } = useContext(ProfileContext);

  if (__DEV__) console.log('isPremiumTime', isPremiumTime);

  return (
    <>
      {!isPremiumTime && (
        <BannerAd
          unitId={AdMobUnit.Banner.Footer}
          size={BannerAdSize.ADAPTIVE_BANNER}
          onAdLoaded={() => {
            if (__DEV__) console.log('AdBanner banner was loaded at ' + new Date().toLocaleString());
          }}
          onAdFailedToLoad={() => {
            if (__DEV__) console.log('Failed to load AdBanner banner at ' + new Date().toLocaleString());
          }}
        />
      )}
    </>
  );
};

export default AdMobFooterContainer;
