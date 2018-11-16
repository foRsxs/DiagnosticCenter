import React, {Component} from 'react';
import {Alert, StyleSheet, View, Modal, Dimensions} from 'react-native';
import {Text} from 'native-base';
import variables from '../../styles/variables'
import LinkBtn from './LinkBtn';
import CustomBtn from './CustomBtn';

let {width, height} = Dimensions.get('window')

export default class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({modalVisible: nextProps.show})
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {}}>
        <View style={styles.popupWrap}>
          <View style={styles.popup}>
            <View>
              <Text style={[styles.text,{ marginBottom: 10}]}>Вы не знаете к какому врачу обратиться?</Text>
              <Text style={styles.text}>Запишитесь на приём к терпевту — он вас выслушает и подскажет, что делать дальше</Text>
            </View>
            <View>
              <CustomBtn label='ЗАПИСЬ' onClick={()=>{Alert.alert('ok')}}/>
              <LinkBtn label='закрыть' onClick={() => this.setState({modalVisible: false})}/>
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  popup: {
    width: width-100, 
    height: height-200, 
    backgroundColor: 'white', 
    alignSelf: 'center', 
    borderRadius: 10, 
    padding: 20,
    justifyContent: 'space-between'
  },
  text: {
    color: variables.colors.lightBlack, 
    fontSize: variables.fSize.large, 
    width: '100%', 
    textAlign: 'center'
  }
});
