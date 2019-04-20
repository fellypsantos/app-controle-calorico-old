import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export default class Loading extends Component {
  render() {
    const { texto, corLoading, corTexto } = this.props;

    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size="large" color={corLoading} />
        <Text style={[styles.textoLoading, {color: corTexto}]}>{texto}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoLoading: {
    fontFamily: 'Open Sans Regular',
    marginTop: 10,
  }
});
