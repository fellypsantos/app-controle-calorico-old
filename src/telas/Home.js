import React, {Component} from 'react';
import {Text, View, Button, ScrollView, StyleSheet, StatusBar} from 'react-native';
import Cores from '../Cores';

export default class Home extends Component {
  static navigationOptions = {
    title: 'Tela Principal',
  };

  render() {
    return (
      <ScrollView style={styles.container}>

        <StatusBar backgroundColor={Cores.roxoNubank} barStyle="light-content" />

        

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc'
  }
});
