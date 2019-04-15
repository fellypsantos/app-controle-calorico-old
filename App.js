import { createStackNavigator, createAppContainer } from 'react-navigation';
import TelaInicio from './src/telas/Inicio';
import Configuracoes from './src/telas/Configuracoes';
import Home from './src/telas/Home';
import NovoRegistro from './src/telas/NovoRegistro';

const AppNavigator = createStackNavigator({
  TelaInicio: {screen: TelaInicio},
  Configuracoes: {screen: Configuracoes},
  Home: {screen: Home},
  NovoRegistro: {screen: NovoRegistro},
});

export default createAppContainer(AppNavigator);
