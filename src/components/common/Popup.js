import React, {Component} from 'react';
import {StyleSheet, View, Modal, Dimensions, Linking} from 'react-native';
import {Text} from 'native-base';
import LinkBtn from './LinkBtn';
import CustomBtn from './CustomBtn';
import variables from '../../styles/variables';

let {width, height} = Dimensions.get('window');
import { BACKGROUND_POPUP, MEDIUM_BLACK  } from '../../styles/constants';

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

const styles = StyleSheet.create({
  popupWrap: {
    width: width, 
    height: height, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: BACKGROUND_POPUP
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
    color: MEDIUM_BLACK, 
    fontSize: variables.fSize.large, 
    width: '100%', 
    textAlign: 'center'
  }
});
