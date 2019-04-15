import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, StatusBar, ActivityIndicator} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Cores from '../Cores';
import DataBase from '../DataBase';

DataBase.open();

const resetAction = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home' }),
  ],
});

export default class Inicio extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      verificandoDados: true,
    }
  }

  componentDidMount() {
    DataBase.getDadosPerfil((results) => {
      if ( results.rows.length ) {
        console.log('Dados de perfil encontrados', results.rows.item(0));
        if ( results.rows.item(0).last_run !== null ) {
          this.props.navigation.dispatch(resetAction);  // pular pra Home
        }
        else {          
          this.setState({ verificandoDados: false });   // mostrar o botão Começar
        }
      }
    });
  }

  render() {
    return (
      <View style={styles.fundo}>
        <StatusBar backgroundColor={Cores.roxoNubank} barStyle="light-content" />

        {
          (this.state.verificandoDados)
          ? (
              <View>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={styles.verificando}>Quase lá, carregando...</Text>
              </View>
            )
          : (
            <TouchableOpacity
              style={styles.btnComecar}
              onPress={() => { this.props.navigation.navigate('Configuracoes') }}
            >
              <Text style={styles.txtComecar}>COMEÇAR</Text>
            </TouchableOpacity>
          )
        }

        

        
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
  },
  verificando: {
    fontSize: 15,
    color: Cores.roxoClaro,
    padding: 12,
    fontFamily: 'Open Sans Regular'
  }
});