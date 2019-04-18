import React, {Component} from 'react';
import { Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserInput from '../components/UserInput';
import UserPicker from '../components/UserPicker';
import FormStyle from '../components/FormStyle';

import DataBase from '../DataBase'

DataBase.open();

const SEXOS = [
  { label: 'Masculino', value: 'M' },
  { label: 'Feminino', value: 'F' }
];

const FATOR_ATIVIDADE = [
  { label: 'Sedentário (Pouco ou nenhum exercício)', value: 1.2 },
  { label: 'Levemente ativo (Exercício leve, 1 a 3 dias/semana)', value: 1.375},
  { label: 'Moderadamente ativo (Esportes 3 a 5 dias/semana)', value: 1.55},
  { label: 'Muito ativo (Exercicio itenso 5 a 6 dias/semana)', value: 1.725 },
  { label: 'Extremamente ativo (Exercício intenso diário)', value: 1.9}
];

const novaPilha = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home' }),
  ],
});


export default class Configuracoes extends Component {
  static navigationOptions = {
      title: 'Configurações',
      // headerLeft: null,
      headerStyle: {
        backgroundColor: '#7F22A7'
      },
      headerTintColor: '#fff',
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
      fatorAtividade: '1.2'
    }

    this.handleTextInput = this.handleTextInput.bind(this);
    this.atualizarStateDataBase = this.atualizarStateDataBase.bind(this);
  }

  componentDidMount() {
    this.atualizarStateDataBase();
  }

  atualizarStateDataBase() {
    DataBase.getDadosPerfil((results) => {
      if ( results.rows.item(0).last_run !== null ) {
        // já existe configuração, carregar...
        const perfil = results.rows.item(0);
        DataBase.updateComponentState(perfil, this);
      }
    });
  }
  
  verificarDados() {
    let { nome, frase, peso, altura, idade } = this.state;
    let itensErrados = [];
    
    peso = parseFloat( peso.replace(',', '.'));

    if(nome.length == 0) {
      console.log('Nome vazio.');
      itensErrados.push('Nome');
    }

    if(frase.length == 0) {
      console.log('Frase vazia.');
      itensErrados.push('Frase');
    }
    
    if(isNaN( peso ) || !(peso > 10 && peso <= 400)) {
      console.log('Corrija o peso.');
      itensErrados.push('Peso');
    }

    if (isNaN( altura ) || !( altura > 50 && altura <= 350 )) {
      console.log('Corrija a altura.');
      itensErrados.push('Altura');
    }

    if (isNaN( idade ) || !( idade > 6 && idade <= 150 )) {
      console.log('Corrija a idade.');
      itensErrados.push('Idade');
    }

    (itensErrados.length > 0)
    ? Alert.alert('Ops! Temos um problema...', 'Corrija os campos abaixo, antes de salvar.\n\n' + itensErrados.join(', '))
    : this.confirmaConfiguracao();
  }

  salvarDataBase() {
    const { nome, frase, peso, altura, idade, sexo, fatorAtividade } = this.state;

    DataBase.updateDadosPerfil(
      [nome, frase, peso, altura, idade, sexo, fatorAtividade, new Date().getTime(), 1],
      (results) => {
        console.log('resultado updateDadosPerfil: ', results);
        Alert.alert('Ótimo!', "As informações foram salvas.", [
          { text: 'Continuar', onPress: () => this.props.navigation.dispatch(novaPilha) }
        ], { cancelable: false })
      }
    );
  }

  confirmaConfiguracao() {
    Alert.alert('Quase lá.', "Salvar os dados informados?", [
      { text: 'Cancelar', onPress: () => null, style: 'cancel'},
      { text: 'Sim, salvar', onPress: () => {
        this.salvarDataBase();
        }
      },
    ]);
  }

  handleTextInput(itemState, value) {
    this.setState({ [itemState]: value });
  }

  handlePicker(itemState, newValue) {
    this.setState({ [itemState]: newValue });
  }

  render() {
    const { nome, frase, peso, altura, idade, sexo, fatorAtividade } = this.state;

    return (
      <ScrollView style={FormStyle.fundo}>

        <UserInput
          label="Nome do perfil"
          value={nome}
          keyboardType="default"
          onChangeText={(text) => this.handleTextInput("nome", text)} />

        <UserInput
          label="Sua frase de perfil"
          value={frase}
          keyboardType="default"
          onChangeText={(text) => this.handleTextInput("frase", text)} />

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

        <TouchableOpacity onPress={() => this.verificarDados()} style={FormStyle.botaoSalvar}>
          <Icon name="check" size={20} color='#fff'/>
          <Text style={FormStyle.txtBotaoSalvar}>SALVAR</Text>
        </TouchableOpacity>

      </ScrollView>
    );
  }
}
