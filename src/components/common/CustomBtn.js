import React, {Component} from 'react';
import {
  Alert,
  StyleSheet,
  View,
} from 'react-native';
import {Text, Button} from 'native-base';
import variables from '../../styles/variables'

export default class CustomBtn extends Component {
  render() {
    return (
      <Button onPress={() => this.props.onClick('teest')} style={[styles.btn, this.props.contentContainerStyle]}>
        <Text style={styles.textBtn}>{this.props.label.toUpperCase()}</Text>
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  btn:{
    alignSelf: 'center', 
    justifyContent: 'center', 
    width: '100%', 
    paddingTop: 12,
    paddingBottom: 12, 
    borderRadius: 25, 
    backgroundColor: variables.colors.red
  },
  textBtn:{
    fontFamily: variables.fonts.mainFont, 
    fontSize: variables.fSize.medium, 
    textAlignVertical: 'center',
    textAlign: 'center',
    letterSpacing: 2
  }
});
