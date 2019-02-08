import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';

import variables from '../../styles/variables'

import { DARK_BLUE, MAIN_FONT } from '../../styles/constants';

export default class LinkBtn extends Component {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onClick()} style={styles.button}>
        <Text uppercase={false} style={styles.buttonTxt}>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
    marginTop: 20
  },
  buttonTxt: {
    color: DARK_BLUE,
    fontFamily: MAIN_FONT,
    fontSize: variables.fSize.main,
    textAlign: 'center'
  }
});
