import React, { Component } from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native';
import { Text } from 'native-base';

let Dheight = Dimensions.get('window').height;
let Dwidth = Dimensions.get('window').width;

class HomeButton extends Component {

    constructor(props){
      super(props);
      this.state = {
        nameBtn: this.props.nameBtn,
      }
    }
  
    render(){
      return (
        <View style={styles.wrapButton}>
          <TouchableOpacity style={{width: '100%', alignItems: 'center'}}>
            <Image
              style={{marginVertical: '13%'}}
              source={require('../assets/img/btn-doc-ic.png')}
            />
            <Text style={{color: '#fff', backgroundColor: '#13CE67', width: '100%', textAlign: 'center', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingVertical: '7%', fontSize: 2*Dheight/70}}>{this.state.nameBtn}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    wrapButton: {
      width: '45%',
      justifyContent: 'space-between',
      backgroundColor: 'rgba(78, 158, 255, 0.1)',
      borderWidth: 1,
      borderColor: 'rgba(112, 172, 245, 0.5)',
      borderRadius: 10,
      marginBottom: '10%'
    }
  });
  
  export default HomeButton;