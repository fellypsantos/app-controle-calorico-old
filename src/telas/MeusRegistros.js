import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
  ToastAndroid,
  ScrollView
} from "react-native";
import Cores from "../Cores";
import Icon from "react-native-vector-icons/FontAwesome";
import { FlatList } from "react-native-gesture-handler";
import DataBase from "../DataBase";
import Loading from "../components/Loading";
import NenhumRegistro from "../components/NenhumRegistro";

DataBase.open();

export default class MeusRegistros extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <View style={styles.areaIconesHeader}>
          <TouchableOpacity
            style={styles.iconeHeader}
            onPress={() => navigation.navigate("NovoRegistro")}
          >
            <Icon name="plus" size={20} color={Cores.roxoClaro} />
          </TouchableOpacity>
        </View>
      )
    };
  };

  constructor() {
    super();
    this.state = {
      textoBusca: "",
      carregandoHistorico: true,
      historicoRegistros: []
    };

    this.carregarHistoricoRegistros = this.carregarHistoricoRegistros.bind(
      this
    );
    this.controleExibicaoHistoricoRegistros = this.controleExibicaoHistoricoRegistros.bind(
      this
    );
  }

  carregarHistoricoRegistros() {
    DataBase.getHistoricoRegistros(historico => {
      let dbHistorico = [];
      for (let i = 0; i < historico.rows.length; i++) {
        dbHistorico.push(historico.rows.item(i));
      }

      this.setState({
        carregandoHistorico: false,
        historicoRegistros: dbHistorico
      });
    });
  }

  componentDidMount() {
    this.props.navigation.setParams({ testeHeader: this.testeHeader });

    this.props.navigation.addListener("willFocus", payload => {
      this.carregarHistoricoRegistros();
    });
  }

  limpaCampoBusca() {
    this.setState({ textoBusca: "" });
  }

  enviaNovoRegistro(item) {
    this.props.navigation.navigate("NovoRegistro", { itemDoHistorico: item });
  }

  clickRegistroHistorico(item) {
    Alert.alert("Ótimo", `O que faremos com esse alimento?\n\n• ${item.nome}`, [
      {
        text: "Remover",
        onPress: () => {
          Alert.alert(
            "Atenção!",
            "Você vai remover um item do seu histórico, isso não afeta seu consumo diário, apenas sua lista de comidas. Continuar?",
            [
              { text: "Cancelar", onPress: () => null },
              {
                text: "Sim, apagar",
                onPress: () => {
                  DataBase.apagarRegistroDoHistorico(item.id, results => {
                    if (results.rowsAffected > 0) {
                      this.carregarHistoricoRegistros();
                      ToastAndroid.show(
                        "Alimento removido da sua lista.",
                        ToastAndroid.SHORT
                      );
                    } else {
                      ToastAndroid.show(
                        "Erro ao remover o item do histórico.",
                        ToastAndroid.SHORT
                      );
                    }
                  });
                }
              }
            ]
          );
        }
      },
      { text: "Acabei de ingerir", onPress: () => this.enviaNovoRegistro(item) }
    ]);
  }

  controleExibicaoHistoricoRegistros() {
    const { textoBusca, historicoRegistros } = this.state;

    if (textoBusca != "") {
      let resultadoFiltro = historicoRegistros.filter(item => {
        return item.nome.toLowerCase().search(textoBusca.toLowerCase()) > -1
          ? true
          : false;
      });

      return resultadoFiltro;
    } else {
      return historicoRegistros;
    }
  }

  render() {
    const { textoBusca, carregandoHistorico, historicoRegistros } = this.state;

    return (
      <View style={carregandoHistorico ? { flex: 1 } : null}>
        <StatusBar
          backgroundColor={Cores.roxoNubank}
          barStyle="light-content"
        />

        {carregandoHistorico ? (
          <Loading
            texto="Carregando histórico..."
            corLoading={Cores.roxoNubank}
          />
        ) : (
          <ScrollView>
            {/* CAMPO DE BUSCA */}
            <View style={styles.containerTopoBusca}>
              <View style={styles.areaBusca}>
                <View style={styles.icone}>
                  <Icon name="search" size={15} />
                </View>
                <TextInput
                  style={styles.inputBusca}
                  placeholder="Encontre um registro..."
                  value={textoBusca}
                  onChangeText={text => this.setState({ textoBusca: text })}
                />
                <TouchableOpacity
                  style={styles.btnLimparBusca}
                  onPress={() => this.setState({ textoBusca: "" })}
                >
                  <View>
                    <Icon name="window-close" size={15} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <NenhumRegistro totalRegistros={historicoRegistros.length} />

            {/* LISTA DE REGISTROS */}
            <View>
              <FlatList
                inverted
                data={this.controleExibicaoHistoricoRegistros()}
                extraData={this.state}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.itemHistoricoRegistros}
                    onPress={() => this.clickRegistroHistorico(item)}
                  >
                    <View style={styles.iconeRegistro}>
                      <Image
                        source={require("../../assets/images/food.png")}
                        style={{ width: 50, height: 50 }}
                      />
                    </View>
                    <View>
                      <Text style={styles.nome}>{item.nome}</Text>
                      <Text style={styles.subInfo}>{item.kcal} kcal</Text>
                      <Text style={styles.subInfo}>{item.tipo} </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  areaIconesHeader: {
    flexDirection: "row"
  },
  iconeHeader: {
    padding: 10,
    marginRight: 5
  },

  containerTopoBusca: {
    backgroundColor: "#efefef"
  },
  areaBusca: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  icone: {
    paddingLeft: 10,
    paddingRight: 10
  },
  inputBusca: {
    flex: 1,
    color: "#545454",
    fontFamily: "Open Sans Regular",
    fontSize: 15
  },
  btnLimparBusca: {
    padding: 15
  },

  itemHistoricoRegistros: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#efefef",
    paddingTop: 10,
    paddingBottom: 10
  },
  iconeRegistro: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginLeft: 15,
    marginRight: 15
  },
  nome: {
    fontFamily: "Open Sans Regular",
    fontSize: 18
  },
  subInfo: {
    fontFamily: "Open Sans Regular",
    fontSize: 13
  }
});
