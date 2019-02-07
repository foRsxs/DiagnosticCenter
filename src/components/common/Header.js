import React, { Component } from 'react';
import { StatusBar, StyleSheet, View, Text, TouchableOpacity, Dimensions, Image, TextInput } from 'react-native';
import { Icon } from 'native-base';

import variables from '../../styles/variables';

const { large } = variables.fSize;
const { white, accentBlue, barColor } = variables.colors;
const { mainFont } = variables.fonts;
let { width, height } = Dimensions.get('window');

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { backDisabled = false, disabledButtons = false, search = false, text } = this.props

    return (
      <View style={{width: '100%', zIndex: 2, backgroundColor: 'rgba(0, 0, 0, 0)'}}>
        <View style={styles.container}>
          <StatusBar backgroundColor={barColor} barStyle='light-content' />
            {
              (!backDisabled) && (
              <TouchableOpacity onPress={() => this.props.navigation.goBack(null)} activeOpacity={0.6} style={styles.btnBack} >
                <Icon ios='ios-arrow-back' android="ios-arrow-back" style={{ color: 'white', paddingLeft: 5, width: 30, height: 30 }} /> 
              </TouchableOpacity>
              )
            }
            {
              (search) && (
                <View style={styles.inputContainer}>
                  <Image style={styles.searchIcon} resizeMode='contain' source={require('../../../assets/img/search-icon.png')} />
                  <TextInput style={[styles.input]} placeholder='' onChangeText={(text) => onChangeSearch(text)}/>  
                </View>
              )
            }
            {
              (text) && (
                <View style={styles.textContainer} >
                  <Text style={styles.text}>{text}</Text>
                </View> 
              )
            }       
        </View>
        <View style={{alignItems: 'center', marginTop: -width+height/25, zIndex: 1, backgroundColor: 'rgba(0, 0, 0, 0)'}}>
          <View style={styles.oval} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    height: 50,
    alignItems: 'flex-end',
    backgroundColor: accentBlue,
    zIndex: 3,
    paddingHorizontal: 15
  },
  btnBack: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  textContainer: {
    flex: 6,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingBottom: 3,
    paddingRight: 5
  },
  text: {
    color: white,
    fontFamily: mainFont,
    fontSize: large,
    height: 22,
    lineHeight: 22,
    width: 1000
  },
  oval: {
    width: width,
    height: width,
    borderRadius: width,
    backgroundColor: variables.colors.accentBlue,
    transform: [
      {scaleX: 3}
    ]
  },
  inputContainer: {
    flex: 9,
    position: 'relative'
  },
  searchIcon: {
    position: 'absolute',
    zIndex: 5,
    left: 5,
    top: 8,
    width: 18, 
    height: 18
  },
	input: {
		width: '100%',
    height: 35, 
    padding: 0,
    paddingLeft: 30,
    paddingRight: 10,
		borderRadius: 5,
		backgroundColor: variables.colors.white
	},
});