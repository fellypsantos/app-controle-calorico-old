import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import './src/i18n';
import DataBase from './src/DataBase';
import ProfileProvider from './src/Contexts/ProfileContext';
import MainContainer from './src/components/MainContainer';

import Colors from './src/Colors';
import SplashScreen from './src/pages/SplashScreen';
import Settings from './src/pages/Settings';
import EntryPoint from './src/components/EntryPoint';

DataBase.open();
const Stack = createStackNavigator();

const App = () => (
  <MainContainer>
    <StatusBar backgroundColor={Colors.Purple.Idle} barStyle="light-content" />
    <ProfileProvider>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="EntryPoint" component={EntryPoint} />
          <Stack.Screen
            name="SplashSettings"
            component={Settings}
            initialParams={{isFirstRun: true}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ProfileProvider>
  </MainContainer>
);

export default App;
