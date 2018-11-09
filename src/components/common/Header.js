import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ImageBackground, Dimensions} from 'react-native';
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
          <Icon ios='ios-menu' android="md-menu" style={{color:'white', width: 30, height: 30}} /> : 
          <Icon ios='ios-menu' android="md-menu" style={{color: variables.colors.blue, width: 30, height: 30}} />
        }
        </TouchableOpacity>
        {
          (!backDisabled) ?
          <TouchableOpacity onPress={()=> this.props.navigation.goBack()} activeOpacity={0.6} style={styles.btnBack} >
          {
            (!inversion) ?
            <Icon ios='ios-arrow-back' android="ios-arrow-back" style={{color:'white', width: 30, height: 30}} /> :
            <Icon ios='ios-arrow-back' android="ios-arrow-back" style={{color: variables.colors.blue, width: 30, height: 30}} />
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
let {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    width: '100%',
    height: 40,
    backgroundColor: variables.colors.blue,
    zIndex: 3
  },
  inContainer:{
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
		width: 80
	},
  btnMenu: {
    paddingTop: 10,
    paddingRight: 0,
    paddingLeft: 10,
  },
  btnBack: { 
    paddingTop: 10,
    paddingRight: 0,
    paddingLeft: 10,
  },
  textContainer: {
    width: width - 80,
  },
  text: {
    color: variables.colors.white,
    top: 10,
    fontFamily: variables.fonts.mainFont,
    fontSize: 25,
    lineHeight: 29,
  },
  inText: {
    color: variables.colors.darkBlue,
    top: 10,
    fontFamily: variables.fonts.mainFont,
    fontSize: 25,
    lineHeight: 29,
   
  }
});