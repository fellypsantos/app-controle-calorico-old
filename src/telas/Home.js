import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Cores from '../Cores';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import DataBase from '../DataBase'

DataBase.open();

const resetAction = StackActions.reset({
  index: 1,
  actions: [
    NavigationActions.navigate({ routeName: 'Home' }),
    NavigationActions.navigate({ routeName: 'Configuracoes' }, ),
  ],
});

export default class Home extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      nome: '',
      frase: '',
      peso: '',
      altura: '',
      idade: '',
      sexo: 'M',
      fatorAtividade: '1.2',
      gastoEnergeticoTotalDiario: 0,
      registros: [],
    }

    this.atualizarStateDataBase = this.atualizarStateDataBase.bind(this);
    this.calcGastoEnergeticoBasal = this.calcGastoEnergeticoBasal.bind(this);
  }

  calcGastoEnergeticoBasal() {
    const { peso, altura, idade, sexo, fatorAtividade } = this.state;
    let tmb = (sexo === 'M')
    ? (((13.75 * peso) + (5 * altura) - (6.76 * idade)) + 66.5)
    : (((9.56 * peso) + (1.85 * altura) - (4.68 * idade)) + 665)

    tmb *= parseFloat(fatorAtividade);

    console.log("Basto Energético Basal: ", tmb);
    this.setState({
      gastoEnergeticoTotalDiario: parseInt(tmb),
    })
  }

  atualizarStateDataBase() {
    DataBase.getDadosPerfil((results) => {
      if ( results.rows.item(0).last_run !== null ) {
        // já existe configuração, carregar...
        const perfil = results.rows.item(0);
        DataBase.updateComponentState(perfil, this);
        this.calcGastoEnergeticoBasal();
      }
    });
  }

  componentDidMount() {
    this.atualizarStateDataBase();

    const didBlurSubscription = this.props.navigation.addListener(
      'willFocus',
      payload => {
        console.log('pegar dados do DB novamente');
        this.atualizarStateDataBase();
      }
    );

    DataBase.getRegistros(null, results => {
      console.log('registros', results);
    });
  }

  render() {
    const { nome, frase, peso, altura, idade, sexo, fatorAtividade, gastoEnergeticoTotalDiario } = this.state;

    return (
      <ScrollView style={styles.container}>

        <StatusBar backgroundColor={Cores.roxoNubank} barStyle="light-content" />
        
        {/* PARTE ROXA DO TOPO */}
        <View style={styles.containerTopo}>

          <View style={styles.iconesTopo}>
            <TouchableOpacity onPress={() => null} style={styles.iconeTopoArea}>
              <Icon5 name="door-open" size={20} color={Cores.roxoClaro}/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.dispatch(resetAction)}
              style={styles.iconeTopoArea}>
              <Icon5 name="cog" size={20} color={Cores.roxoClaro}/>
            </TouchableOpacity>
          </View>

          <View style={styles.areaPerfil}>
            <Image
              source={
                (sexo == 'M')
                ? require('../../assets/images/man.png')
                : require('../../assets/images/girl.png')
              }
              style={styles.fotoPerfil}
            />
            <Text style={styles.nome}>{ nome }</Text>
            <Text style={styles.frase}>{ frase }</Text>
          </View>

          <View style={styles.containerContadorCalorias}>
            <View style={styles.containerInfoCalorias}>
              <Text style={styles.numeroCalorias}>1200</Text>
              <Text style={styles.labelContadorCalorias}>Mínimo</Text>
            </View>
            <View style={[styles.containerInfoCalorias, styles.containerInfoCaloriasCentro]}>
            <Text style={[styles.numeroCalorias, styles.totalConsumido]}>0</Text>
            <Text style={styles.labelContadorCalorias}>Consumido (Kcal)</Text>
            </View>
            <View style={styles.containerInfoCalorias}>
              <Text style={styles.numeroCalorias}>{ gastoEnergeticoTotalDiario }</Text>
              <Text style={styles.labelContadorCalorias}>Máximo</Text>
            </View>
          </View>
        </View>

        {/* PAGINA BRANCA COM OS CONTEÚDOS */}
        <View style={styles.containerBranco}>

          <View style={styles.topoContainerBranco}>
            <Text style={styles.contadorRegistos}>Já foram anotados 12 registros hoje.</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('NovoRegistro')}>
              <Icon5 name="plus-circle" size={20} color={Cores.roxoNubank}/>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => Alert.alert('Detalhes', 'Mostrar completo aqui')}>
            <View style={styles.registroContainer}>
              <View style={styles.registroIconeArea}>
                <Image source={require('../../assets/images/moon.png')} style={styles.registroIcone}/>
              </View>
              <View style={styles.registroDados}>
                <Text style={styles.nomeAlimento} numberOfLines={1}>Carne assada de panela + açaí bem pirão adubado</Text>
                <Text style={styles.subInfo}>Alimentação | 22h34</Text>
                <Text style={styles.subInfo}>594 kcal</Text>
              </View>
              <Icon5 name='smile' size={15} color={Cores.roxoNubank}/>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    paddingBottom: 10,
  },
  containerTopo: {
    backgroundColor: Cores.roxoNubank,
    paddingBottom: 80,
  },
  iconesTopo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  iconeTopoArea: {
    padding: 10,
  },

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

  containerBranco: {
    elevation: 5,
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    marginTop: -80,
    borderRadius: 10,
  },
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

  registroContainer: {
    // backgroundColor: '#aaa',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  registroIconeArea: {
    backgroundColor: Cores.roxoNubank,
    padding: 15,
    borderRadius: 7,
    marginRight: 10
  },
  registroIcone: {
    width: 25,
    height: 25,
  },
  registroDados: {
    flex: 1,
    marginRight: 5,
  },
  nomeAlimento: {
    fontFamily: 'Open Sans Regular',
    fontSize: 17,
    marginBottom: 2,
    color: "#545454"
  },
  subInfo: {
    fontFamily: 'Open Sans Regular',
    fontSize: 13,
    marginBottom: 2,
    color: "#545454"
  },

  areaNenhumRegistro: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  txtNenhumRegistro: {
    padding: 20,
  }
});
