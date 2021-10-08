import React, {useEffect, useState, useContext} from 'react';
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
import {ProfileContext} from '../../Contexts/ProfileContext';

const SplashScreen = ({navigation}) => {
  const {Translator} = useContext(ProfileContext);
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
          <AppTitle>{Translator('App.Name')}</AppTitle>
          <AppLogo source={AppLogoSource} />
          <AppDescription>{Translator('App.Description')}</AppDescription>

          <AppStart onPress={() => navigation.navigate('SplashSettings')}>
            <AppStartText>{Translator('Buttons.StartNow')}</AppStartText>
          </AppStart>
        </>
      )}
    </Container>
  );
};

export default SplashScreen;
