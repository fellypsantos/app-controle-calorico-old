import React, {useState, useEffect, useContext} from 'react';
import {KeyboardAvoidingView, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {CommonActions} from '@react-navigation/native';

import {ProfileContext} from '../../Contexts/ProfileContext';
import Colors from '../../Colors';
import ButtonDefault from '../../components/ButtonDefault';
import MainTitle from '../../components/MainTitle';
import Subtitle from '../../components/Subtitle';
import TextInputCustom from '../../components/TextInputCustom';
import Picker from '../../components/Picker';
import Toaster from '../../Toaster';

import {ButtonsContainer, Container, MainView} from './styles';

const genderOptions = [
  {label: 'Masculino', value: 'M'},
  {label: 'Feminino', value: 'F'},
];

const activity_factorOptions = [
  {
    label: 'Sedentário',
    description: 'Pouco ou nenhum exercício',
    value: 1.2,
  },
  {
    label: 'Levemente ativo',
    description: 'Exercício leve, 1 a 3 dias/semana',
    value: 1.375,
  },
  {
    label: 'Moderadamente ativo',
    description: 'Esportes 3 a 5 dias/semana',
    value: 1.55,
  },
  {
    label: 'Muito ativo',
    description: 'Exercicio itenso 5 a 6 dias/semana',
    value: 1.725,
  },
  {
    label: 'Extremamente ativo',
    description: 'Exercício intenso diário',
    value: 1.9,
  },
];

const Settings = ({navigation, route}) => {
  const {params} = route;

  // CONTEXT
  const {theProfile, setProfile} = useContext(ProfileContext);

  // STATE
  const [profileSettings, setProfileSettings] = useState(theProfile);
  const [gender, setGender] = useState(genderOptions[0].value);
  const [currentActivityFactor, setActivityFactor] = useState(
    activity_factorOptions[0].value,
  );

  // EFFECT
  useEffect(() => {
    console.log('Settings screen: theProfile changed... RELOAD!', theProfile);
    setProfileSettings(theProfile);
    setGender(theProfile.gender);
    setActivityFactor(theProfile.activity_factor);
  }, [theProfile]);

  const onChangeProfileSettings = (field, value) => {
    setProfileSettings({
      ...profileSettings,
      [field]: value,
    });
  };

  const handleUpdateProfile = () => {
    console.log('\n\n');
    const {name, weight, height, age} = profileSettings;

    let validWeight;
    let validHeight;
    let validAge;

    const emptyFields = [];

    if (name === '') emptyFields.push('Seu nome');
    if (weight === '') emptyFields.push('Peso');
    if (height === '') emptyFields.push('Altura');
    if (age === '') emptyFields.push('Idade');

    if (emptyFields.length > 0) {
      Alert.alert(
        'Atenção!',
        `Por gentileza, preencha corretamente os campos abaixo.\n\n${emptyFields.join(
          ', ',
        )}`,
      );
      return false;
    }

    if (!isNaN(weight)) {
      validWeight = parseFloat(weight);
    }

    if (!isNaN(height)) {
      validHeight = parseInt(height);
    }

    if (!isNaN(age)) {
      validAge = parseInt(age);
    }

    const preparedProfileData = {
      ...profileSettings,
      gender,
      weight: validWeight,
      height: validHeight,
      age: validAge,
      activity_factor: parseFloat(currentActivityFactor),
      needUpdate: !params.isFirstRun,
    };

    console.log('PREPARED_PROFILE_DATA', preparedProfileData);

    setProfile(preparedProfileData);

    Toaster.ShowToast('Suas informações foram atualizadas.', 'SHORT');

    // FIRST TIME
    if (params.isFirstRun) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name: 'EntryPoint',
            },
          ],
        }),
      );

      console.log('STACK NAVIGATION RESETED');
    }

    // UPDATE PROFILE
    else {
      navigation.navigate('Home');
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
      <Container>
        <MainView>
          <Icon name="user-alt" size={40} color={Colors.Purple.Idle} />
          <MainTitle>Configurações</MainTitle>
          <Subtitle>Ajuste as suas informações a qualquer momento.</Subtitle>

          <TextInputCustom
            label="Seu nome:"
            value={profileSettings.name}
            placeholder="Jhon Doe"
            onChange={text => onChangeProfileSettings('name', text)}
            handleIconFunction={() => onChangeProfileSettings('name', '')}
            autoCorrect={false}
          />

          <TextInputCustom
            label="Frase de perfil:"
            value={profileSettings.phrase}
            placeholder="Keep strong and focused!"
            onChange={text => onChangeProfileSettings('phrase', text)}
            handleIconFunction={() => onChangeProfileSettings('phrase', '')}
            autoCorrect={false}
          />

          <TextInputCustom
            label="Peso (Kg):"
            value={profileSettings.weight.toString()}
            placeholder="50"
            keyboardType="numeric"
            onChange={text =>
              onChangeProfileSettings('weight', text.replace(',', '.'))
            }
            handleIconFunction={() => onChangeProfileSettings('weight', '')}
            autoCorrect={false}
          />

          <TextInputCustom
            label="Altura (cm):"
            value={profileSettings.height.toString()}
            placeholder="165"
            keyboardType="numeric"
            onChange={text => onChangeProfileSettings('height', text)}
            handleIconFunction={() => onChangeProfileSettings('height', '')}
            autoCorrect={false}
          />

          <TextInputCustom
            label="Idade:"
            value={profileSettings.age.toString()}
            placeholder="26"
            keyboardType="numeric"
            onChange={text => onChangeProfileSettings('age', text)}
            handleIconFunction={() => onChangeProfileSettings('age', '')}
            autoCorrect={false}
          />

          <Picker
            label="Sexo:"
            selectedValue={gender}
            onValueChange={(itemValue, itemIndex) => {
              setGender(itemValue);
            }}
            items={genderOptions}
          />

          <Picker
            label="O que se considera?"
            selectedValue={currentActivityFactor}
            onValueChange={(itemValue, itemIndex) => {
              console.log('setActivityFactor', itemValue);
              setActivityFactor(itemValue);
            }}
            items={activity_factorOptions}
          />

          <Subtitle>
            {currentActivityFactor === undefined
              ? activity_factorOptions[0].description
              : activity_factorOptions.find(
                  item => item.value === currentActivityFactor,
                ).description}
          </Subtitle>

          <ButtonsContainer>
            <ButtonDefault text="Salvar Dados" onPress={handleUpdateProfile} />
          </ButtonsContainer>
        </MainView>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default Settings;
