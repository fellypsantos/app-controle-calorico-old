import React, {useState, useEffect, useContext, useRef} from 'react';
import {Alert, ActivityIndicator} from 'react-native';
import {
  Container,
  BlockTitle,
  RightContentBox,
  BlockDescription,
} from './styles';
import {AdMobRewarded} from 'react-native-admob';
import ConfettiCannon from 'react-native-confetti-cannon';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../Colors';
import {ProfileContext} from '../../Contexts/ProfileContext';
import AdMobUnit from '../../AdMobUnit';

const BlockOption = () => {
  const {Translator} = useContext(ProfileContext);
  const confettiCannon = useRef();
  const [userRewarded, setUserRewarded] = useState(false);
  const [isLoadingAd, setLoadingAd] = useState(false);

  useEffect(() => {
    // Display a rewarded ad
    AdMobRewarded.setAdUnitID(AdMobUnit.Rewarded.ProjectSponsor);
    AdMobRewarded.removeAllListeners();

    // INFORM THE STATE THE REWARD WAS RECEIVED
    AdMobRewarded.addEventListener('rewarded', reward => {
      console.log('AdMobRewarded DONATION -> REWARDED!');
      setUserRewarded(true);
    });

    // WHEN VIDEO IS CLOSED, CHECK IF WAS REWARDED
    AdMobRewarded.addEventListener('adClosed', result => {
      if (userRewarded) {
        confettiCannon.current.start();

        // Show Alert and close window
        Alert.alert(
          Translator('Alert.Thanks'),
          Translator('Alert.Message.ThanksForSupport'),
        );
      } else {
        console.log('AdMobRewarded video was closed before ends :(');
        Alert.alert(
          Translator('Alert.WhatAPity'),
          Translator('Alert.Message.VideoStopedBeforeEnds'),
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRewarded]);

  const handleAdMobRewardedError = error => {
    console.log('AdMobRewarded request error!', error);
    Alert.alert('Ops!', Translator('Alert.Message.FailedToLoadAd'));
  };

  const handleShowRewardAd = () => {
    if (isLoadingAd) return;
    console.log('AdMobRewarded is requesting a video...');
    setLoadingAd(true);

    AdMobRewarded.requestAd()
      .then(() => AdMobRewarded.showAd())
      .catch(handleAdMobRewardedError)
      .finally(() => setLoadingAd(false));
  };

  return (
    <Container onPress={handleShowRewardAd}>
      <ConfettiCannon
        ref={confettiCannon}
        count={60}
        autoStart={false}
        origin={{x: -25, y: 0}}
        fadeOut={true}
      />

      {!isLoadingAd ? (
        <Icon name="hand-holding-usd" size={20} color={Colors.Grey.Default} />
      ) : (
        <ActivityIndicator color={Colors.Grey.Default} size={25} />
      )}
      <RightContentBox>
        <BlockTitle>{Translator('BlockOption.Support.Title')}</BlockTitle>
        <BlockDescription>
          {Translator('BlockOption.Support.Description')}
        </BlockDescription>
      </RightContentBox>
    </Container>
  );
};

export default BlockOption;
