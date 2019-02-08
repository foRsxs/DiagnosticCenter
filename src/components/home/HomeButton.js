import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';

import variables from '../../styles/variables'

import { ACCENT_BLUE, MAIN_FONT  } from '../../styles/constants';

class HomeButton extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    let {imageUri, keyNumber, nameBtn} = this.props;

    return (
      <View style={styles.wrapButton}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.props.onClick()}
          style={[styles.button, (keyNumber === 0)? {borderTopLeftRadius: 20}: (keyNumber === 1)? {borderTopRightRadius: 20}: (keyNumber === 2)? {borderBottomLeftRadius: 20}: {borderBottomRightRadius: 20}]}>
          <Image
            style={{marginTop: '8%', marginBottom: '5%', width: 58, height: 50}}
            source={imageUri}
          />
          <View style={styles.txtButtonWrap}>
            <Text style={styles.txtButton}>{nameBtn[0].toUpperCase()}</Text>
            <Text style={styles.txtButton}>{nameBtn[1].toUpperCase()}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapButton: {
    width: '50%',
    justifyContent: 'space-between',
    padding: 7,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: ACCENT_BLUE,
    borderRadius: 5
  },
  txtButtonWrap: {
    width: '100%', 
    height: 50,
    paddingVertical: 5
  },
  txtButton: {
    color: 'white', 
    width: '100%', 
    lineHeight: 16,
    textAlign: 'center',
    fontSize: variables.fSize.main,
    fontFamily: MAIN_FONT,
    letterSpacing: 2
  }
});

export default HomeButton;