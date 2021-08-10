import React, {useState, useEffect, useContext} from 'react';
import {NativeModules, KeyboardAvoidingView, Alert} from 'react-native';
import moment from 'moment/min/moment-with-locales';

import {
  AppSection,
  ButtonsContainer,
  CloseIconBox,
  Container,
  FormContainer,
  HeaderIcons,
} from './styles';

import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TextInputCustom from '../TextInputCustom';
import FoodCategoryOptions from '../../FoodCategoryOptions';

import {ProfileContext} from '../../Contexts/ProfileContext';
import Colors from '../../Colors';
import FoodCategorySelector from '../FoodCategorySelector';
import ButtonDefault from '../ButtonDefault';
import MainTitle from '../MainTitle';
import Subtitle from '../Subtitle';
import FormLabelControl from '../FormLabelControl';
import DataBase from '../../DataBase';

const AddFoodRegistry = ({handleClose}) => {
  const {theFoodHistory, setFoodHistory} = useContext(ProfileContext);
  const [foodName, setFoodName] = useState('');
  const [foodKcal, setFoodKcal] = useState('');
  const [foodCategory, setFoodCategory] = useState();
  const [currentDate, setCurrentDate] = useState();
  const [show, setShow] = useState(false);

  const deviceLocale = NativeModules.I18nManager.localeIdentifier;
  const momentjs = moment();
  momentjs.locale(deviceLocale);

  useEffect(() => {
    setCurrentDate(momentjs.format());
    console.log('UPDATED_CURRENT_DATE');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      setCurrentDate(moment(selectedDate).format());
    }
    setShow(false);
  };

  const handleSaveFoodRegistry = () => {
    const fieldsWithError = [];

    if (foodCategory === undefined)
      fieldsWithError.push('Alimentação (leve/moderada/pesada)');
    if (foodName === '') fieldsWithError.push('O que comeu?');
    if (foodKcal === '') fieldsWithError.push('Quantas calorias?');

    if (fieldsWithError.length > 0) {
      Alert.alert(
        'Atenção',
        `Você precisa preencher os campos:\n\n${fieldsWithError.join('\n')}`,
      );

      return false;
    }

    const newFoodRegistry = {
      foodName,
      foodKcal: parseInt(foodKcal, 10),
      foodCategory,
      currentDateMoment: currentDate,
      currentDateSql: momentjs.format('YYYY-MM-DD HH:mm:ss'),
    };

    console.log('newFoodRegistry', newFoodRegistry);

    DataBase.addFoodRegistry(newFoodRegistry, results => {
      setFoodHistory([
        {
          ...results.insertedRow,
        },
        ...theFoodHistory,
      ]);
      handleClose(false);
    });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
      <Container>
        <AppSection>
          {/* DATE PICKER */}
          {show && (
            <DateTimePicker
              value={moment(currentDate).toDate()}
              mode="time"
              onChange={onChange}
            />
          )}
          <HeaderIcons>
            <Icon name="utensils" size={40} color={Colors.Purple.Idle} />
            <CloseIconBox onPress={handleClose}>
              <Icon name="times-circle" size={18} color="#666" />
            </CloseIconBox>
          </HeaderIcons>
          <MainTitle>Novo Registro</MainTitle>
          <Subtitle>Adicione um registro alimentar ao seu histórico.</Subtitle>

          <FormContainer>
            <FormLabelControl>Como classificaria?</FormLabelControl>
            <FoodCategorySelector
              arrOptions={FoodCategoryOptions}
              handleChange={newValue => setFoodCategory(newValue)}
            />

            <TextInputCustom
              value={foodName}
              label="O que comeu ?"
              placeholder="Ex: Strogonoff"
              onChange={text => setFoodName(text)}
              handleIconFunction={() => setFoodName('')}
            />

            <TextInputCustom
              value={foodKcal}
              label="Quantas calorias ?"
              placeholder="Ex: 294"
              keyboardType="numeric"
              onChange={text => setFoodKcal(text)}
              handleIconFunction={() => setFoodKcal('')}
            />

            <TextInputCustom
              label="Em que momento ?"
              value={moment(currentDate).locale(deviceLocale).calendar()}
              renderAsDateTimePicker
              handleIconFunction={() => setShow(true)}
            />

            <ButtonsContainer>
              <ButtonDefault
                text="Salvar Registro"
                onPress={handleSaveFoodRegistry}
              />
            </ButtonsContainer>
          </FormContainer>
        </AppSection>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default AddFoodRegistry;
