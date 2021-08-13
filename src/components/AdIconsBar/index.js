import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {AdMobInterstitial} from 'react-native-admob';
import {useNavigation} from '@react-navigation/native';

import {AdButtonContainer, AdButtonBlock} from './styles';

import DataBase from '../../DataBase';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Toaster from '../../Toaster';

const AdIconsBar = () => {
  const [hideAds, setHideAds] = useState(false);
  const [showAdMobButton, setShowAdMobButton] = useState(false);
  const [adWasLoaded, setAdLoaded] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // AdMobInterstitial.setAdUnitID('ca-app-pub-3444194669126701/6444212865');

    DataBase.getLastSeenRewardAd(result => {
      if (result.rows.length > 0) {
        console.log('VERIFICAR O TIMESTAMP E CHEGAR SE TEM MAIS DE 6HORAS...');
      }
    });

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <TouchableOpacity
          onPress={() => navigation.navigate('AdMobRewardIntro')}>
          <Icon name="gift" color="#fff" size={25} />
        </TouchableOpacity>
      </AdButtonBlock>
    </AdButtonContainer>
  );
};

export default AdIconsBar;
