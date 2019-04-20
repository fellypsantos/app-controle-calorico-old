import { createStackNavigator, createAppContainer } from 'react-navigation';
import TelaInicio from './src/telas/Inicio';
import Configuracoes from './src/telas/Configuracoes';
import Home from './src/telas/Home';
import MeusRegistros from './src/telas/MeusRegistros';
import NovoRegistro from './src/telas/NovoRegistro';

const AppNavigator = createStackNavigator({
  TelaInicio: {screen: TelaInicio},
  Home: {screen: Home},
  Configuracoes: {
    screen: Configuracoes,
    navigationOptions: {
      title: 'Configurações'
    }
  },
  MeusRegistros: {
    screen: MeusRegistros,
    navigationOptions: {
      title: 'Meus Registros'
    }
  },
  NovoRegistro: {
    screen: NovoRegistro,
    navigationOptions: ({ navigation }) => ({
      title: (navigation.getParam('itemEditar') != undefined) ? 'Editar registro' : 'Novo registro alimentar',
    })
  },
}, {
  initialRouteName: 'TelaInicio',
  defaultNavigationOptions: {
    headerStyle: { backgroundColor: '#7F22A7' },
    headerTintColor: '#fff',
  }
});

export default createAppContainer(AppNavigator);
