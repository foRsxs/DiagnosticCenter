import React, { Component } from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native';
import { Text } from 'native-base';
import variables from '../../styles/variables'

class HomeButton extends Component {

    constructor(props){
      super(props);
      this.state = {
        nameBtn: this.props.nameBtn,
      }
    }
  
    render(){
      let {nameBtn} = this.state;
      let {imageUri} = this.props;
      return (
        <View style={styles.wrapButton}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.props.onClick()}
            style={styles.button}>
            <Image
              style={{marginTop: '8%', marginBottom: '5%', width: 58, height: 50}}
              source={imageUri}
            />
            <View style={styles.txtButtonWrap}>
              <Text style={styles.txtButton}>{nameBtn.toUpperCase()}</Text>
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
      padding: 10,
    },
    button: {
      width: '100%',
      alignItems: 'center',
      backgroundColor: variables.colors.accentBlue,
      borderRadius: 10,
    },
    txtButtonWrap: {
      width: '100%', 
      borderBottomLeftRadius: 10, 
      borderBottomRightRadius: 10, 
    },
    txtButton: {
      color: 'white', 
      width: '100%', 
      lineHeight: 16,
      textAlign: 'center',  
      paddingVertical: '5%',
      paddingHorizontal: '5%', 
      fontSize: variables.fSize.main,
      fontFamily: variables.fonts.mainFont,
    }
  });
  
  export default HomeButton;