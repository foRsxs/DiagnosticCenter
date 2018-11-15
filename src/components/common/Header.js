import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'native-base';


import variables from '../../styles/variables';
const { large } = variables.fSize;

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { inversion = false, backDisabled = false } = this.props
    return (
      <View style={!inversion ? styles.container : styles.inContainer}>
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
              <TouchableOpacity onPress={() => this.props.navigation.goBack()} activeOpacity={0.6} style={styles.btnBack} >
                {
                  (!inversion) ?
                    <Icon ios='ios-arrow-back' android="ios-arrow-back" style={{ color: 'white', width: 30, height: 30 }} /> :
                    <Icon ios='ios-arrow-back' android="ios-arrow-back" style={{ color: variables.colors.blue, width: 30, height: 30 }} />
                }

              </TouchableOpacity> : null
          }
        </View>
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
    backgroundColor: variables.colors.blue,
    zIndex: 3
  },
  inContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    height: 40,
    backgroundColor: variables.colors.white,
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
    paddingLeft: 10,
  },
  btnBack: {
    paddingTop: 10,
    paddingRight: 0,
    paddingLeft: 10,
  },
  textContainer: {
    width: width - 80,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  text: {
    color: variables.colors.white,
    fontFamily: variables.fonts.mainFont,
    fontSize: large,
  },
  inText: {
    color: variables.colors.darkBlue,
    fontFamily: variables.fonts.mainFont,
    fontSize: large,
  }
});