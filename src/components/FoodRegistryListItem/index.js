import React from 'react';
import {NativeModules} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import dayjs from 'dayjs';
import Colors from '../../Colors';

dayjs.extend(require('dayjs/plugin/localizedFormat'));

import {
  Container,
  FoodInfo,
  FoodName,
  IconContainer,
  IconImage,
  RegistryDataContainer,
} from './styles';
import DeviceLocaleHandler from '../../DeviceLocaleHandler';

const TimeIcons = {
  sunrise: require('../../../assets/images/sunrise.png'),
  sun: require('../../../assets/images/sun.png'),
  moon: require('../../../assets/images/moon.png'),
};

const FoodRegistryListItem = ({foodInformations}) => {
  const {name, kcal, category_level, datetime_moment} = foodInformations;

  const parseCategoryLevelToText = () => {
    if (category_level === 1) return 'Alimentação Leve';
    if (category_level === 2) return 'Alimentação Moderada';
    if (category_level === 3) return 'Alimentação Pesada';
  };

  const parseCategoryLevelToIcon = () => {
    if (category_level === 1) return 'smile';
    if (category_level === 2) return 'exclamation-triangle';
    if (category_level === 3) return 'sad-tear';
  };

  const parseTimestampToIcon = () => {
    const theTime = dayjs(datetime_moment).format('HH');
    if (theTime >= 0 && theTime < 6) return 'moon';
    if (theTime >= 6 && theTime < 12) return 'sunrise';
    if (theTime >= 12 && theTime < 18) return 'sun';
    if (theTime >= 18 && theTime <= 23) return 'moon';
  };

  const deviceLocale = DeviceLocaleHandler.getSupported();
  const categoryIcon = parseCategoryLevelToIcon();
  const momentOfDayIcon = parseTimestampToIcon();

  return (
    <Container>
      <IconContainer>
        <IconImage source={TimeIcons[momentOfDayIcon]} />
      </IconContainer>

      <RegistryDataContainer>
        <FoodName>{name}</FoodName>
        <FoodInfo>
          {dayjs(datetime_moment).locale(deviceLocale).format('LT')} |
          {' ' + parseCategoryLevelToText()}
        </FoodInfo>
        <FoodInfo>{kcal} kcal</FoodInfo>
      </RegistryDataContainer>

      {/* smile | exclamation-triangle | sad-tear */}
      <Icon name={categoryIcon} size={20} color={Colors.Purple.Idle} />
    </Container>
  );
};

export default FoodRegistryListItem;
