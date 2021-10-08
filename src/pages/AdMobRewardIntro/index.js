import React, {useState, useEffect, useContext, useRef} from 'react';
import {Alert, ActivityIndicator} from 'react-native';
import {AdMobRewarded} from 'react-native-admob';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import ConfettiCannon from 'react-native-confetti-cannon';

import DataBase from '../../DataBase';
import {ProfileContext} from '../../Contexts/ProfileContext';

import {
  Container,
  Title,
  Subtitle,
  ButtonsContainer,
  ActionButton,
  ActionButtonText,
} from './styles';
import Colors from '../../Colors';

const adUnitId = {
  DEBUG: 'ca-app-pub-3940256099942544/5224354917',
  RELEASE: 'ca-app-pub-3444194669126701/9826012534',
};

const AdModRewardIntro = () => {
  const navigation = useNavigation();
  const [userRewarded, setUserRewarded] = useState(false);
  const [isLoadingAd, setLoadingAd] = useState(false);
  const confettiCannon = useRef();

  const {setIsPremiumTime, Translator} = useContext(ProfileContext);

  useEffect(() => {
    // Display a rewarded ad
    AdMobRewarded.setAdUnitID(__DEV__ ? adUnitId.DEBUG : adUnitId.RELEASE);
    AdMobRewarded.removeAllListeners();

    // INFORM THE STATE THE REWARD WAS RECEIVED
    AdMobRewarded.addEventListener('rewarded', reward => {
      console.log('AdMobRewarded -> REWARDED!');
      setUserRewarded(true);
    });

    // WHEN VIDEO IS CLOSED, CHECK IF WAS REWARDED
    AdMobRewarded.addEventListener('adClosed', result => {
      if (userRewarded) {
        console.log('COOOL! Ads were disabled for 4 hours!');

        // Update Database
        DataBase.setLastSeenRewardAd(dayjs().format(), lastTimeStamp => {
          console.log('DataBase.setLastSeenRewardAd', lastTimeStamp);

          // Update app to hide all ads
          setIsPremiumTime(true);
          confettiCannon.current.start();

          // Show Alert and close window
          Alert.alert(
            'Parabéns!',
            'Aproveite o app sem propagandas por 4 horas.',
            [{text: 'OK', onPress: () => navigation.goBack()}],
          );
        });
      } else {
        console.log('AdMobRewarded video was closed before ends :(');
        Alert.alert(
          'Poxa...',
          'A recompensa não foi recebida, tente novamente.',
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRewarded]);

  const handleAdMobRewardedError = error => {
    console.log('AdMobRewarded request error!', error);
    Alert.alert('Ops!', 'Alert.Message.FailedToLoadAd');
  };

  const handleShowRewardAd = () => {
    console.log('AdMobRewarded is requesting a video...');
    setLoadingAd(true);

    AdMobRewarded.requestAd()
      .then(() => AdMobRewarded.showAd())
      .catch(handleAdMobRewardedError)
      .finally(() => setLoadingAd(false));
  };

  return (
    <Container>
      <ConfettiCannon
        ref={confettiCannon}
        count={50}
        autoStart={false}
        origin={{x: -15, y: 0}}
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
            style={{paddingLeft: 30}}
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
