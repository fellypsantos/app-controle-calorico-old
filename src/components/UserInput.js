import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import FormStyle from "./FormStyle";

export default class UserInput extends Component {
  mostrarDicas(txt) {
    Alert.alert("Informação", txt);
  }

  render() {
    const {
      label = "Label",
      value,
      keyboardType = "text",
      onChangeText,
      informacao
    } = this.props;

    return (
      <View style={FormStyle.inputContainer}>
        <Text style={FormStyle.inputLabel}>{label}</Text>
        <View style={FormStyle.inputArea}>
          <TouchableOpacity
            onPress={() => {
              this.mostrarDicas(informacao);
            }}
          >
            <Icon name="question-circle" size={20} color="#aaa" />
          </TouchableOpacity>
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
