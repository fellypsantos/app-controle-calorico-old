import React, {useState, useEffect, useContext} from 'react';
import {useRoute} from '@react-navigation/native';
import {KeyboardAvoidingView, Alert} from 'react-native';
import dayjs from 'dayjs';
import 'dayjs/locale/pt';
import 'dayjs/locale/en';
import 'dayjs/locale/es';

dayjs.extend(require('dayjs/plugin/localizedFormat'));

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

import {ProfileContext} from '../../Contexts/ProfileContext';
import Colors from '../../Colors';
import FoodCategorySelector from '../FoodCategorySelector';
import ButtonDefault from '../ButtonDefault';
import MainTitle from '../MainTitle';
import Subtitle from '../Subtitle';
import FormLabelControl from '../FormLabelControl';
import DataBase from '../../DataBase';
import DeviceLocaleHandler from '../../DeviceLocaleHandler';

const AddFoodRegistry = ({handleClose}) => {
  const {theFoodHistory, setFoodHistory, Translator} = useContext(
    ProfileContext,
  );
  const [foodName, setFoodName] = useState('');
  const [foodKcal, setFoodKcal] = useState('');
  const [foodCategory, setFoodCategory] = useState();
  const [currentDate, setCurrentDate] = useState();
  const [show, setShow] = useState(false);
  const [editableItem, setEditableItem] = useState();

  const route = useRoute();
  const deviceLocale = DeviceLocaleHandler.getSupported();
  const dayjsHandler = dayjs().locale(deviceLocale);

  const labelWhatDoYouEat = Translator('NewRegistry.Fields.WhatDoYouEat');
  const labelHowManyCalories = Translator('NewRegistry.Fields.HowManyCalories');

  // put food category options here
  const FoodCategoryOptions = [
    {
      id: 1,
      label: Translator('Food.Category.Light'),
      icon: 'smile',
      checked: false,
    },
    {
      id: 2,
      label: Translator('Food.Category.Moderate'),
      icon: 'exclamation-triangle',
      checked: false,
    },
    {
      id: 3,
      label: Translator('Food.Category.Heavy'),
      icon: 'sad-tear',
      checked: false,
    },
  ];

  useEffect(() => {
    setCurrentDate(dayjsHandler.format());
    setEditableItem(route.params);

    // IF IS EDIT MODE, POPULATE FIELDS WITH THIS DATA
    if (route.params !== undefined) {
      const {name, kcal, datetime_moment} = route.params;
      setFoodName(name);
      setFoodKcal(kcal.toString());
      setFoodCategory();
      setCurrentDate(dayjs(datetime_moment).format());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (event, selectedDate) => {
    setShow(false);

    if (event.type === 'set') {
      if (selectedDate !== undefined) {
        setCurrentDate(dayjs(selectedDate).format());
      }
    }
  };

  const handleSaveFoodRegistry = () => {
    const fieldsWithError = [];
    setShow(false);

    if (foodCategory === undefined)
      fieldsWithError.push(Translator('Food.Category.FullLabelAllTypes'));
    if (foodName === '') fieldsWithError.push(labelWhatDoYouEat);
    if (foodKcal === '') fieldsWithError.push(labelHowManyCalories);

    if (fieldsWithError.length > 0) {
      Alert.alert(
        Translator('Alert.Warning'),
        `${Translator(
          'Alert.Message.NeedFillTheFields',
        )}\n\n${fieldsWithError.join('\n')}`,
      );

      return false;
    }

    const newFoodRegistry = {
      foodName,
      foodKcal: parseInt(foodKcal, 10),
      foodCategory,
      currentDateMoment: currentDate,
      currentDateSql: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };

    const updatedFoodRegistry =
      editableItem !== undefined
        ? {
            id: editableItem.id,
            ...newFoodRegistry,
          }
        : null;

    // ADD NEW REGISTRY
    if (editableItem === undefined) {
      console.log('ADD NEW REGISTRY', newFoodRegistry);
      DataBase.addFoodRegistry(newFoodRegistry, results => {
        setFoodHistory([
          {
            ...results.insertedRow,
          },
          ...theFoodHistory,
        ]);
        handleClose(false);
      });
    }

    // UPDATE THE REGISTRY
    else {
      console.log('UPDATE FOOD REGISTRY', updatedFoodRegistry);

      DataBase.updateFoodRegistry(updatedFoodRegistry, result => {
        // console.log('updateFoodRegistry result', result);

        console.log('updatedFoodRegistry', updatedFoodRegistry);
        console.log('theFoodHistory', theFoodHistory);

        const newListAfterUpdate = theFoodHistory.map(item => {
          if (item.id === editableItem.id) {
            return {
              id: updatedFoodRegistry.id,
              name: updatedFoodRegistry.foodName,
              category_level: updatedFoodRegistry.foodCategory,
              kcal: updatedFoodRegistry.foodKcal,
              datatime_moment: updatedFoodRegistry.currentDateMoment,
              datatime_sql: updatedFoodRegistry.currentDateSql,
            };
          }

          return item;
        });

        setFoodHistory(newListAfterUpdate);
        handleClose(false);
      });
    }
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
      <Container>
        <AppSection>
          {/* DATE PICKER */}
          {show && (
            <DateTimePicker
              value={dayjs(currentDate).toDate()}
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
          <MainTitle>
            {editableItem === undefined
              ? Translator('NewRegistry.New.Title')
              : Translator('NewRegistry.Edit.Title')}
          </MainTitle>
          <Subtitle>
            {editableItem === undefined
              ? Translator('NewRegistry.New.Description')
              : Translator('NewRegistry.Edit.Description')}
          </Subtitle>

          <FormContainer>
            <FormLabelControl
              text={Translator('NewRegistry.Fields.WhichCategory')}
            />
            <FoodCategorySelector
              arrOptions={FoodCategoryOptions}
              handleChange={newValue => setFoodCategory(newValue)}
            />

            <TextInputCustom
              value={foodName}
              label={labelWhatDoYouEat}
              placeholder="Ex: Strogonoff"
              onChange={text => setFoodName(text)}
              handleIconFunction={() => setFoodName('')}
            />

            <TextInputCustom
              value={foodKcal}
              label={labelHowManyCalories}
              placeholder="Ex: 294"
              keyboardType="numeric"
              onChange={text => setFoodKcal(text)}
              handleIconFunction={() => setFoodKcal('')}
            />

            <TextInputCustom
              label={Translator('NewRegistry.Fields.WhichMoment')}
              value={dayjs(currentDate).locale('pt').format('LT')}
              renderAsDateTimePicker
              handleIconFunction={() => setShow(true)}
            />

            <ButtonsContainer>
              <ButtonDefault
                text={Translator('Buttons.SaveRegistry')}
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
