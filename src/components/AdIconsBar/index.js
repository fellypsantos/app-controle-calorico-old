import React, {useState, useEffect, useContext} from 'react';
import {TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import {AdMobInterstitial} from 'react-native-admob';
import {useNavigation} from '@react-navigation/native';

import {AdButtonContainer, AdButtonBlock} from './styles';

import {ProfileContext} from '../../Contexts/ProfileContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Toaster from '../../Toaster';
import Colors from '../../Colors';
import AdMobUnit from '../../AdMobUnit';

const AdIconsBar = () => {
  const navigation = useNavigation();
  const {isPremiumTime, Translator} = useContext(ProfileContext);
  const [isLoadingAd, setLoadingAd] = useState(false);

  useEffect(() => {
    AdMobInterstitial.setAdUnitID(AdMobUnit.Interstitial.Premium);
    AdMobInterstitial.removeAllListeners();

    AdMobInterstitial.addEventListener('adClosed', () => {
      console.log('AdMobInterstitial CLOSED!');
      Toaster.ShowToast(Translator('Toast.DeveloperIsHappy'), 'LONG');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInterstitialError = error => {
    console.warn('handleInterstitialError', error);
    Alert.alert('Ops!', Translator('Alert.Message.FailedToLoadAd'));
  };

  const handleShowAd = () => {
    console.log('Requesting some ad to show...');
    setLoadingAd(true);

    AdMobInterstitial.requestAd()
      .then(() => AdMobInterstitial.showAd())
      .catch(handleInterstitialError)
      .finally(() => setLoadingAd(false));
  };

  return (
    <AdButtonContainer>
      {!isPremiumTime && (
        <>
          <AdButtonBlock>
            {isLoadingAd ? (
              <ActivityIndicator color={Colors.Purple.Light} size={25} />
            ) : (
              <TouchableOpacity onPress={handleShowAd}>
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
        </>
      )}
    </AdButtonContainer>
  );
};

export default AdIconsBar;
