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

const Settings = ({navigation, route}) => {
  const {params} = route;

  // CONTEXT
  const {theProfile, setProfile, Translator} = useContext(ProfileContext);
  const labelName = Translator('Settings.Name');
  const labelHeight = Translator('Settings.Height');
  const labelWeight = Translator('Settings.Weight');
  const labelAge = Translator('Settings.Age');

  const genderOptions = [
    {label: Translator('Settings.Options.Gender.Male'), value: 'M'},
    {label: Translator('Settings.Options.Gender.Female'), value: 'F'},
  ];

  const activity_factorOptions = [
    {
      label: Translator('Settings.Options.ActivityFactor.Sedentary.Title'),
      description: Translator(
        'Settings.Options.ActivityFactor.Sedentary.Description',
      ),
      value: 1.2,
    },
    {
      label: Translator('Settings.Options.ActivityFactor.LightActive.Title'),
      description: Translator(
        'Settings.Options.ActivityFactor.LightActive.Description',
      ),
      value: 1.375,
    },
    {
      label: Translator('Settings.Options.ActivityFactor.ModerateActive.Title'),
      description: Translator(
        'Settings.Options.ActivityFactor.ModerateActive.Description',
      ),
      value: 1.55,
    },
    {
      label: Translator('Settings.Options.ActivityFactor.HighlyActive.Title'),
      description: Translator(
        'Settings.Options.ActivityFactor.HighlyActive.Description',
      ),
      value: 1.725,
    },
    {
      label: Translator(
        'Settings.Options.ActivityFactor.ExtremelyActive.Title',
      ),
      description: Translator(
        'Settings.Options.ActivityFactor.ExtremelyActive.Description',
      ),
      value: 1.9,
    },
  ];

  // STATE
  const [profileSettings, setProfileSettings] = useState(theProfile);
  const [gender, setGender] = useState(genderOptions[0].value);
  const [currentActivityFactor, setActivityFactor] = useState(
    activity_factorOptions[0].value,
  );

  // EFFECT
  useEffect(() => {
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

    if (name === '') emptyFields.push(labelName);
    if (weight === '') emptyFields.push(labelWeight);
    if (height === '') emptyFields.push(labelHeight);
    if (age === '') emptyFields.push(labelAge);

    if (emptyFields.length > 0) {
      Alert.alert(
        Translator('Alert.Warning'),
        `${Translator(
          'Alert.Message.FillCorrectlyFieldsBelow',
        )}\n\n${emptyFields.join(', ')}`,
      );
      return false;
    }

    if (!isNaN(weight)) {
      validWeight = parseFloat(weight);
    }

    if (!isNaN(height)) {
      validHeight = parseInt(height, 10);
    }

    if (!isNaN(age)) {
      validAge = parseInt(age, 10);
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

    Toaster.ShowToast(Translator('Toast.InformationsUpdated'), 'SHORT');

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
          <MainTitle>{Translator('Settings.Title')}</MainTitle>
          <Subtitle>{Translator('Settings.Description')}</Subtitle>

          <TextInputCustom
            label={labelName}
            value={profileSettings.name}
            placeholder="Jhon Doe"
            onChange={text => onChangeProfileSettings('name', text)}
            handleIconFunction={() => onChangeProfileSettings('name', '')}
            autoCorrect={false}
          />

          <TextInputCustom
            label={Translator('Settings.ProfilePhrase')}
            value={profileSettings.phrase}
            placeholder="Keep strong and focused!"
            onChange={text => onChangeProfileSettings('phrase', text)}
            handleIconFunction={() => onChangeProfileSettings('phrase', '')}
            autoCorrect={false}
          />

          <TextInputCustom
            label={labelWeight}
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
            label={labelHeight}
            value={profileSettings.height.toString()}
            placeholder="165"
            keyboardType="numeric"
            onChange={text => onChangeProfileSettings('height', text)}
            handleIconFunction={() => onChangeProfileSettings('height', '')}
            autoCorrect={false}
          />

          <TextInputCustom
            label={labelAge}
            value={profileSettings.age.toString()}
            placeholder="26"
            keyboardType="numeric"
            onChange={text => onChangeProfileSettings('age', text)}
            handleIconFunction={() => onChangeProfileSettings('age', '')}
            autoCorrect={false}
          />

          <Picker
            label={Translator('Settings.Gender')}
            selectedValue={gender}
            onValueChange={(itemValue, itemIndex) => {
              setGender(itemValue);
            }}
            items={genderOptions}
          />

          <Picker
            label={Translator('Settings.ActivityProfile')}
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
            <ButtonDefault
              text={Translator('Buttons.SaveSettings')}
              onPress={handleUpdateProfile}
            />
          </ButtonsContainer>
        </MainView>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default Settings;
