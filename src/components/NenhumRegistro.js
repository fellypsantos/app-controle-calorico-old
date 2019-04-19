import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

export default class NenhumRegistro extends Component {
  render() {
    const { totalRegistros } = this.props;

    return (
      (totalRegistros == 0) && 
      <View style={styles.areaNenhumRegistro}>
        <Icon5 name="mug-hot" size={30} />
        <Text style={styles.txtNenhumRegistro}>Nenhum registro até agora.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  areaNenhumRegistro: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  txtNenhumRegistro: {
    fontFamily: 'Open Sans Regular',
    fontSize: 15,
    padding: 15,
    marginTop: 5,
  },
});
