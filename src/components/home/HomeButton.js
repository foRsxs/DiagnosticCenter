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
            onPress={() => this.props.onClick()}
            style={styles.button}>
            <Image
              style={{marginVertical: '8%', width: 58, height: 50}}
              source={imageUri}
            />
            <View style={styles.txtButtonWrap}>
              <Text style={styles.txtButton}>{nameBtn}</Text>
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
      backgroundColor: variables.colors.lightGray,
      borderWidth: 1,
      borderColor: variables.colors.activeGray,
      borderRadius: 10,
    },
    txtButtonWrap: {
      backgroundColor: variables.colors.green, 
      width: '100%', 
      borderBottomLeftRadius: 10, 
      borderBottomRightRadius: 10, 
    },
    txtButton: {
      color: 'white', 
      width: '100%', 
      textAlign: 'center',  
      paddingVertical: '5%', 
      fontSize: variables.fSize.main,
    }
  });
  
  export default HomeButton;