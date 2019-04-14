import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import FormStyle from './FormStyle';

export default class UserPicker extends Component {
  render() {
    const { label="Label", options, value, onValueChange } = this.props;

    return (
      <View style={FormStyle.inputContainer}>
        <Text style={FormStyle.inputLabel}>{label}</Text>
        <View style={FormStyle.pickerArea}>
          <Picker selectedValue={value} onValueChange={(itemValue) => onValueChange(itemValue)}>
            {
              options.map(
                item => <Picker.Item key={item.value} label={item.label} value={item.value}/>
              )
            }
          </Picker>
        </View>
      </View>
    );
  }
}
