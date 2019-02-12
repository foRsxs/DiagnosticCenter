import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button } from 'native-base';
import variables from '../../styles/variables'

import { MAIN_FONT, COLOR_BLUE, RED } from '../../styles/constants';

export default class CustomBtn extends Component {

  colorBtn(val) {
    return (val === 'blue') ? COLOR_BLUE : RED;
  }

  render() {
    return (
      <Button onPress={() => this.props.onClick('teest')} style={[styles.btn, this.props.contentContainerStyle, { backgroundColor: this.colorBtn(this.props.color) }]}>
        <Text style={styles.textBtn}>{this.props.label.toUpperCase()}</Text>
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 25,
  },
  textBtn: {
    fontFamily: MAIN_FONT,
    fontSize: variables.fSize.medium,
    textAlignVertical: 'center',
    textAlign: 'center',
    letterSpacing: 2
  }
});
