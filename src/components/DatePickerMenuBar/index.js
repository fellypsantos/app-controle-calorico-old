import React, {useState, useContext} from 'react';
import {NativeModules} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment/min/moment-with-locales';
import Toaster from '../../Toaster';
import {ProfileContext} from '../../Contexts/ProfileContext';

import {
  Container,
  DatePickerButton,
  DatePickerButtonIcon,
  DatePickerCurrentDateContainer,
  DatePickerCurrentDate,
} from './styles';

const DatePickerMenuBar = () => {
  const deviceLocale = NativeModules.I18nManager.localeIdentifier;
  const momentjs = moment();
  momentjs.locale(deviceLocale);

  const {dateInHistoryTab, setDateInHistoryTab} = useContext(ProfileContext);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const addOneDay = () => {
    const theDay = dateInHistoryTab.add(1, 'days');
    setDateInHistoryTab(moment(theDay));
  };

  const subOneDay = () => {
    const theDay = dateInHistoryTab.subtract(1, 'days');
    setDateInHistoryTab(moment(theDay));
  };

  const setToday = () => {
    setDateInHistoryTab(moment());
    Toaster.ShowToast('Ótimo! A data voltou para hoje :)');
  };

  const handleDateTimePickerChange = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      setDateInHistoryTab(moment(selectedDate).locale(deviceLocale));
    }
    setShowDatePicker(false);
  };

  return (
    <Container>
      {showDatePicker && (
        <DateTimePicker
          value={dateInHistoryTab.toDate()}
          mode="date"
          onChange={handleDateTimePickerChange}
        />
      )}

      <DatePickerButton onPress={() => subOneDay()}>
        <DatePickerButtonIcon name="chevron-left" />
      </DatePickerButton>

      <DatePickerCurrentDateContainer
        onPress={() => setShowDatePicker(true)}
        onLongPress={() => setToday()}
        delayLongPress={800}>
        <DatePickerCurrentDate>
          {dateInHistoryTab.format('L')}
        </DatePickerCurrentDate>
      </DatePickerCurrentDateContainer>

      <DatePickerButton onPress={() => addOneDay()}>
        <DatePickerButtonIcon name="chevron-right" />
      </DatePickerButton>
    </Container>
  );
};

export default DatePickerMenuBar;
