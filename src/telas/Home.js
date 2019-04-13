import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import Cores from '../Cores';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

export default class Home extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <ScrollView style={styles.container}>

        <StatusBar backgroundColor={Cores.roxoNubank} barStyle="light-content" />
        
        {/* PARTE ROXA DO TOPO */}
        <View style={styles.containerTopo}>

          <View style={styles.iconesTopo}>
            <TouchableOpacity onPress={() => null} style={styles.iconeTopoArea}>
              <Icon5 name="door-open" size={20} color={Cores.roxoClaro}/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => null}
              style={styles.iconeTopoArea}>
              <Icon5 name="cog" size={20} color={Cores.roxoClaro}/>
            </TouchableOpacity>
          </View>

          <View style={styles.areaPerfil}>
            <Image
              source={require('../../assets/images/profile.jpg')}
              style={styles.fotoPerfil}
            />
            <Text style={styles.nome}>Fellyp Karlon</Text>
            <Text style={styles.frase}>Just a guy in love with codes.</Text>
          </View>

          <View style={styles.containerContadorCalorias}>
            <View style={styles.containerInfoCalorias}>
              <Text style={styles.numeroCalorias}>1200</Text>
              <Text style={styles.labelContadorCalorias}>Mínimo</Text>
            </View>
            <View style={[styles.containerInfoCalorias, styles.containerInfoCaloriasCentro]}>
            <Text style={[styles.numeroCalorias, styles.totalConsumido]}>1714</Text>
            <Text style={styles.labelContadorCalorias}>Consumido (Kcal)</Text>
            </View>
            <View style={styles.containerInfoCalorias}>
              <Text style={styles.numeroCalorias}>2150</Text>
              <Text style={styles.labelContadorCalorias}>Mínimo</Text>
            </View>
          </View>
        </View>

        {/* PAGINA BRANCA COM OS CONTEÚDOS */}
        <View style={styles.containerBranco}>

          <View style={styles.topoContainerBranco}>
            <Text style={styles.contadorRegistos}>Já foram anotados 12 registros hoje.</Text>
            <TouchableOpacity onPress={() => null}>
              <Icon5 name="plus-circle" size={20} color={Cores.roxoNubank}/>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => alert('Mostrar dados completos do registro.')}>
            <View style={styles.registroContainer}>
              <View style={styles.registroIconeArea}>
                <Image source={require('../../assets/images/moon.png')} style={styles.registroIcone}/>
              </View>
              <View style={styles.registroDados}>
                <Text style={styles.nomeAlimento} numberOfLines={1}>Carne assada de panela + açaí bem pirão adubado</Text>
                <Text style={styles.subInfo}>Alimentação | 22h34</Text>
                <Text style={styles.subInfo}>594 kcal</Text>
              </View>
              <Icon5 name='smile' size={15} color={Cores.roxoNubank}/>
            </View>
          </TouchableOpacity>

          {/* <View style={styles.areaNenhumRegistro}>
            <Icon5 name='mug-hot' size={30} />
            <Text style={styles.txtNenhumRegistro}>Nada até o momento.</Text>
          </View> */}

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
  iconesTopo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  iconeTopoArea: {
    padding: 10,
  },

  areaPerfil: {
    alignItems: 'center'
  },
  fotoPerfil: {
    borderWidth: 2,
    borderColor: Cores.roxoClaro,
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  nome: {
    fontFamily: 'Open Sans Regular',
    fontSize: 25,
    color: Cores.roxoClaro,
    marginBottom: 5,
  },
  frase: {
    fontFamily: 'Open Sans Light',
    color: Cores.roxoClaro,
    fontStyle: 'italic',
    fontSize: 12
  },

  containerContadorCalorias: {
    flexDirection: 'row',
    marginTop: 25,
    marginBottom: 25
  },
  containerInfoCalorias: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  containerInfoCaloriasCentro: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Cores.roxoClaro,
  },
  numeroCalorias: {
    fontSize: 20,
    fontFamily: 'Open Sans Regular',
    color: Cores.roxoClaro,
    marginBottom: 5
  },
  totalConsumido: {
    fontFamily: 'Open Sans Bold',
    fontSize: 30,
    color: Cores.roxoClaro,
  },
  labelContadorCalorias: {
    fontFamily: 'Open Sans Regular',
    fontSize: 12,
    color: Cores.roxoClaro,
  },

  containerBranco: {
    elevation: 5,
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    marginTop: -80,
    borderRadius: 10,
  },
  topoContainerBranco: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contadorRegistos: {
    fontSize: 15,
    fontFamily: 'Open Sans Regular',
    color: "#545454"
  },

  registroContainer: {
    // backgroundColor: '#aaa',
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

  areaNenhumRegistro: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  txtNenhumRegistro: {
    padding: 20,
  }
});
