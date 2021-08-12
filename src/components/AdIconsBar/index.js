import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {AdMobInterstitial, AdMobRewarded} from 'react-native-admob';

import {AdButtonContainer, AdButtonBlock} from './styles';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Toaster from '../../Toaster';

const AdIconsBar = () => {
  const [showAdMobButton, setShowAdMobButton] = useState(false);
  const [adWasLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // AdMobInterstitial.setAdUnitID('ca-app-pub-3444194669126701/6444212865');

    AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712');
    if (!adWasLoaded) AdMobInterstitial.requestAd();

    AdMobInterstitial.addEventListener('adLoaded', () => {
      console.log('AdMobInterstitial LOADED!');
      setShowAdMobButton(true);
      setAdLoaded(true);
    });

    AdMobInterstitial.addEventListener('adClosed', () => {
      console.log('AdMobInterstitial CLOSED!');
      setShowAdMobButton(false);
      Toaster.ShowToast(
        'O desenvolvedor agradece demais a sua generosidade <3',
        'LONG',
      );

      setTimeout(() => AdMobInterstitial.requestAd(), 5000);
    });
  }, []);

  return (
    <AdButtonContainer>
      <AdButtonBlock>
        {showAdMobButton && (
          <TouchableOpacity onPress={() => AdMobInterstitial.showAd()}>
            <Icon name="ad" color="#fff" size={25} />
          </TouchableOpacity>
        )}
      </AdButtonBlock>

      <AdButtonBlock alignToRight>
        <TouchableOpacity>
          <Icon name="gift" color="#fff" size={25} />
        </TouchableOpacity>
      </AdButtonBlock>
    </AdButtonContainer>
  );
};

export default AdIconsBar;
