import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

export default class Inicio extends Component {
  static navigationOptions = {
    title: 'Tela de Boas Vindass',
  };

  render() {
    return (
      <View>
        <Text>Tela de primeira execução do app</Text>
        <Text>Se já estiver configurado, ir pra tela principal.</Text>
        <Button
          title="Começar"
          onPress={() => { this.props.navigation.navigate('Configuracoes') }}
        />
      </View>
    );
  }
}
