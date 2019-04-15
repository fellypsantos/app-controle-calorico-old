import SQLite from 'react-native-sqlite-storage';
import { Alert } from 'react-native';

export default class DataBase {

  static db = null;

  static open() {
    
    /**
     * CONFIGURAÇÃO SINGLETON
     */
    if (this.db == null) {
      this.db = SQLite.openDatabase({name : 'appDB', createFromLocation : '~dados.sqlite'},
        () => console.log('Banco aberto.'),
        (err) => Alert.alert('PUTZ!', 'Erro ao abrir o banco de dados.\n', err),
      );
    }
    return this.db;
  }
}
