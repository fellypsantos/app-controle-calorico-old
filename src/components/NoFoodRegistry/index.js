import React from 'react';
import {Container, NoRegistryLabel} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../Colors';

const NoFoodRegistry = ({hidden}) => (
  <Container hidden={hidden}>
    <Icon name="mug-hot" size={30} color={Colors.Grey.Default} />
    <NoRegistryLabel>Nenhum registro por aqui.</NoRegistryLabel>
  </Container>
);

export default NoFoodRegistry;
