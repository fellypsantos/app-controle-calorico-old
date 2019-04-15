import SQLite from 'react-native-sqlite-storage';
import { Alert } from 'react-native';

export default class DataBase {

  static db = null;

  static open() {
    if (this.db == null) {
      this.db = SQLite.openDatabase({name : 'appDB', createFromLocation : '~dados.sqlite'},
        () => console.log('Banco aberto.'),
        (err) => Alert.alert('PUTZ!', 'Erro ao abrir o banco de dados.\n', err),
      );
    }
    return this.db;
  }

  static getDadosPerfil(callback) {
    this.db.transaction((tx) => {
      tx.executeSql('SELECT * FROM perfil WHERE id = ?', [1], (tx, results) => {
        callback(results);
      });
    });
  }

  static updateDadosPerfil(newValues, callback) {
    const sql = 'UPDATE perfil SET nome=?, frase=?, peso=?, altura=?, idade=?, sexo=?, fator_atividade=?, last_run=? WHERE id=?';

    this.db.transaction((tx) => {
      tx.executeSql(sql, newValues, (tx, results) => {
        callback(results);
      });
    });
  }

  static updateComponentState(dados, component) {
    component.setState({
      nome: dados.nome,
      frase: dados.frase,
      peso: dados.peso.toString(),
      altura: dados.altura.toString(),
      idade: dados.idade.toString(),
      sexo: dados.sexo,
      fatorAtividade: dados.fator_atividade,
    });
  }

  static getRegistros(filtro, callback) {
    const sql = 'SELECT * FROM registros';

    this.db.transaction((tx) => {
      tx.executeSql(sql, [], (tx, results) => {
        callback(results);
      });
    });
  }
}
