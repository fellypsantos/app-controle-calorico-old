import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';

export default class Home extends Component {
  static navigationOptions = {
    title: 'Tela Principal',
  };

  render() {
    return (
      <View>
        <Text>Tela principal, lista os registros de alimentação do dia</Text>

        <Button
          title="Abrir configurações"
          onPress={() => { this.props.navigation.navigate('Configuracoes') }}
        />
      </View>
    );
  }
}
