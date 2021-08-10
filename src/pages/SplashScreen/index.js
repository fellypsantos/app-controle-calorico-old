import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';

import {
  Container,
  AppTitle,
  AppDescription,
  AppLogo,
  AppStart,
  AppStartText,
} from './styles';
import AppLogoSource from '../../../assets/images/eating.png';

import {ProfileContext} from '../../Contexts/ProfileContext';

const SplashScreen = ({navigation}) => {
  const {theProfile} = useContext(ProfileContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (theProfile.id !== undefined) {
      setTimeout(() => {
        // OPEN HOME
        navigation.navigate('EntryPoint');
      }, 1000);
    } else {
      setTimeout(() => {
        // STAY HERE TO REGISTER
        setLoading(false);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theProfile]);

  return (
    <Container>
      {loading ? (
        <ActivityIndicator color="#FFF" size={25} />
      ) : (
        <>
          <AppTitle>Controle de Calorias</AppTitle>
          <AppLogo source={AppLogoSource} />
          <AppDescription>
            Você tem nas mãos um controle simples e prático da sua alimentação.
          </AppDescription>

          <AppStart onPress={() => navigation.navigate('SplashSettings')}>
            <AppStartText>Começar Agora</AppStartText>
          </AppStart>
        </>
      )}
    </Container>
  );
};

export default SplashScreen;
