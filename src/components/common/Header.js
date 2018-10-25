import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {H3, Content, Icon} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import variables from '../../styles/variables'

export default class Header extends Component {
  render(){
    const { back = true, menu = true } = this.props;
    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={()=> this.props.navigation.openDrawer()} activeOpacity={0.6} style={styles.btnMenu} >
          <Icon ios='ios-menu' android="md-menu" style={{color:'white',  padding: 10}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> this.props.navigation.goBack()} activeOpacity={0.6} style={styles.btnBack} >
          <Icon ios='ios-arrow-back' android="md-arrow-back" style={{color:'white',  padding: 10}} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    width: '100%',
    height: 50,
    backgroundColor: variables.colors.blue
  },
  btnMenu: {
    position: 'absolute', 
    top: 8, 
    left: 8
  },
  btnBack: {
    position: 'absolute', 
    top: 8, 
    left: 60
  },
  text: {

  }
});