import React, {Component} from 'react';
import {
  Alert,
  StyleSheet,
  View,
} from 'react-native';
import {Text, Button} from 'native-base';

export default class CustomBtn extends Component {
  render() {
    return (
      <Button onPress={() => this.props.onClick()} style={{alignSelf: 'center', justifyContent: 'center', width: '100%', height: 50, borderRadius: 25, backgroundColor: '#13CE67', ...this.props.style}}>
        <Text style={{fontFamily:'HalveticaNeue', fontSize: 20, lineHeight: 23, textAlign: 'center', ...this.props.styleText}}>{this.props.label}</Text>
      </Button>
    );
  }
}