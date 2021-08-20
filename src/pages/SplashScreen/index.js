import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {CommonActions} from '@react-navigation/native';

import {
  Container,
  AppTitle,
  AppDescription,
  AppLogo,
  AppStart,
  AppStartText,
} from './styles';

import DataBase from '../../DataBase';
import AppLogoSource from '../../../assets/images/eating.png';

const SplashScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isHermes = () => !!global.HermesInternal;
    console.log('Hermes active?', isHermes);

    setTimeout(() => {
      DataBase.getProfileData(result => {
        if (result.rows.length > 0) {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                {
                  name: 'EntryPoint',
                },
              ],
            }),
          );
        } else setLoading(false);
      });
    }, 1800);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
