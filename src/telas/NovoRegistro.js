import React, {Component} from 'react';
import { StyleSheet, Text, ScrollView, View, TextInput, Picker, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Cores from '../Cores';
import DataBase from '../DataBase';

const pickerOptions = [
  { nome : 'Alimentação leve' },
  { nome : 'Alimentação moderada' },
  { nome : 'Alimentação pesada' },
]

export default class NovoRegistro extends Component {
  static navigationOptions = {
      title: 'Novo Registro',
      headerStyle: {
        backgroundColor: '#7F22A7'
      },
      headerTintColor: '#fff',
  };

  constructor() {
    super();
    this.state = {
      nomeAlimento: '',
      totalKcal: '',
      classificacao: pickerOptions[0].nome,
    }
  }

  getIcone(timestamp) {
    const hora = new Date(timestamp).getHours();
    if ( hora >= 0 && hora < 6 ) return 'moon';
    if ( hora >= 6 && hora < 12 ) return 'sunrise';
    if ( hora >= 12 && hora < 18 ) return 'sun';
    if ( hora >= 18 && hora <= 23 ) return 'moon';
  }

  verificarDados() {
    const { nomeAlimento, totalKcal, classificacao } = this.state;
    let itensInvalidos = [];

    if (!nomeAlimento) { itensInvalidos.push('O que comeu?') };
    if (isNaN( parseInt( totalKcal )) ) { itensInvalidos.push('Quantas calorias?') };

    if ( itensInvalidos.length ) {
      Alert.alert('Ops!', `Corrija os campos: \n- ${ itensInvalidos.join('\n- ') }`);
      return;
    }

    // persistir dados
    timestamp_now = new Date().getTime();

    const registro = {
      titulo: nomeAlimento,
      tipo: classificacao,
      timestamp: timestamp_now,
      kcal: totalKcal,
      icone: this.getIcone(timestamp_now)
    }

    Alert.alert('Quase lá!', 'Salvar esse registro?', [
      { text: 'Cancelar', onPress: null },
      { text: 'Sim, salvar', onPress: () => {
        DataBase.addRegistro(registro, results => {
          console.log('addRegistro', results);
          if(results.rowsAffected == 1) {
            Alert.alert('Tudo certo', 'Registro foi salvo, não esqueça de anotar os próximos.', [
              { text: "OK", onPress: () => {
                  this.setState({
                    nomeAlimento: '',
                    totalKcal: '',
                    classificacao: pickerOptions[0].nome,
                  });
                  this.props.navigation.goBack();
                }
              }
            ]);
          };
        });        
      }}
    ]);
  }

  render() {
    const { nomeAlimento, totalKcal, classificacao } = this.state;

    return (
      <ScrollView style={styles.fundo}>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>O que comeu?</Text>
          <View style={styles.inputArea}>
            <Icon name="question-circle" size={20} color="#aaa" />
            <TextInput
              style={styles.inputText}
              keyboardType="default"
              value={nomeAlimento}
              onChangeText={(text) => this.setState({ nomeAlimento: text })}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Quantas calorias?</Text>
          <View style={styles.inputArea}>
            <Icon name="question-circle" size={20} color="#aaa" />
            <TextInput
              style={styles.inputText}
              keyboardType="numeric"
              value={totalKcal}
              onChangeText={(text) => this.setState({ totalKcal: text })}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Como classificaria?</Text>
          <View style={styles.pickerArea}>
            <Picker
              selectedValue={ classificacao }
              onValueChange={(newValue) => this.setState({ classificacao: newValue })}
            >
              {
                pickerOptions.map(item => <Picker.Item label={item.nome} value={item.nome} key={item.nome} />)
              }
            </Picker>
          </View>
        </View>

        <TouchableOpacity onPress={() => this.verificarDados()} style={styles.botaoSalvar}>
          <Icon name="check" size={20} color='#fff'/>
          <Text style={styles.txtBotaoSalvar}>SALVAR</Text>
        </TouchableOpacity>
        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  fundo: {
    backgroundColor: '#E6E6E6',
    paddingBottom: 50,
  },
  inputContainer: {
    padding: 25,
    paddingBottom: 0,
  },
  inputLabel: {
    color: Cores.roxoNubank,
    fontSize: 25,
    marginBottom: 10,
  },
  inputArea: {
    borderWidth: 1,
    borderColor: '#747474',
    backgroundColor: '#F1F1F1',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  inputText: {
    flex: 1,
    fontSize: 20,
    paddingLeft: 15,
    color: '#545454'
  },
  pickerArea: {
    borderWidth: 1,
    borderColor: '#747474',
    borderRadius: 5,
    backgroundColor: '#F1F1F1',
    paddingLeft: 15,
    paddingRight: 15,
    color: '#545454',
  },
  botaoSalvar: {
    backgroundColor: Cores.roxoNubank,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 25,
    marginBottom: 25,
    padding: 8,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3
  },
  txtBotaoSalvar: {
    color: Cores.roxoClaro,
    fontSize: 20,
    paddingLeft: 10,
    paddingTop: 8,
    paddingBottom: 8,
  }
});
