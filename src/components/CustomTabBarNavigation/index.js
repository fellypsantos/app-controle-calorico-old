import React from 'react';
import { View } from 'react-native';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import AdMobFooterContainer from '../AdMobFooterContainer';

const CustomTabBarNavigation = props => {
  return (
    <View>
      <AdMobFooterContainer />
      <BottomTabBar {...props} />
    </View>
  );
};

export default CustomTabBarNavigation;
