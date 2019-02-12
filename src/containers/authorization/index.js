import React, { Component } from 'react';
import { View, TextInput, ActivityIndicator, TouchableOpacity, AsyncStorage, NetInfo } from 'react-native';
import { Text, ListItem, Container, Left, Right, CheckBox, Content } from 'native-base';
import { withNamespaces } from 'react-i18next';
import * as AuthActions from '../../actions/auth';
import * as ContentActions from '../../actions/content';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TouchID from 'react-native-touch-id';
import TextInputMask from 'react-native-text-input-mask';

import Header from '../../components/common/Header';
import CustomBtn from '../../components/common/CustomBtn';
import ConfirmationCode from '../../components/autorization/ConfirmationCode';
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
      methods_auth_local: 'code',
      message: '',
      loading: false,
      isTouchId: false,
      isFaceId: false,
      showPopup: false,
      showSms: false
    };
  }

  componentDidMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.props.changeNetworkConnection(isConnected);
      this.props.getSales();
    });
    this._checkTouchSupport();
    //AsyncStorage.clear();
    //<----------------------------------------need to rewrite--------------------------------------------//
    AsyncStorage.getItem('notify').then((resp) => {
      (resp) ? this.props.changeNotify(resp == 'true') : this.props.changeNotify(true);
    });
    AsyncStorage.getItem('lang_key').then((resp) => {
      (resp) ? this.props.setCurrentLang(resp) : this.props.setCurrentLang('ru');
    });
    AsyncStorage.getItem('api_token').then((resp) => {
      this.props.saveUser({ api_token: resp });
    });
    AsyncStorage.getItem('methods_auth').then((resp) => {
      this.props.changeMethodsAuth({ methods_auth: resp, confirmed: false });
    });
    AsyncStorage.getItem('pinCode').then((resp) => {
      this.props.savePinCode({ code: resp, confirmed: false });
      SplashScreen.hide();
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.confirmed_auth) this.props.navigation.navigate('home');
  }

  changeLang = (key) => {
    if (key === this.state.language) return;
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
    let { number, personalId } = this.state;

    if (this.checkValid(number, personalId)) {
      this.setState({ loading: true });
      this.props.authUser({ phone: number, iin: personalId })
        .then((resp) => {
          this.setState({
            message: '',
            loading: false
          });
        })
        .catch((e) => {
          this.setState({
            showPopup: (e.code === 403) ? true : false,
            message: e.error,
            loading: false
          });
        });
    }
  }

  _confirmCode = (code) => {
    let { t, pinCode, setAuthorized } = this.props;

    if (+code === +pinCode) {
      this.setState({ message: '' });
      setAuthorized();
    } else {
      this.setState({ message: t('common:errors.wrong_pin_code') });
    }
  }

  _checkTouchSupport = () => {
    TouchID.isSupported()
      .then(biometryType => {
        if (biometryType === 'FaceID') {
          // Face ID is supported on IOS
          this.setState({ isFaceId: true });
          this.props.setMethodsAuthDevice({ face: true, touch: false });
        } else if (biometryType === 'TouchID' || biometryType) {
          this.setState({ isTouchId: true });
          this.props.setMethodsAuthDevice({ face: false, touch: true });
        }
      })
      .catch(() => {
        this.setState({ isTouchId: false, isFaceId: false });
        this.props.setMethodsAuthDevice({ face: false, touch: false });
      });
  }

  _openScan = () => {
    let { t } = this.props;

    const optionalConfigObject = {
      title: t('authorization:need_auth_text'),
      color: "#000",
      imageColor: ACCENT_BLUE,
      sensorDescription: (this.state.isTouchId) ? t('authorization:auth_type.touch_id') : t('authorization:auth_type.face_id'),
      cancelText: t('common:actions.cancel'),
    }

    TouchID.authenticate('', optionalConfigObject)
      .then(() => {
        this.props.setAuthorized();
      })
  }

  renderConfirmCodeChoose() {
    let { methods_auth_local, isFaceId, isTouchId } = this.state;
    let { t, changeMethodsAuth } = this.props;

    return (
      <View style={styles.wrapConfirmCode}>
        <Text style={styles.title}>{t('authorization:choose_auth_method')}</Text>
        <Content>
          <ListItem style={styles.confirmListItem} onPress={() => this.setState({ methods_auth_local: 'code' })}>
            <Left>
              <Text>{t('authorization:auth_type.pin_code')}</Text>
            </Left>
            <Right>
              <CheckBox onPress={() => this.setState({ methods_auth_local: 'code' })} checked={(methods_auth_local === 'code')} color={ACCENT_BLUE} />
            </Right>
          </ListItem>
          {
            (isTouchId) && (
              <ListItem style={styles.confirmListItem} onPress={() => this.setState({ methods_auth_local: 'touch' })}>
                <Left>
                  <Text>{t('authorization:auth_type.touch_id')}</Text>
                </Left>
                <Right>
                  <CheckBox onPress={() => this.setState({ methods_auth_local: 'touch' })} checked={(methods_auth_local === 'touch')} color={ACCENT_BLUE} />
                </Right>
              </ListItem>
            )
          }
          {
            (isFaceId) && (
              <ListItem style={styles.confirmListItem} onPress={() => this.setState({ methods_auth_local: 'face' })}>
                <Left>
                  <Text>{t('authorization:auth_type.face_id')}</Text>
                </Left>
                <Right>
                  <CheckBox onPress={() => this.setState({ methods_auth_local: 'face' })} checked={(methods_auth_local === 'face')} color={ACCENT_BLUE} />
                </Right>
              </ListItem>
            )
          }
        </Content>
        <CustomBtn
          label={t('common:actions.save')}
          onClick={() => changeMethodsAuth({ methods_auth: methods_auth_local, confirmed: (methods_auth_local === 'code') ? false : true })}
        />
      </View>
    )
  }

  renderAuthView() {
    const { message, loading, personalId } = this.state;
    const { t, authMessage, languages_key } = this.props;

    return (
      <View style={styles.wrapAuthView}>
        <View style={styles.wrapLanguage}>
          <TouchableOpacity
            onPress={() => this.changeLang('kz')}
            style={{ zIndex: 2 }}
          >
            <Text style={(languages_key === 'kz') ? styles.langActive : styles.lang}>KAZ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.changeLang('ru')}
          >
            <Text style={(languages_key === 'ru') ? styles.langActive : styles.lang}>РУС</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.changeLang('en')}
          >
            <Text style={(languages_key === 'en') ? styles.langActive : styles.lang}>ENG</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.authTitle}>{t('authorization:auth_title')}</Text>
          <View style={styles.wrapForm}>
            <TextInputMask
              onChangeText={(formatted, extracted) => {
                this.onChangeNumber(`7${extracted}`);
                this.setState({ formattedNumber: formatted });
              }}
              keyboardType='number-pad'
              style={[styles.input, { borderBottomWidth: 1, borderColor: ACCENT_BLUE }]}
              mask={"+7 ([000]) [000] [00] [00]"}
              placeholder={t('authorization:phone')}
            />
            <TextInput style={styles.input} placeholder={t('authorization:inn')} onChangeText={(text) => this.onChangeId(text)} value={personalId} keyboardType='number-pad' maxLength={12} />
          </View>
          {(loading) ? (<ActivityIndicator size="small" color={ACCENT_BLUE} />) : (<CustomBtn color='blue' label={t('authorization:get_code')} onClick={() => this.setState({ showSms: true })} />)}
          {(authMessage) && <Text style={styles.authMessage}>{authMessage}</Text>}
          {(message.length) ? <Text style={styles.errorMessage}>{message}</Text> : false}
        </View>
      </View>
    )
  }

  renderSmsCode() {
    const { formattedNumber } = this.state;
    const { t } = this.props;

    return (
      <View style={styles.wrapAuthView}>
        <View style={styles.content}>
          <Text style={styles.smsTitle}>{t('authorization:auth_sms1')}{"\n"}{formattedNumber} {t('authorization:auth_sms2')}</Text>
          <TextInput style={styles.inputSMS} onChangeText={(code) => this.onChangeSms(code)} keyboardType='number-pad' maxLength={4} />
          <CustomBtn color='blue' label={t('common:actions.confirm')} onClick={() => this.authUser()} />
        </View>
      </View>
    )
  }

  renderTouchFaceId() {
    const { isTouchId } = this.state;
    const { t } = this.props;

    this._openScan();

    return (
      <View style={styles.wrapScan} >
        <Text style={styles.title}>{(isTouchId) ? t('authorization:auth_touch_id') : t('authorization:auth_face_id')}</Text>
        <TouchableOpacity onPress={() => this._openScan()} style={styles.scanClick} activeOpacity={1}>
          <Text style={styles.scanClickText}>1</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderPinCode(type) {
    const { message } = this.state;
    const { t, pinCode } = this.props;

    return (
      <View style={styles.wrapPin}>
        <Text style={styles.title}>{(!pinCode) ? t('authorization:pin_create') : t('authorization:pin_input')}</Text>
        <Content contentContainerStyle={styles.pinContent} >
          <ConfirmationCode
            message={message}
            new_user={(type == 'new')}
            onPress={
              (code) => {
                if (type == 'new') {
                  this.props.savePinCode({ code: code, confirmed: true })
                } else {
                  this._confirmCode(code);
                }
              }
            }
          />
        </Content>
      </View>
    )
  }

  render() {
    const { t, token, methods_auth, confirmed_auth, pinCode, languages_key } = this.props;
    const { showPopup, showSms } = this.state;

    return (
      <Container style={styles.container}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          keyboardShouldPersistTaps='handled'
          style={styles.wrapMain}
          contentContainerStyle={styles.contentStyleMain}
        >
          <Header isHome={true} backButton={false} callButton={false} search={false} navigation={this.props.navigation} />
          {(!token && !showSms) && this.renderAuthView()}
          {(!token && showSms) && this.renderSmsCode()}
          {(token && !methods_auth) && this.renderConfirmCodeChoose()}
          {(token && methods_auth === 'code' && !confirmed_auth && !pinCode) && this.renderPinCode('new')}
          {(token && methods_auth === 'code' && !confirmed_auth && pinCode) && this.renderPinCode('confirm')}
          {(token && methods_auth && methods_auth !== 'code' && !confirmed_auth) && this.renderTouchFaceId()}
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
    token: state.authorization.token,
    methods_auth: state.authorization.methods_auth,
    pinCode: state.authorization.pinCode,
    confirmed_auth: state.authorization.confirmed_auth,
    authMessage: state.content.authMessage,
    languages_key: state.authorization.language
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...AuthActions, ...ContentActions }, dispatch)
}

export default withNamespaces(['authorization', 'common'])(connect(mapStateToProps, mapDispatchToProps)(AuthorizationScreen));
