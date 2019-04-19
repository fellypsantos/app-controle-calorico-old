import React, { Component } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, Alert, ToastAndroid, StyleSheet } from 'react-native';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import Cores from '../Cores';
import DataBase from '../DataBase'

DataBase.open();

let icones = Array();

icones['sunrise'] = require('../../assets/images/sunrise.png');
icones['sun'] = require('../../assets/images/sun.png');
icones['moon'] = require('../../assets/images/moon.png');

export default class ListaRegistros extends Component {
  btnExcluirRegistro(item, registros) {
    const { updateListaRegistros } = this.props;

    return {
      text: "Excluir", onPress: () => {
        Alert.alert('Cuidado', `Quer mesmo remover esse item?\n• ${item.titulo}`, [
          { text: 'Cancelar', onPress: () => null },
          { text: 'Sim, quero apagar' , onPress: () => {
            DataBase.deletarRegistro(item.id, results => {
              if (results.rowsAffected > 0) {
                let novaListaRegistros = registros.filter(itemRegistro => (itemRegistro.id == item.id) ? false : true);
                updateListaRegistros(novaListaRegistros);
                ToastAndroid.show('Registro removido com sucesso', ToastAndroid.SHORT);
              }
              else {
                Alert.alert('Falha.', 'Erro ao apagar o registro :(');
              }
            });
          }}
        ]);
      }
    }
  }

  btnEditarRegistro(item) {
    const { navigationContext } = this.props;

    return {
      text: "Editar",
      onPress: () => {
        navigationContext.navigate('NovoRegistro', { itemEditar: item });
      }
    }
  }

  btnFechar() {
    return { text: "Fechar", onPress: () => null };
  }

  renderItemRegistro(item, registros) {
    return (
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            'Detalhes do registro',
            `Nome: ${item.titulo}\nCalorias: ${item.kcal} kcal\nHora: ${moment(item.timestamp).format('HH\\h mm').replace(' ', '')}`,
            [
              this.btnExcluirRegistro(item, registros),
              this.btnEditarRegistro(item),
              this.btnFechar(),
            ]
          );
        }
      }>
        <View style={styles.registroContainer}>
          <View style={styles.registroIconeArea}>
            <Image source={icones[item.icone]} style={styles.registroIcone}/>
          </View>
          <View style={styles.registroDados}>
            <Text style={styles.nomeAlimento} numberOfLines={1}>{ item.titulo }</Text>
            <Text style={styles.subInfo}>{item.tipo} | { moment(item.timestamp).format('HH\\h mm').replace(' ', '') }</Text>
            <Text style={styles.subInfo}>{item.kcal} kcal</Text>
          </View>
          <Icon5 name='smile' size={15} color={Cores.roxoNubank}/>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { registros, extraData } = this.props;

    return (
      <FlatList
        inverted
        data={registros}
        extraData={extraData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => this.renderItemRegistro(item, registros)}
      />
    );
  }
}

const styles = StyleSheet.create({
  registroContainer: {
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
});
