import React, {Component} from 'react';
import { StyleSheet, Text, ScrollView, View, TextInput, Picker, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Cores from '../Cores';

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
      classificacao: '',
    }
  }

  verificarDados() {
    alert('Verificar dados...');
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
            <Picker selectedValue="Alimentação leve">
              {
                pickerOptions.map(item => <Picker.Item label={item.nome} value={item.nome}/>)
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