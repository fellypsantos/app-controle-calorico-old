import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Cores from '../Cores';

export default class TopoPaginabranca extends Component {
  render() {
    const { dados, navigationContext } = this.props;

    return (
      <View style={styles.topoContainerBranco}>
        {
          (dados.registros.length > 0)
          ? <Text style={styles.contadorRegistos}>Já foram anotados { dados.registros.length } registros hoje.</Text>
          : <Text></Text>
        }
        <TouchableOpacity onPress={() => navigationContext.navigate('NovoRegistro')}>
          <Icon5 name="plus-circle" size={20} color={Cores.roxoNubank}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topoContainerBranco: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contadorRegistos: {
    fontSize: 15,
    fontFamily: 'Open Sans Regular',
    color: "#545454"
  },
});
