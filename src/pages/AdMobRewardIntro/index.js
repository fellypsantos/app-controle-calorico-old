import React, {useState, useEffect} from 'react';
import {AdMobRewarded} from 'react-native-admob';
import {useNavigation} from '@react-navigation/native';

import {
  Container,
  Title,
  Subtitle,
  ButtonsContainer,
  ActionButton,
  ActionButtonText,
} from './styles';

const AdModRewardIntro = () => {
  const navigation = useNavigation();
  const [adIsLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // Display a rewarded ad
    AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917');
    if (!adIsLoaded) AdMobRewarded.requestAd();

    // GIVE REWARD TO USER
    AdMobRewarded.addEventListener('rewarded', reward => {
      console.log('rewarded!', reward);
    });

    // USER CANCELED VIDEO
    AdMobRewarded.addEventListener('adClosed', result => {
      console.log('NÃO ASSISTIU');
    });
  }, []);

  return (
    <Container>
      <Title>Desativar Propagandas</Title>
      <Subtitle>
        Estou trabalhando duro para te oferecer um aplicativo de qualidade,
        simples e útil, você pode apoiar esse trabalho assistindo um vídeo até o
        final.
      </Subtitle>
      <Subtitle>
        Em troca você recebe 6 horas de acesso sem propagandas no app, ficarei
        muito grato se puder me dar essa força ♥
      </Subtitle>

      <ButtonsContainer>
        <ActionButton showAsCancel onPress={() => navigation.goBack()}>
          <ActionButtonText showAsCancel>Cancelar</ActionButtonText>
        </ActionButton>
        <ActionButton>
          <ActionButtonText>Assistir Agora</ActionButtonText>
        </ActionButton>
      </ButtonsContainer>
    </Container>
  );
};

export default AdModRewardIntro;
