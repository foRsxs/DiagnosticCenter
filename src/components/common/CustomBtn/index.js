import React, { Component } from 'react';
import { Text, Button } from 'native-base';

import { COLOR_BLUE, RED } from '../../../styles/constants';
import styles from './styles';

export default class CustomBtn extends Component {

  colorBtn(val) {
    return (val === 'blue') ? COLOR_BLUE : RED;
  }

  render() {
    return (
      <Button 
        disabled={this.props.disabled} 
        onPress={() => this.props.onClick('')} 
        style={[styles.btn, this.props.contentContainerStyle, { backgroundColor: this.colorBtn(this.props.color), opacity: (this.props.disabled) ? 0.5 : 1 }]}
      >
        <Text style={styles.textBtn}>{this.props.label.toUpperCase()}</Text>
      </Button>
    );
  }
}
