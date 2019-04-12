import { createStackNavigator, createAppContainer } from 'react-navigation';
import TelaInicio from './src/telas/Inicio';
import Configuracoes from './src/telas/Configuracoes';
import Home from './src/telas/Home';

const AppNavigator = createStackNavigator({
  TelaInicio: {screen: TelaInicio},
  Configuracoes: {screen: Configuracoes},
  Home: {screen: Home}
});

export default createAppContainer(AppNavigator);
