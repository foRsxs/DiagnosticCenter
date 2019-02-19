import React, {Component} from 'react';
import {View, Modal, Linking} from 'react-native';
import {Text} from 'native-base';

import LinkBtn from '../LinkBtn';
import CustomBtn from '../CustomBtn';

import styles from './styles';

export default class Popup extends Component {
  render() {
    const {show, firstText, secondText, laberButton, actionButton, labelLink, actionLink, email} = this.props;
    
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
              {(email) && <Text style={[styles.text, {marginBottom: 20}]} onPress={()=> Linking.openURL(`mailto:${email}`)}>{email}</Text>}
              {(secondText) && <Text style={[styles.text, {marginBottom: 20}]}>{secondText}</Text>}
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
