import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Cores from '../Cores';

export default class CounterCalorias extends Component {
  render() {
    const { dados } = this.props;
    return (
      <View style={styles.containerContadorCalorias}>

        <View style={styles.containerInfoCalorias}>
          <Text style={styles.numeroCalorias}>1200</Text>
          <Text style={styles.labelContadorCalorias}>Mínimo</Text>
        </View>

        <View style={[styles.containerInfoCalorias, styles.containerInfoCaloriasCentro]}>
          <Text style={[styles.numeroCalorias, styles.totalConsumido]}>{ dados.totalKcalHoje }</Text>
          <Text style={styles.labelContadorCalorias}>Consumido (Kcal)</Text>
        </View>

        <View style={styles.containerInfoCalorias}>
          <Text style={styles.numeroCalorias}>{ dados.gastoEnergeticoTotalDiario }</Text>
          <Text style={styles.labelContadorCalorias}>Máximo</Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerContadorCalorias: {
    flexDirection: 'row',
    marginTop: 25,
    marginBottom: 25
  },
  containerInfoCalorias: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  containerInfoCaloriasCentro: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Cores.roxoClaro,
  },
  numeroCalorias: {
    fontSize: 20,
    fontFamily: 'Open Sans Regular',
    color: Cores.roxoClaro,
    marginBottom: 5
  },
  totalConsumido: {
    fontFamily: 'Open Sans Bold',
    fontSize: 30,
    color: Cores.roxoClaro,
  },
  labelContadorCalorias: {
    fontFamily: 'Open Sans Regular',
    fontSize: 12,
    color: Cores.roxoClaro,
  },
});
