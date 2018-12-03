import React, {Component} from 'react';
import {Alert, StyleSheet, View, Modal, Dimensions} from 'react-native';
import {Text} from 'native-base';
import variables from '../../styles/variables'
import LinkBtn from './LinkBtn';
import CustomBtn from './CustomBtn';

let {width, height} = Dimensions.get('window');

export default class Popup extends Component {
  render() {
    const {show, firstText, secondText, laberButton, actionButton, labelLink, actionLink} = this.props;
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={show}
        onRequestClose={() => {}}>
        <View style={styles.popupWrap}>
          <View style={styles.popup}>
            <View>
              <Text style={[styles.text,{ marginBottom: 10}]}>{firstText}</Text>
              {(secondText)? <Text style={[styles.text, {marginBottom: 20}]}>{secondText}</Text>: null}
            </View>
            <View style={{marginTop: 10}}>
              <CustomBtn label={laberButton} contentContainerStyle={{width: 180}} onClick={()=>actionButton()}/>
              {(labelLink)? <LinkBtn label={labelLink} onClick={() => actionLink()}/>: null}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  popupWrap: {
    width: width, 
    height: height, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  popup: {
    width: '80%', 
    backgroundColor: 'white', 
    alignSelf: 'center', 
    borderRadius: 10, 
    padding: 20,
    justifyContent: 'space-between'
  },
  text: {
    color: variables.colors.mediumBlack, 
    fontSize: variables.fSize.large, 
    width: '100%', 
    textAlign: 'center'
  }
});
