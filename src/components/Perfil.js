import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Cores from '../Cores';

export default class Perfil extends Component {
  render() {
    const { dados } = this.props;

    return (
      <View style={styles.areaPerfil}>
        <Image
          source={
            (dados.sexo == 'M')
            ? require('../../assets/images/man.png')
            : require('../../assets/images/girl.png')
          }
          style={styles.fotoPerfil}
        />
        <Text style={styles.nome}>{ dados.nome }</Text>
        <Text style={styles.frase}>{ dados.frase }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  areaPerfil: {
    alignItems: 'center'
  },
  fotoPerfil: {
    backgroundColor: '#F6F6F5',
    borderWidth: 2,
    borderColor: Cores.roxoClaro,
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  nome: {
    fontFamily: 'Open Sans Regular',
    fontSize: 25,
    color: Cores.roxoClaro,
    marginBottom: 5,
  },
  frase: {
    fontFamily: 'Open Sans Light',
    color: Cores.roxoClaro,
    fontStyle: 'italic',
    fontSize: 12
  },
});
