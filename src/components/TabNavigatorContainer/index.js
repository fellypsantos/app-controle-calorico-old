import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../../pages/Home';
import History from '../../pages/History';
import Settings from '../../pages/Settings';
import Colors from '../../Colors';

import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

const TabNavigatorContainer = () => {
  const tabBarOptions = {
    activeTintColor: Colors.Purple.Idle,
    activeBackgroundColor: '#fff',
    inactiveBackgroundColor: '#f5f5f5',
    labelPosition: 'beside-icon',
    inactiveTintColor: 'gray',
  };

  const screenOptions = ({route}) => ({
    tabBarIcon: ({focused, color, size}) => {
      let iconName;

      if (route.name === 'Home') {
        iconName = 'home';
      } else if (route.name === 'History') {
        iconName = 'history';
      } else if (route.name === 'Settings') {
        iconName = 'cog';
      }

      // You can return any component that you like here!
      return <Icon name={iconName} size={15} color={color} />;
    },
  });

  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBarOptions={tabBarOptions}
      initialRouteName={'Home'}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{tabBarLabel: 'Inicio'}}
      />

      <Tab.Screen
        name="History"
        component={History}
        options={{tabBarLabel: 'Histórico'}}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{tabBarLabel: 'Configurações'}}
        initialParams={{isFirstRun: false}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigatorContainer;
