import React, {useState} from 'react';
import AddFoodRegistry from '../../components/AddFoodRegistry';

import {ButtonAddFoodRegistry, Container, PhraseRegistryCount} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Colors from '../../Colors';

const TopBarAddFoodRegistry = () => {
  const [modalAddFoodRegistry, setOpenModalAddFoodRegistry] = useState(true);

  return (
    <Container>
      {/* Modal */}
      <AddFoodRegistry
        visible={modalAddFoodRegistry}
        handleClose={() => setOpenModalAddFoodRegistry(false)}
      />

      <PhraseRegistryCount>
        {true ? 'Você anotou 4 registros hoje.' : 'Nenhum registro.'}
      </PhraseRegistryCount>

      <ButtonAddFoodRegistry onPress={() => setOpenModalAddFoodRegistry(true)}>
        <Icon name="plus-circle" size={20} color={Colors.Purple.Idle} />
      </ButtonAddFoodRegistry>
    </Container>
  );
};

export default TopBarAddFoodRegistry;
