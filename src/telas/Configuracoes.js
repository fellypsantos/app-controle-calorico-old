import React, {Component} from 'react';
import { StyleSheet, Text, ScrollView, View, TextInput, Picker, TouchableOpacity} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Cores from '../Cores';
import UserInput from '../components/UserInput';
import UserPicker from '../components/UserPicker';

// const resetAction = StackActions.reset({
//   index: 0,
//   key: null,
//   actions: [NavigationActions.navigate({ routeName: 'Home' })],
// });

const SEXOS = [
  { label: 'Masculino', value: 'M' },
  { label: 'Feminino', value: 'F' }
]

const FATOR_ATIVIDADE = [
  { label: 'Sedentário (Pouco ou nenhum exercício)', value: 1.2 },
  { label: 'Levemente ativo (Exercício leve, 1 a 3 dias/semana)', value: 1.375},
  { label: 'Moderadamente ativo (Esportes 3 a 5 dias/semana)', value: 1.55},
  { label: 'Muito ativo (Exercicio itenso 5 a 6 dias/semana)', value: 1.725 },
  { label: 'Extremamente ativo (Exercício intenso diário)', value: 1.9}
];

export default class Configuracoes extends Component {
  static navigationOptions = {
      title: 'Configurações',
      headerLeft: null,
      headerStyle: {
        backgroundColor: '#7F22A7'
      },
      headerTintColor: '#fff',
  };

  constructor() {
    super();
    this.state = {
      peso: '72',
      altura: '164',
      idade: '23',
      sexo: 'M',
      fatorAtividade: '1.2'
    }

    this.handleTextInput = this.handleTextInput.bind(this);
  }

  _verificarDados() {
    alert('Verificar dados...');
  }

  handleTextInput(itemState, value) {
    this.setState({ [itemState]: value });
  }

  handlePicker(itemState, newValue) {
    this.setState({ [itemState]: newValue });
  }

  render() {
    const { peso, altura, idade, sexo, fatorAtividade } = this.state;

    return (
      <ScrollView style={styles.fundo}>

        <UserInput
          label="Peso (Kg)"
          value={peso}
          keyboardType="numeric"
          onChangeText={(text) => this.handleTextInput("peso", text)} />

        <UserInput
          label="Altura (cm)"
          value={altura}
          keyboardType="numeric"
          onChangeText={(text) => this.handleTextInput("altura", text)} />

        <UserInput
          label="Idade"
          value={idade}
          keyboardType="numeric"
          onChangeText={(text) => this.handleTextInput("idade", text)} />

        <UserPicker
          label="Sexo"
          value={sexo}
          options={SEXOS}
          onValueChange={(newValue) => this.handlePicker("sexo", newValue)}/>

          <UserPicker
          label="O que se considera?"
          value={fatorAtividade}
          options={FATOR_ATIVIDADE}
          onValueChange={(newValue) => this.handlePicker("fatorAtividade", newValue)}/>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={styles.botaoSalvar}>
          <Icon name="check" size={20} color='#fff'/>
          <Text style={styles.txtBotaoSalvar}>SALVAR</Text>
        </TouchableOpacity>

        {/* <Button
          title="Salvar"
          onPress={() => { this.props.navigation.dispatch(resetAction) }}
        /> */}
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