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
      <Button onPress={() => this.props.onClick('teest')} style={styles.btn}>
        <Text style={styles.textBtn}>{this.props.label}</Text>
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  btn:{
    alignSelf: 'center', 
    justifyContent: 'center', 
    width: '100%', 
    height: 50, 
    borderRadius: 25, 
    backgroundColor: variables.colors.green
  },
  textBtn:{
    fontFamily: variables.fonts.mainFont, 
    fontSize: variables.fSize.main, 
    lineHeight: 23, 
    textAlign: 'center',
    letterSpacing: 2
  }
});
