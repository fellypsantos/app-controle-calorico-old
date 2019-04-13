import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, StatusBar} from 'react-native';
import Cores from '../Cores';

export default class Inicio extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.fundo}>
        <StatusBar backgroundColor={Cores.roxoNubank} barStyle="light-content" />

        <TouchableOpacity
          style={styles.btnComecar}
          onPress={() => { this.props.navigation.navigate('Configuracoes') }}
        >
          <Text style={styles.txtComecar}>COMEÇAR</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: Cores.roxoNubank,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnComecar: {
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Cores.roxoClaro,
    padding: 15,
  },
  txtComecar: {
    color: Cores.roxoNubank,
    fontSize: 25
  }
});