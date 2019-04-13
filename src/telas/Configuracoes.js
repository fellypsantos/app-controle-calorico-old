import React, {Component} from 'react';
import { StyleSheet, Text, ScrollView, Button} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

const resetAction = StackActions.reset({
  index: 0,
  key: null,
  actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

export default class Configuracoes extends Component {
  static navigationOptions = {
    title: 'Configurações',
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#7F22A7'
    },
    headerTintColor: '#fff'
  };

  render() {
    return (
      <ScrollView style={styles.fundo}>
        
        <View>
          <Text>Label</Text>
          <View>
            
          </View>
        </View>

        {/* <Button
          title="Salvar"
          onPress={() => { this.props.navigation.dispatch(resetAction) }}
        /> */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  fundo: {
    backgroundColor: '#E6E6E6'
  }
});