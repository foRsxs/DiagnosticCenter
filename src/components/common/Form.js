import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { View, Item, Textarea, Input, Form } from 'native-base';
import { withNamespaces } from 'react-i18next';

import CustomBtn from './CustomBtn';
import variables from '../../styles/variables';

const { medium } = variables.fSize;

import { RED, ACCENT_BLUE, BLACK, MAIN_FONT } from '../../styles/constants';

class FormSend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email,
      question: '',
      emailValid: true,
      questionValid: true
    };
  }

  _confirm = () => {
    const { question, email, emailValid, questionValid } = this.state;
    this.validate(email);
    this.validateMess(question);
    if (emailValid && questionValid && question.length) this.props.sendData({ email, question })
  }

  validate = (value) => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.setState({ email: value });
    (!reg.test(value)) ? this.setState({ emailValid: false }) : this.setState({ emailValid: true });
  }

  validateMess = (value) => {
    this.setState({ question: value });
    (!value.length || value.length < 10) ? this.setState({ questionValid: false }) : this.setState({ questionValid: true });
  }

  render() {
    const { question, email, emailValid, questionValid } = this.state;
    const { t } = this.props;

    return (
      <Form style={{ justifyContent: 'space-between', flexDirection: 'column', flex: 1, paddingTop: 15, paddingHorizontal: 15 }}>
        <View style={{ flex: 1 }}>
          <Item style={[styles.inputWrap, (!emailValid) ? { borderColor: RED } : {}]} regular>
            <Input style={styles.input} onChangeText={(email) => this.validate(email)} value={email} />
          </Item>
          <Textarea style={[styles.textarea, (!questionValid) ? { borderColor: RED } : {}]} bordeRED placeholder={t('common:actions_text.your_question')} onChangeText={(question) => this.validateMess(question)} value={question} />
        </View >
        <View style={styles.buttonWrap}>
          {(!this.props.loading) ? <CustomBtn label={t('common:actions.send')} onClick={() => this._confirm()} /> : <ActivityIndicator size="small" color={ACCENT_BLUE} style={{ marginTop: 10 }} />}
        </View>
      </Form>
    );
  }
}

const styles = StyleSheet.create({
  inputWrap: {
    marginBottom: 20,
    borderColor: ACCENT_BLUE,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  input: {
    fontFamily: MAIN_FONT,
    fontSize: medium,
    color: BLACK
  },
  textarea: {
    height: 150,
    fontSize: medium,
    fontFamily: MAIN_FONT,
    borderColor: ACCENT_BLUE,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  buttonWrap: {
    paddingTop: 20,
    paddingBottom: 15,
  }
});

export default withNamespaces('common', { wait: true })(FormSend);