import React, {Component} from 'react';
import {StyleSheet,} from 'react-native';
import {View, Item, Textarea, Input, Form} from 'native-base';
import CustomBtn from './CustomBtn';
import variables from '../../styles/variables';

const { black, accentBlue, red } = variables.colors;
const { mainFont } = variables.fonts;
const { medium } = variables.fSize;

export default class FormSend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email,
      message: '',
      emailValid: true,
      messageValid: true
    };
  }

  _confirm = () => {
    const { message, email, emailValid, messageValid } = this.state;
    this.validate(email);
    this.validateMess(message);
    if (emailValid && messageValid) this.props.sendData({email, message})
  }

  validate = (value) => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.setState({email: value});
    (!reg.test(value)) ? this.setState({emailValid: false}) : this.setState({emailValid: true});
  }

  validateMess = (value) => {
    this.setState({message: value});
    (!value.length || value.length < 10) ? this.setState({messageValid: false}) : this.setState({messageValid: true});
  }

  render() {
    const { message, email, emailValid, messageValid } = this.state;

    return (
      <Form style={{justifyContent: 'space-between', flexDirection: 'column', flex: 1, paddingTop: 15, paddingHorizontal: 15}}>
        <View style={{flex: 1}}>
          <Item style={[styles.inputWrap, (!emailValid)? {borderColor: red}: {}]} regular>
            <Input style={styles.input} placeholder='Ваш e-mail' onChangeText={(email) => this.validate(email)} value={email}/>
          </Item>
          <Textarea style={[styles.textarea, (!messageValid)? {borderColor: red}: {}]} bordered placeholder="Ваш вопрос" onChangeText={(message) => this.validateMess(message)} value={message}/>
        </View >
        <View style={styles.buttonWrap}>
          <CustomBtn label='ОТПРАВИТЬ' onClick={() => this._confirm()}/>
        </View>
      </Form>
    );
  }
}

const styles = StyleSheet.create({
  inputWrap: {
    marginBottom: 20, 
    borderColor: accentBlue, 
    borderRadius: 10, 
    backgroundColor: 'white'
  },
  input: {
    fontFamily: mainFont,
    fontSize: medium,
    color: black
  },
  textarea: {
    height: 150, 
    fontSize: medium, 
    fontFamily: mainFont,
    borderColor: accentBlue, 
    borderRadius: 10, 
    backgroundColor: 'white'
  },
  buttonWrap: {
    paddingTop: 20,
    paddingBottom: 15,
  }
});