import React, { Component } from 'react';
import { View, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Text, Container } from 'native-base';
import { withNamespaces } from 'react-i18next';
import * as AuthActions from '../../actions/auth';
import * as ContentActions from '../../actions/content';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInputMask } from 'react-native-masked-text';

import Header from '../../components/common/Header';
import CustomBtn from '../../components/common/CustomBtn';
import Popup from '../../components/common/Popup';
import styles from './styles';

import { ACCENT_BLUE } from '../../styles/constants';

class AuthorizationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      formattedNumber: '',
      personalId: '',
      message: '',
      smsCode: '',
      loading: false,
      showPopup: false,
      showSms: false,
      user: {}
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.pinCode !== null && newProps.confirmed_auth && newProps.token) this.props.navigation.navigate('authMethods');
    if (newProps.confirmed_auth && newProps.pinCode == null && newProps.token) this.props.navigation.navigate('profile');
  }

  changeLang = (key) => {
    if (key === this.state.language) return;
    this.props.setAuthMessage(null);
    this.props.setLanguage(key);
  }

  onChangeNumber = (value) => {
    this.setState({ number: value });
  }

  onChangeId = (text) => {
    let newText = '';
    let numbers = '0123456789';

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      }
    }

    this.setState({ personalId: newText });
  }

  onChangeSms = (value) => {
    this.setState({ smsCode: value });
  }

  checkSMSCode = () => {
    const { smsCode, user } = this.state;
    const { t, fullAuthUser, setAuthorized } = this.props;
    if (+smsCode !== +user.sms_code) {
      this.setState({ message: t('common:errors.wrong_sms_code') });
      return;
    } else {
      this.setState({ message: '', showSms: false });
      fullAuthUser(user);
      setAuthorized(true);
    }
  }

  clickOnPopup = () => {
    this.setState({ showPopup: false });
  }

  checkValid = (number, personalId) => {
    let { t } = this.props;
    let result = true;

    if (number.length < 10) {
      this.setState({ message: t('common:errors.wrong_phone') });
      result = false;
    } else if (personalId.length < 12) {
      this.setState({ message: t('common:errors.wrong_inn') });
      result = false;
    } else {
      this.setState({ message: '' });
    }

    return result;
  }

  authUser = () => {
    let { t } = this.props;
    let number = this.phoneField.getRawValue();
    let { personalId } = this.state;

    if (this.checkValid(number, personalId)) {
      this.setState({ loading: true });
      this.props.authUser({ phone: number, iin: personalId })
        .then((resp) => {
          console.log(resp);
          this.setState({
            user: resp,
            message: '',
            showSms: true,
            loading: false
          });
        })
        .catch((e) => {
          this.setState({
            showPopup: (e.code === 403) ? true : false,
            message: (e.error) ? e.error : t('common:errors.server_not_available'),
            loading: false
          });
        });
    }
  }

  renderAuthView() {
    const { message, loading, personalId } = this.state;
    const { t, authMessage, languages_key } = this.props;

    return (
      <View style={styles.wrapAuthView}>
        <View style={styles.wrapLanguage}>
          <TouchableOpacity style={(languages_key === 'kz') ? styles.langActiveWrap : styles.langWrap} onPress={() => this.changeLang('kz')}>
            <Text style={(languages_key === 'kz') ? styles.langActive : styles.lang}>KAZ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={(languages_key === 'ru') ? styles.langActiveWrap : styles.langWrap} onPress={() => this.changeLang('ru')}>
            <Text style={(languages_key === 'ru') ? styles.langActive : styles.lang}>РУС</Text>
          </TouchableOpacity>
          <TouchableOpacity style={(languages_key === 'en') ? styles.langActiveWrap : styles.langWrap} onPress={() => this.changeLang('en')}>
            <Text style={(languages_key === 'en') ? styles.langActive : styles.lang}>ENG</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.authTitle}>{t('authorization:auth_title')}</Text>
          <View style={styles.wrapForm}>
            <TextInputMask
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '+7 (999) 999 99 99',
                getRawValue: function(value, settings) {
                  return value;
                },
              }}
              maxLength={18} 
              keyboardType='number-pad'
              returnKeyType='done'
              placeholder={t('authorization:phone')}
              value={this.state.formattedNumber}
              style={[styles.input, { borderBottomWidth: 1, borderColor: ACCENT_BLUE }]}
              onChangeText={text => {
                this.setState({
                  formattedNumber: text
                })
              }}
              ref={(ref) => this.phoneField = ref}
            />
            <TextInput 
              style={styles.input} 
              placeholder={t('authorization:inn')} 
              onChangeText={(text) => this.onChangeId(text)} 
              value={personalId} 
              keyboardType='number-pad'
              returnKeyType='done'
              maxLength={12} 
            />
          </View>
          {(loading) ? (
            <ActivityIndicator size="small" color={ACCENT_BLUE} />
          ) : (
            <CustomBtn color='blue' label={t('authorization:get_code')} onClick={() => this.authUser() } />
          )}
          {(authMessage) && <Text style={styles.authMessage}>{authMessage}</Text>}
          {(message.length) ? <Text style={styles.errorMessage}>{message}</Text> : false}
        </View>
      </View>
    )
  }

  renderSmsCode() {
    const { formattedNumber, message } = this.state;
    const { t } = this.props;

    return (
      <View style={styles.wrapAuthView}>
        <View style={styles.content}>
          <Text style={styles.smsTitle}>{t('authorization:auth_sms1')}{"\n"}{formattedNumber} {t('authorization:auth_sms2')}</Text>
          <TextInput style={[styles.inputSMS, {marginBottom: 30}]} onChangeText={(code) => this.onChangeSms(code)} keyboardType='number-pad' maxLength={4} returnKeyType='done' />
          <Text style={[styles.errorMessage, {marginTop: 0, marginBottom: 10}]}>{message}</Text>
          <CustomBtn color='blue' label={t('common:actions.confirm')} onClick={() => this.checkSMSCode()} />
        </View>
        
      </View>
    )
  }

  render() {
    const { t, token } = this.props;
    const { showPopup, showSms } = this.state;

    return (
      <Container style={styles.container}>
        <Header isHome={true} backButton={false} callButton={false} search={false} navigation={this.props.navigation} />
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          keyboardShouldPersistTaps='handled'
          style={styles.wrapMain}
          contentContainerStyle={styles.contentStyleMain}
        >
          {(!token && !showSms) && this.renderAuthView()}
          {(!token && showSms) && this.renderSmsCode()}
        </KeyboardAwareScrollView>
        <Popup
          show={showPopup}
          firstText={t('authorization:phone_not_register')}
          email={'info@diagnostika.kz'}
          laberButton={t('common:actions.ok')}
          actionButton={this.clickOnPopup}
        />
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    hideScreen: state.content.hideScreen,
    token: state.authorization.token,
    confirmed_auth: state.authorization.confirmed_auth,
    authMessage: state.content.authMessage,
    notify: state.authorization.notify,
    languages_key: state.authorization.language,
    user: state.authorization.user,
    pinCode: state.authorization.pinCode,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...AuthActions, ...ContentActions }, dispatch)
}

export default withNamespaces(['authorization', 'common'])(connect(mapStateToProps, mapDispatchToProps)(AuthorizationScreen));
