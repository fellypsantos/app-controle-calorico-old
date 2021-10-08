import React, {useContext} from 'react';
import {Container, NoRegistryLabel} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../Colors';
import {ProfileContext} from '../../Contexts/ProfileContext';

const NoFoodRegistry = ({hidden}) => {
  const {Translator} = useContext(ProfileContext);

  return (
    <Container hidden={hidden}>
      <Icon name="mug-hot" size={30} color={Colors.Grey.Default} />
      <NoRegistryLabel>{Translator('NoRegistersHere')}</NoRegistryLabel>
    </Container>
  );
};

export default NoFoodRegistry;
