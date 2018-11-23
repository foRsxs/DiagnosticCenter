import React, {Component} from 'react';
import {StyleSheet,} from 'react-native';
import {View, Item, Textarea, Input, Form} from 'native-base';
import CustomBtn from './CustomBtn';
import variables from '../../styles/variables';


export default class FormSend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {}
    };
  }

  render() {
    return (
      <Form style={{justifyContent: 'space-between', flexDirection: 'column', flex: 1, paddingTop: 15, paddingHorizontal: 15}}>
        <View style={{flex: 1}}>
          <Item style={styles.inputWrap} regular>
            <Input style={styles.input} placeholder='ваш e-mail' onChangeText={(text) => this.setState({form:{...this.state.form, text: text}})}/>
          </Item>
          <Textarea style={styles.textarea} bordered placeholder="ваш вопрос" onChangeText={(message) => this.setState({form:{...this.state.form, message: message}})}/>
        </View >
        <View style={styles.buttonWrap}>
          <CustomBtn label='ОТПРАВИТЬ' onClick={() => this.props.sendData(this.state.form)}/>
        </View>
      </Form>
    );
  }
}

const styles = StyleSheet.create({
  inputWrap: {
    marginBottom: 20, 
    borderColor: variables.colors.blue, 
    borderRadius: 10, 
    backgroundColor: variables.colors.backgroundBlue
  },
  input: {
    fontFamily: variables.fonts.mainFont,
    fontSize: variables.fSize.main
  },
  textarea: {
    height: 150, 
    fontSize: variables.fSize.main, 
    fontFamily: variables.fonts.mainFont,
    borderColor: variables.colors.blue, 
    borderRadius: 10, 
    backgroundColor: variables.colors.backgroundBlue
  },
  buttonWrap: {
    paddingTop: 20,
    paddingBottom: 15,
  }
});