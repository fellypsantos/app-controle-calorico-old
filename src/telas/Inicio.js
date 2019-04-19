import React, {Component} from 'react';
import {StyleSheet, Text, Image, View, TouchableOpacity, StatusBar, ActivityIndicator} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Orientation from 'react-native-orientation-locker';
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

    this.props.navigation.addListener(
      'willFocus',
      payload => Orientation.lockToPortrait()
    );

    this.props.navigation.addListener(
      'willBlur',
      payload => Orientation.unlockAllOrientations()
    );

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
            <View style={styles.containerTelaInicial}>
              <Text style={styles.tituloApp}>Contador de Calorias</Text>
              <Image source={require('../../assets/images/eating.png')} style={styles.iconePrincipal}/>
              <Text style={styles.descricaoApp}>Você tem nas mãos um controle simples</Text>
              <Text style={styles.descricaoApp}>e prático de sua alimentação.</Text>
              <TouchableOpacity
                style={styles.btnComecar}
                onPress={() => { this.props.navigation.navigate('Configuracoes') }}
              >
                <Text style={styles.txtComecar}>Comece agora</Text>
              </TouchableOpacity>
            </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Cores.roxoClaro,
    borderRadius: 5,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 6,
    paddingBottom: 6,
    marginTop: 100,
    elevation: 2,
  },
  txtComecar: {
    color: Cores.roxoNubank,
    fontSize: 18,
    fontFamily: 'Open Sans Regular',
  },
  verificando: {
    fontSize: 15,
    color: Cores.roxoClaro,
    padding: 12,
    fontFamily: 'Open Sans Regular'
  },

  containerTelaInicial: {
    // backgroundColor: '#747474',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  iconePrincipal: {
    width: 150,
    height: 150,
    marginTop: 80,
    marginBottom: 80,
  },
  tituloApp: {
    fontFamily: 'Open Sans Regular',
    fontSize: 30,
    color: Cores.roxoClaro,
  },
  descricaoApp: {
    fontFamily: 'Open Sans Regular',
    fontSize: 15,
    color: Cores.roxoClaro,
  }
});