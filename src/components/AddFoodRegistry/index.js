import React from 'react';
import {Modal} from 'react-native';
import {
  AdContainer,
  AdSection,
  AppSection,
  ButtonsContainer,
  CloseIconBox,
  Container,
  FormContainer,
  FormInputLabel,
  HeaderIcons,
  MainTitle,
  ScrollContainer,
  SubTitle,
} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TextInputCustom from '../TextInputCustom';

import Colors from '../../Colors';
import FoodCategorySelector from '../FoodCategorySelector';
import ButtonDefault from '../ButtonDefault';
import AdMobFooterContainer from '../AdMobFooterContainer';

const AddFoodRegistry = ({visible, handleClose}) => (
  <Modal animationType="slide" visible={visible} onRequestClose={handleClose}>
    <Container>
      <AdSection>
        <AdMobFooterContainer />
      </AdSection>

      <AppSection>
        <HeaderIcons>
          <Icon name="utensils" size={40} color={Colors.Purple.Idle} />
          <CloseIconBox onPress={handleClose}>
            <Icon name="times-circle" size={18} color="#666" />
          </CloseIconBox>
        </HeaderIcons>
        <MainTitle>Novo Registro</MainTitle>
        <SubTitle>Adicione um registro alimentar ao seu histórico.</SubTitle>

        <FormContainer>
          <FormInputLabel>Como classificaria?</FormInputLabel>
          <FoodCategorySelector />

          <FormInputLabel>O que comeu?</FormInputLabel>
          <TextInputCustom value="" placeholder="Ex: Lasanha" />

          <FormInputLabel>Quantas calorias?</FormInputLabel>
          <TextInputCustom value="" placeholder="Ex: 534" />

          <ButtonsContainer>
            <ButtonDefault />
          </ButtonsContainer>
        </FormContainer>
      </AppSection>
    </Container>
  </Modal>
);

export default AddFoodRegistry;
