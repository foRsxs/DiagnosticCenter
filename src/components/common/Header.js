import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'native-base';


import variables from '../../styles/variables';
const { large } = variables.fSize;
const {darkBlue, white, accentBlue} = variables.colors;
const {mainFont} = variables.fonts;

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { inversion = false, backDisabled = false, disabledButtons = false } = this.props
    return (
      <View style={!inversion ? styles.container : styles.inContainer}>
        {(!disabledButtons) && (
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} activeOpacity={0.6} style={styles.btnMenu} >
              {
                (!inversion) ?
                  <Icon ios='ios-menu' android="md-menu" style={{ color: 'white', width: 30, height: 30 }} /> :
                  <Icon ios='ios-menu' android="md-menu" style={{ color: variables.colors.blue, width: 30, height: 30 }} />
              }
            </TouchableOpacity>
            {
              (!backDisabled) ?
                <TouchableOpacity onPress={() => this.props.navigation.goBack(null)} activeOpacity={0.6} style={styles.btnBack} >
                  {
                    (!inversion) ?
                      <Icon ios='ios-arrow-back' android="ios-arrow-back" style={{ color: 'white', paddingLeft: 5, width: 30, height: 30 }} /> :
                      <Icon ios='ios-arrow-back' android="ios-arrow-back" style={{ color: variables.colors.blue, paddingLeft: 5, width: 30, height: 30 }} />
                  }

                </TouchableOpacity> : null
            }
          </View>
        )}
        <View style={styles.textContainer} >
          <Text style={!inversion ? styles.text : styles.inText}>{this.props.text.toUpperCase()}</Text>
        </View>
        
      </View>
    )
  }
}
let { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    backgroundColor: accentBlue,
    zIndex: 3
  },
  inContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    height: 40,
    backgroundColor: white,
    zIndex: 3
  },
  btnContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 80
  },
  btnMenu: {
    paddingTop: 10,
    paddingRight: 0,
    paddingLeft: 15,
  },
  btnBack: {
    paddingTop: 10,
    // paddingRight: 0,
    // paddingLeft: 10,
  },
  textContainer: {
    width: width - 80,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingBottom: 3
  },
  text: {
    color: white,
    fontFamily: mainFont,
    fontSize: large,
  },
  inText: {
    color: darkBlue,
    fontFamily: mainFont,
    fontSize: large,
  },
});