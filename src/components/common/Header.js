import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {H3, Content, Icon} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import variables from '../../styles/variables'

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render(){
    const { inversion = false, backDisabled = false} = this.props
    console.log('nav', this.props.navigation)
    return(
      <View style={!inversion ? styles.container : styles.inContainer}>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={ () => this.props.navigation.openDrawer()} activeOpacity={0.6} style={styles.btnMenu} >
        {
          (!inversion) ?
          <Icon ios='ios-menu' android="md-menu" style={{color:'white'}} /> : 
          <Icon ios='ios-menu' android="md-menu" style={{color: variables.colors.blue}} />
        }
        </TouchableOpacity>
        {
          (!backDisabled) ?
          <TouchableOpacity onPress={()=> this.props.navigation.goBack()} activeOpacity={0.6} style={styles.btnBack} >
          {
            (!inversion) ?
            <Icon ios='ios-arrow-back' android="ios-arrow-back" style={{color:'white'}} /> :
            <Icon ios='ios-arrow-back' android="ios-arrow-back" style={{color: variables.colors.blue}} />
          }
            
          </TouchableOpacity> : null
        }  
        </View>
        <View style={styles.textContainer} >
          <Text style={!inversion? styles.text : styles.inText}>{this.props.text.toUpperCase()}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flexWrap:'wrap', 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    width: '100%',
    height: 40,
    backgroundColor: variables.colors.blue,
    zIndex: 3
  },
  inContainer:{
    flexWrap:'wrap', 
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    width: '100%',
    height: 40,
    backgroundColor: variables.colors.white,
    zIndex: 3
  },
  btnContainer: {
		flexWrap:'wrap', 
    flexDirection: 'row',
    justifyContent: 'flex-start', 
		width: '20%'
	},
  btnMenu: {
    padding: 10,
    left: 2
  },
  btnBack: { 
    padding: 10,
    left: 4
  },
  textContainer: {
    width: '80%',
  },
  text: {
    color: variables.colors.white,
    top: 10,
    left: 10,
    fontFamily: variables.fonts.mainFont,
    fontSize: 22,
    lineHeight: 29,
    // letterSpacing: 1
  },
  inText: {
    color: variables.colors.darkBlue,
    top: 10,
    left: 10,
    fontFamily: 'HelveticaNeueCyr-Thin',
    // fontWeight: '100',
    fontSize: 22,
    lineHeight: 29,
    // letterSpacing: 1
  }
});