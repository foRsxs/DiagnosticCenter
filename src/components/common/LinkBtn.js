import React, {Component} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import {Text} from 'native-base';
import colors from '../../styles/variables'

export default class LinkBtn extends Component {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onClick()} style={{ alignSelf: 'center', justifyContent: 'center', width: '100%', marginBottom: 40}}>
        <Text uppercase={false} style={{color: colors.darkBlue, fontSize: 18, textAlign: 'center'}}>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }
}