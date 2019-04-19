import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  ToastAndroid,
  AppState,
} from 'react-native';
import moment from 'moment';
import Cores from '../Cores';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import DataBase from '../DataBase'
import IconesTopo from '../components/IconesTopo';
import Perfil from '../components/Perfil';
import CounterCalorias from '../components/CounterCalorias';
import TopoPaginaBranca from '../components/TopoPaginaBranca';
import ListaRegistros from '../components/ListaRegistros';
import NenhumRegistro from '../components/NenhumRegistro';

DataBase.open();

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
      totalKcalHoje: 0,
      fatorAtividade: '1.2',
      gastoEnergeticoTotalDiario: 0,
      registros: [],
    }

    this.atualizarStateDataBase = this.atualizarStateDataBase.bind(this);
    this.calcGastoEnergeticoBasal = this.calcGastoEnergeticoBasal.bind(this);
    this.atualizarRegistros = this.atualizarRegistros.bind(this);
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

  atualizarRegistros() {
    let hoje = moment();
    const timestamp_inicio = hoje.set({ hour: 0, minute: 0, second: 0, millisecond: 0}).toDate().getTime();
    const timestamp_fim = hoje.set({ hour: 23, minute: 59, second: 59, millisecond: 999}).toDate().getTime();

    DataBase.getRegistros(timestamp_inicio, timestamp_fim, results => {
      const total = results.rows.length;
      let registrosDB = [];
      let totalKcalConsumidoHoje = 0;

      if (total) {
        for(let i=0; i < total; i++) {
          registrosDB.push(results.rows.item(i));
          totalKcalConsumidoHoje += results.rows.item(i).kcal;
        }

        this.setState({
          registros: registrosDB,
          totalKcalHoje: totalKcalConsumidoHoje,
        });
      }
    });
  }

  atualizaDadosApp() {
    this.atualizarStateDataBase();
    this.atualizarRegistros();
  }

  componentDidMount() {
    this.atualizarStateDataBase();

    this.props.navigation.addListener(
      'willFocus',
      payload => {
        this.atualizaDadosApp();
      }
    );

    AppState.addEventListener('change', nextAppState => {
      if (AppState.currentState == 'active') {
        this.atualizaDadosApp();
      }
    });
  }

  componentWillUnmount() {
    console.log('desmontar e desconectar tudo');
  }

  render() {
    const { nome, frase, sexo, totalKcalHoje, gastoEnergeticoTotalDiario, registros } = this.state;

    return (
      <ScrollView style={styles.container}>

        <StatusBar backgroundColor={Cores.roxoNubank} barStyle="light-content" />
        
        {/* PARTE ROXA DO TOPO */}
        <View style={styles.containerTopo}>
          <IconesTopo navigationContext={this.props.navigation}/>
          <Perfil dados={{ nome, frase, sexo }} />
          <CounterCalorias dados={{ totalKcalHoje, gastoEnergeticoTotalDiario }} />
        </View>

        {/* PAGINA BRANCA COM OS CONTEÚDOS */}
        <View style={styles.containerBranco}>
          <TopoPaginaBranca dados={{ registros }} navigationContext={ this.props.navigation }/>
          <NenhumRegistro totalRegistros={registros.length} />
          <ListaRegistros
            registros={registros }
            extraData={this.state}
            navigationContext={this.props.navigation}
            updateListaRegistros={(novaLista) => this.setState({ registros: novaLista })}
          />
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
  containerBranco: {
    elevation: 5,
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    marginTop: -80,
    borderRadius: 10,
  },
});
