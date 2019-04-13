import { createStackNavigator, createAppContainer } from 'react-navigation';
import TelaInicio from './src/telas/Inicio';
import Configuracoes from './src/telas/Configuracoes';
import Home from './src/telas/Home';

const AppNavigator = createStackNavigator({
  Home: {screen: Home},
  TelaInicio: {screen: TelaInicio},
  Configuracoes: {screen: Configuracoes},
});

export default createAppContainer(AppNavigator);
