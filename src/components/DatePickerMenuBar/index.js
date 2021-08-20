import React, {useState, useContext} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import Toaster from '../../Toaster';
import {ProfileContext} from '../../Contexts/ProfileContext';
import DeviceLocaleHandler from '../../DeviceLocaleHandler';

import {
  Container,
  DatePickerButton,
  DatePickerButtonIcon,
  DatePickerCurrentDateContainer,
  DatePickerCurrentDate,
} from './styles';

const DatePickerMenuBar = () => {
  const {dateInHistoryTab, setDateInHistoryTab} = useContext(ProfileContext);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const deviceLocale = DeviceLocaleHandler.getSupported();

  const addOneDay = () => {
    const theDay = dateInHistoryTab.add(1, 'days');
    setDateInHistoryTab(dayjs(theDay));
  };

  const subOneDay = () => {
    const theDay = dateInHistoryTab.subtract(1, 'days');
    setDateInHistoryTab(dayjs(theDay));
  };

  const setToday = () => {
    setDateInHistoryTab(dayjs().locale(deviceLocale));
    Toaster.ShowToast('Ótimo! A data voltou para hoje :)');
  };

  const handleDateTimePickerChange = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      setDateInHistoryTab(dayjs(selectedDate).locale(deviceLocale));
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
          {dateInHistoryTab.format('LL')}
        </DatePickerCurrentDate>
      </DatePickerCurrentDateContainer>

      <DatePickerButton onPress={() => addOneDay()}>
        <DatePickerButtonIcon name="chevron-right" />
      </DatePickerButton>
    </Container>
  );
};

export default DatePickerMenuBar;
