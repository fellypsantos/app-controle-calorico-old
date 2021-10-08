import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';

import {ButtonAddFoodRegistry, Container, PhraseRegistryCount} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {ProfileContext} from '../../Contexts/ProfileContext';
import Colors from '../../Colors';

const TopBarAddFoodRegistry = () => {
  const {theFoodHistory, Translator} = useContext(ProfileContext);
  const navigation = useNavigation();
  const foodHistoryLength = theFoodHistory.length;

  // CountTotalMealsRegistered

  const registryCounterString = Translator('CountTotalMealsRegistered');
  const registryCounterStringReplaced = registryCounterString
    .replace('**COUNT**', foodHistoryLength)
    .replace(
      '**REGISTRY**',
      foodHistoryLength === 1
        ? Translator('RegistrySingular')
        : Translator('RegistryPlural'),
    );

  return (
    <Container>
      <PhraseRegistryCount>
        {foodHistoryLength === 0
          ? Translator('WriteDownFirstMeal')
          : registryCounterStringReplaced}
      </PhraseRegistryCount>

      <ButtonAddFoodRegistry
        onPress={() => navigation.navigate('AddFoodRegistrySection')}>
        <Icon name="plus-circle" size={20} color={Colors.Purple.Idle} />
      </ButtonAddFoodRegistry>
    </Container>
  );
};

export default TopBarAddFoodRegistry;
