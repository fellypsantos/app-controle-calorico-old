import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Cores from '../Cores';

const novaPilha = StackActions.reset({
  index: 1,
  actions: [
    NavigationActions.navigate({ routeName: 'Home' }),
    NavigationActions.navigate({ routeName: 'Configuracoes' }, ),
  ],
});

export default class IconesTopo extends Component {
  render() {
    const { navigationContext } = this.props;

    return (
      <View style={styles.iconesTopo}>
        <TouchableOpacity
          onPress={() => navigationContext.dispatch(novaPilha)}
          style={styles.iconeTopoArea}>
          <Icon5 name="cog" size={20} color={Cores.roxoClaro}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerTopo: {
    backgroundColor: Cores.roxoNubank,
    paddingBottom: 80,
  },
  iconesTopo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  iconeTopoArea: {
    padding: 10,
  },
});