import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../../pages/Home';
import History from '../../pages/History';
import Settings from '../../pages/Settings';

const Tab = createBottomTabNavigator();

const TabNavigatorContainer = () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default TabNavigatorContainer;
