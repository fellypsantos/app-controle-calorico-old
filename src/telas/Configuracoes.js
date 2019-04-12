import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';

export default class Configuracoes extends Component {
  static navigationOptions = {
    title: 'Configurações',
    headerLeft: null,
  };

  render() {
    return (
      <View>
        <Text>Tela para alterar dados do usuário</Text>
        <Text>É usada no primeiro acesso, e ao clicar no ícone de configurações.</Text>
        <Button
          title="Salvar"
          onPress={() => { this.props.navigation.navigate('Home') }}
        />
      </View>
    );
  }
}
