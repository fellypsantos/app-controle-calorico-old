import React, {Component} from 'react';
import { StyleSheet, Text, ScrollView, View, TextInput, Picker, TouchableOpacity} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Cores from '../Cores';

// const resetAction = StackActions.reset({
//   index: 0,
//   key: null,
//   actions: [NavigationActions.navigate({ routeName: 'Home' })],
// });

export default class Configuracoes extends Component {
  static navigationOptions = {
      title: 'Configurações',
      headerLeft: null,
      headerStyle: {
        backgroundColor: '#7F22A7'
      },
      headerTintColor: '#fff',
  };

  _verificarDados() {
    alert('Verificar dados...');
  }

  render() {
    return (
      <ScrollView style={styles.fundo}>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Peso (Kg)</Text>
          <View style={styles.inputArea}>
            <Icon name="question-circle" size={20} color="#aaa" />
            <TextInput style={styles.inputText} keyboardType="numeric"/>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Altura (cm)</Text>
          <View style={styles.inputArea}>
            <Icon name="question-circle" size={20} color="#aaa" />
            <TextInput style={styles.inputText} keyboardType="numeric"/>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Idade</Text>
          <View style={styles.inputArea}>
            <Icon name="question-circle" size={20} color="#aaa" />
            <TextInput style={styles.inputText} keyboardType="numeric"/>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Atividade Física</Text>
          <View style={styles.pickerArea}>
            <Picker selectedValue="Sedentário">
              <Picker.Item label="Sedentário" value="Sedentário"/>
              <Picker.Item label="Exercício leve" value="Exercício leve"/>
              <Picker.Item label="Exercício moderado" value="Exercício moderado"/>
            </Picker>
          </View>
        </View>

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
    paddingBottom: 25,
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
    padding: 8,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtBotaoSalvar: {
    color: Cores.roxoClaro,
    fontSize: 20,
    paddingLeft: 10,
  }
});