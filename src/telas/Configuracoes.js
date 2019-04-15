import React, {Component} from 'react';
import { Text, ScrollView, TouchableOpacity, Alert, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserInput from '../components/UserInput';
import UserPicker from '../components/UserPicker';
import FormStyle from '../components/FormStyle';

import SQLite from 'react-native-sqlite-storage';


let db = SQLite.openDatabase({name : 'appDB', createFromLocation : '~dados.sqlite'},
  () => console.log('Abrido com sucesso hihi'),
  (err) => console.log('Erro ao abrir: ', err),
);

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
    // this.salvarDataBase = this.salvarDataBase.bind(this);
  }

  componentDidMount() {
    // db.transaction((tx) => {
    //   tx.executeSql('INSERT INTO usuario (nome, frase) VALUES(?, ?);', ['Outro Gato', 'Miaaaw'], (tx, results) => {
    //     console.log('resultado INSERT:' , results);
    //   })
    // });

    this.atualizarStateDataBase();
  }

  atualizarStateDataBase() {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM perfil', [], (tx, results) => {
        if ( results.rows.length ) {
          console.log('Já existe configuração, carregar...');
          let dadosUsuario = results.rows.item(0);

          this.setState({
            nome: dadosUsuario.nome,
            frase: dadosUsuario.frase,
            peso: dadosUsuario.peso.toString(),
            altura: dadosUsuario.altura.toString(),
            idade: dadosUsuario.idade.toString(),
            sexo: dadosUsuario.sexo,
            fatorAtividade: dadosUsuario.fator_atividade,
          });
        }
        else {
          console.log('Perfil vazio.');
        }
      })
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
    const sql = 'UPDATE perfil SET nome=?, frase=?, peso=?, altura=?, idade=?, sexo=?, fator_atividade=? WHERE id=?';
    const values = [nome, frase, peso, altura, idade, sexo, fatorAtividade, 1];
    db.transaction((tx) => {
      tx.executeSql(sql, values, (tx, results) => {
        console.log('resultado salvarDataBase: ', results);
        Alert.alert('Ótimo!', "As informações foram salvas.", [
          { text: 'Continuar', onPress: () => this.props.navigation.navigate('Home') }
        ], { cancelable: false })
      });
    });
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

        <Button title="INSERT" onPress={() => {
          const sql = 'INSERT INTO perfil(nome, frase, foto, peso, altura, idade, sexo, fator_atividade) VALUES(?,?,?,?,?,?,?,?)';
          const values = ['Lyp', 'uma frase marcante', 'base64fotoData', 72.5, 164, 23, 'M', 1.375];

          db.transaction((tx) => {
            tx.executeSql(sql, values, (tx, results) => {
              console.log('resultado INSERT: ', results);

              this.atualizarStateDataBase();
            })
          });
        }}/>

        <Button title="UPDATE" onPress={() => {
          const sql = 'UPDATE perfil SET nome = ?, fator_atividade = ? WHERE id = ?';
          const values = ['Fellyp Karlon', 1.2, 1];

          db.transaction((tx) => {
            tx.executeSql(sql, values, (tx, results) => {
              console.log('resultado UPDATE: ', results);
              this.atualizarStateDataBase();
            })
          });
        }}/>

        <Button title="CLEAR TABLE" onPress={() => {

          const sql = 'UPDATE perfil SET nome=?, frase=?, peso=?, altura=?, idade=?, sexo=?, fator_atividade=? WHERE id=?';
          const values = ['', '', 0, 0, 0, 'M', 1.2, 1];

          db.transaction((tx) => {
            tx.executeSql(sql, values, (tx, results) => {
              console.log('resultado CLEAR TABLE: ', results);
            });
          });
        }}/>
        

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

        {/* <Button
          title="Salvar"
          onPress={() => { this.props.navigation.dispatch(resetAction) }}
        /> */}
      </ScrollView>
    );
  }
}
