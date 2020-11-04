import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'native-base';

import styles from './styles';

export default class LinkBtn extends Component {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onClick()} style={styles.button}>
        <Text uppercase={false} style={styles.buttonTxt}>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }
}

