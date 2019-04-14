import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FormStyle from './FormStyle';

export default class UserInput extends Component {
  render() {
    const { label="Label", value, keyboardType="text", onChangeText } = this.props;

    return (
      <View style={FormStyle.inputContainer}>
        <Text style={FormStyle.inputLabel}>{label}</Text>
        <View style={FormStyle.inputArea}>
          <Icon name="question-circle" size={20} color="#aaa" />
          <TextInput
            style={FormStyle.inputText}
            keyboardType={keyboardType}
            value={value}
            onChangeText={onChangeText}
          />
        </View>
      </View>
    );
  }
}
