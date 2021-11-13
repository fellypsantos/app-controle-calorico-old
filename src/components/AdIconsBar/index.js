import React, {useState, useEffect, useContext} from 'react';
import {TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import {AdMobInterstitial} from 'react-native-admob';
import {useNavigation} from '@react-navigation/native';

import {AdButtonContainer, AdButtonBlock} from './styles';

import {ProfileContext} from '../../Contexts/ProfileContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Toaster from '../../Toaster';
import AdMobUnit from '../../AdMobUnit';

const AdIconsBar = () => {
  const navigation = useNavigation();
  const {isPremiumTime, Translator} = useContext(ProfileContext);

  useEffect(() => {
    AdMobInterstitial.setAdUnitID(AdMobUnit.Interstitial.Premium);
    AdMobInterstitial.removeAllListeners();

    AdMobInterstitial.addEventListener('adClosed', () => {
      console.log('AdMobInterstitial CLOSED!');
      Toaster.ShowToast(Translator('Toast.DeveloperIsHappy'), 'LONG');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdButtonContainer>
      {!isPremiumTime && (
        <>
          <AdButtonBlock>
            <TouchableOpacity
              onPress={() => navigation.navigate('AdMobRewardIntro')}>
              <Icon name="gift" color="#fff" size={25} />
            </TouchableOpacity>
          </AdButtonBlock>

          {/* <AdButtonBlock alignToRight>
            <TouchableOpacity onPress={() => {}}>
              <Icon name="utensils" color="#fff" size={25} />
            </TouchableOpacity>
          </AdButtonBlock> */}
        </>
      )}
    </AdButtonContainer>
  );
};

export default AdIconsBar;
