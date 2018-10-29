import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {H3, Content, Icon} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import variables from '../../styles/variables'

export default class Header extends Component {
  render(){

    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={()=> this.props.navigation.openDrawer()} activeOpacity={0.6} style={styles.btnMenu} >
          <Icon ios='ios-menu' android="md-menu" style={{color:'white',  padding: 10}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> this.props.navigation.goBack()} activeOpacity={0.6} style={styles.btnBack} >
          <Icon ios='md-arrow-back' android="md-arrow-back" style={{color:'white',  padding: 10}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.textContainer} >
          <Text uppercase={true} style={styles.text}>{this.props.text}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flexWrap:'wrap', 
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    width: '100%',
    height: 40,
    backgroundColor: variables.colors.blue,
    zIndex: 2
  },
  btnMenu: {
    top: 5, 
    left: 10
  },
  btnBack: { 
    top: 5, 
    left: 20
  },
  textContainer: {
    top: 10,
    left: 30
  },
  text: {
    color: variables.colors.white,
    top: 5,
    fontFamily: variables.fonts.mainFont,
    fontSize: 25,
    lineHeight: 29,
    letterSpacing: 1
  }
});