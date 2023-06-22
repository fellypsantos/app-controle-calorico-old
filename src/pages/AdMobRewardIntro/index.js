import React, { useState, useEffect, useContext, useRef } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { useRewardedAd } from '@react-native-admob/admob';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import ConfettiCannon from 'react-native-confetti-cannon';

import DataBase from '../../DataBase';
import { ProfileContext } from '../../Contexts/ProfileContext';

import {
  Container,
  Title,
  Subtitle,
  ButtonsContainer,
  ActionButton,
  ActionButtonText,
} from './styles';
import Colors from '../../Colors';
import AdMobUnit from '../../AdMobUnit';

const AdModRewardIntro = () => {
  const navigation = useNavigation();
  const [userRewarded, setUserRewarded] = useState(false);
  const [isLoadingAd, setLoadingAd] = useState(true);
  const confettiCannon = useRef();

  const { setIsPremiumTime, Translator } = useContext(ProfileContext);

  const { adLoaded, adDismissed, show, reward } = useRewardedAd(
    AdMobUnit.Rewarded.Premium
  );

  useEffect(() => {

    if (adLoaded) {
      setLoadingAd(false);
      console.log('nice, ad was loaded');
    }

  }, [adLoaded]);

  useEffect(() => {

    console.log('adDismissed with this reward value: ', reward);

    if (adDismissed && reward !== undefined) {
      if (__DEV__) console.log('COOOL! Ads were disabled for 8 hours!');

      setUserRewarded(true);

      // Update Database
      DataBase.setLastSeenRewardAd(dayjs().format(), lastTimeStamp => {
        console.log('DataBase.setLastSeenRewardAd', lastTimeStamp);

        // Update app to hide all ads
        setIsPremiumTime(true);
        confettiCannon.current.start();

        // Show Alert and close window
        Alert.alert(
          Translator('Alert.Congratulations'),
          Translator('Alert.Message.EnjoyPremiumTime'),
          [{ text: 'OK', onPress: () => navigation.goBack() }],
        );
      });
    }
  }, [adDismissed]);

  const handleAdMobRewardedError = error => {
    console.log('AdMobRewarded request error!', error);
    Alert.alert('Ops!', Translator('Alert.Message.FailedToLoadAd'));
  };

  const handleShowRewardAd = () => {
    if (!adLoaded) {
      console.log('ad not loaded yet');
      return;
    }

    if (adLoaded) show();

  };

  return (
    <Container>
      <ConfettiCannon
        ref={confettiCannon}
        count={50}
        autoStart={false}
        origin={{ x: -15, y: 0 }}
      />
      <Title>{Translator('AdMob.Title.DisableAds')}</Title>
      <Subtitle>{Translator('AdMob.Paragraph1')}</Subtitle>
      <Subtitle>{Translator('AdMob.Paragraph2')} ♥</Subtitle>

      <ButtonsContainer>
        <ActionButton showAsCancel onPress={() => navigation.goBack()}>
          <ActionButtonText showAsCancel>
            {Translator('Buttons.Back')}
          </ActionButtonText>
        </ActionButton>
        {isLoadingAd ? (
          <ActivityIndicator
            color={Colors.Purple.Idle}
            size={25}
            style={{ paddingLeft: 30 }}
          />
        ) : (
          <ActionButton onPress={handleShowRewardAd}>
            <ActionButtonText>
              {Translator('Buttons.WatchNow')}
            </ActionButtonText>
          </ActionButton>
        )}
      </ButtonsContainer>
    </Container>
  );
};

export default AdModRewardIntro;
