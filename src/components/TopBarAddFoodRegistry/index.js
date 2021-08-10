import React, {useContext} from 'react';

import {ButtonAddFoodRegistry, Container, PhraseRegistryCount} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {ProfileContext} from '../../Contexts/ProfileContext';
import Colors from '../../Colors';

const TopBarAddFoodRegistry = ({navigation}) => {
  const {theFoodHistory} = useContext(ProfileContext);

  console.log('theFoodHistory', theFoodHistory);

  return (
    <Container>
      <PhraseRegistryCount>
        {theFoodHistory.length === 0
          ? 'Anote a sua primeira refeição.'
          : `Você anotou ${theFoodHistory.length} registro${
              theFoodHistory.length !== 1 && 's'
            } hoje.`}
      </PhraseRegistryCount>

      <ButtonAddFoodRegistry
        onPress={() => navigation.navigate('AddFoodRegistrySection')}>
        <Icon name="plus-circle" size={20} color={Colors.Purple.Idle} />
      </ButtonAddFoodRegistry>
    </Container>
  );
};

export default TopBarAddFoodRegistry;
