import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Image, TextInput, ActivityIndicator, TouchableOpacity, AsyncStorage, NetInfo } from 'react-native';
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
import HeaderBottom from '../../components/common/HeaderBottom';
import variables from '../../styles/variables';
import CustomBtn from '../../components/common/CustomBtn';
import ConfirmationCode from '../../components/autorization/ConfirmationCode';
import Popup from '../../components/common/Popup';

let { width, height } = Dimensions.get('window');
const {accentBlue, white, mediumBlack} = variables.colors;
const {mainFont} = variables.fonts;
const {large, normal, main, medium} = variables.fSize;

class AuthorizationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      personalId: '',
      methods_auth_local: 'code',
      message: '',
      loading: false,
      isTouchId: false,
      isFaceId: false,
      showPopup: false
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
      this.props.saveUser({api_token: resp});
    });
    AsyncStorage.getItem('methods_auth').then((resp) => {
      this.props.changeMethodsAuth({methods_auth: resp, confirmed: false});
    });
    AsyncStorage.getItem('pinCode').then((resp) => {
      this.props.savePinCode({code:resp, confirmed: false});
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

    for (var i=0; i < text.length; i++) {
      if(numbers.indexOf(text[i]) > -1 ) {
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
      this.setState({message: t('common:errors.wrong_phone') });
      result = false;
    } else if (personalId.length < 12) {
      this.setState({message: t('common:errors.wrong_inn') });
      result = false;
    } else {
      this.setState({message: ''});
    }

    return result;
  }

  authUser = () => {
    let {number, personalId} = this.state;

    if (this.checkValid(number, personalId)) {
      this.setState({loading: true});
      this.props.authUser({phone: number, iin: personalId})
        .then((resp)=>{
          this.setState({
            message: '',
            loading: false
          });
        })
        .catch((e)=> {
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
      this.setState({message: ''});
      setAuthorized();
    } else {
      this.setState({message: t('common:errors.wrong_pin_code') });
    }
  }

  _checkTouchSupport = () => {
    TouchID.isSupported()
      .then(biometryType => {
        if (biometryType === 'FaceID') {
          // Face ID is supported on IOS
          this.setState({isFaceId: true});
          this.props.setMethodsAuthDevice({face: true, touch: false});
        } else if (biometryType === 'TouchID' || biometryType) {
          this.setState({isTouchId: true});
          this.props.setMethodsAuthDevice({face: false, touch: true});
        }
      })
      .catch(() => {
        this.setState({isTouchId: false, isFaceId: false});
        this.props.setMethodsAuthDevice({face: false, touch: false});
      });
  }

  _openScan = () => {
    let { t } = this.props;

    const optionalConfigObject = {
      title: t('authorization:need_auth_text'),
      color: "#000",
      imageColor: accentBlue,
      sensorDescription: (this.state.isTouchId) ? t('authorization:auth_type.touch_id') : t('authorization:auth_type.face_id'),
      cancelText: t('common:actions.cancel'),
    }

    TouchID.authenticate('', optionalConfigObject)
    .then(() => {
      this.props.setAuthorized();
    })
  }

  _setGuest = () => {
    this.props.setGuest();
    this.props.setAuthMessage(null);
    this.props.navigation.navigate('home');
  }

  renderConfirmCodeChoose() {
    let { methods_auth_local, isFaceId, isTouchId } = this.state;
    let { t, changeMethodsAuth } = this.props;

    return (
      <View style={{position: 'relative', zIndex: 2, flex: 1, padding:15, paddingBottom:20}}>
        <Text style={styles.title}>{ t('authorization:choose_auth_method') }</Text>
        <Content>
          <ListItem style={{marginRight: 0, marginLeft: 0, paddingRight: 11}} onPress={()=>this.setState({methods_auth_local:'code'})}>
            <Left>
              <Text>{ t('authorization:auth_type.pin_code') }</Text>
            </Left>
            <Right>
              <CheckBox onPress={()=>this.setState({methods_auth_local:'code'})} checked={(methods_auth_local==='code')} color={accentBlue}/>
            </Right>
          </ListItem>
          {
            (isTouchId) && (
              <ListItem style={{marginRight: 0, marginLeft: 0, paddingRight: 11}} onPress={()=>this.setState({methods_auth_local:'touch'})}>
                <Left>
                  <Text>{ t('authorization:auth_type.touch_id') }</Text>
                </Left>
                <Right>
                  <CheckBox onPress={()=>this.setState({methods_auth_local:'touch'})} checked={(methods_auth_local==='touch')} color={accentBlue}/>
                </Right>
              </ListItem>
            )
          }
          {
            (isFaceId) && (
              <ListItem style={{marginRight: 0, marginLeft: 0, paddingRight: 11}} onPress={()=>this.setState({methods_auth_local:'face'})}>
                <Left>
                  <Text>{ t('authorization:auth_type.face_id') }</Text>
                </Left>
                <Right>
                  <CheckBox onPress={()=>this.setState({methods_auth_local:'face'})} checked={(methods_auth_local==='face')} color={accentBlue}/>
                </Right>
              </ListItem>
            )
          }
        </Content>
        <CustomBtn
          label={t('common:actions.save')}
          onClick={()=> changeMethodsAuth({methods_auth: methods_auth_local, confirmed: (methods_auth_local === 'code')? false: true})}
        />
      </View>
    )
  }

  renderAuthView() {
    const {message, loading, personalId } = this.state;
    const {t, authMessage} = this.props;

    return (
      <View style={{position: 'relative',  alignItems: 'center', zIndex: 3, height: height-150, padding: 15, paddingBottom: 16}}>
        <Image style={{ zIndex: 1, height: 130, marginBottom: 10 }} resizeMode='contain' fadeDuration={0} source={require('../../../assets/img/logo.png')} />
        <View style={styles.content}>
          <View style={{marginBottom: 20, position: 'relative'}}>
            <View style={{ alignItems: 'center' }}>
              <TextInputMask
                onChangeText={(formatted, extracted) => {
                  this.onChangeNumber(`7${extracted}`)
                }}
                keyboardType='number-pad'
                style={styles.input}
                mask={"+7 ([000]) [000] [00] [00]"}
              />
            </View>
            <View style={styles.textInpWrap}>
              <Text style={styles.textInp} >{ t('authorization:phone') }</Text>
            </View>
          </View>
          <View style={{position: 'relative'}}>
            <View style={{ alignItems: 'center' }}>
              <TextInput style={styles.input} onChangeText={(text) => this.onChangeId(text)} value={personalId} keyboardType='number-pad' maxLength={12}/>
            </View>
            <View style={styles.textInpWrap}>
              <Text style={styles.textInp}>{ t('authorization:inn') }</Text>
            </View>
          </View>
          <View style={{marginVertical: 20}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={()=>this._setGuest()}
            >
              <Text style={{color: accentBlue, fontFamily: mainFont, fontSize: medium}}>{ t('authorization:login_without_auth') }</Text>
            </TouchableOpacity>
          </View>
          {(authMessage) && <Text style={{color: accentBlue, fontFamily: mainFont, textAlign: 'center', marginTop: 10, fontSize: medium}}>{authMessage}</Text>}
          {(message.length) ? <Text style={{color: 'red', textAlign: 'center', marginTop: 10, fontSize: normal}}>{message}</Text>: false}
        </View>
        {(loading)? (<ActivityIndicator size="small" color={accentBlue} />): (<CustomBtn label={ t('authorization:auth_text') } onClick={()=>this.authUser()} />)}
      </View>
    )
  }

  renderTouchFaceId() {
    const { isTouchId } = this.state;
    const { t } = this.props;

    this._openScan();

    return (
      <View style={{position: 'relative', zIndex: 2, flex: 1}} >
        <Text style={styles.title}>{(isTouchId) ? t('authorization:auth_touch_id') : t('authorization:auth_face_id')}</Text>
        <TouchableOpacity onPress={()=>this._openScan()} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} activeOpacity={1}>
          <Text style={{color: 'transparent'}}>1</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderPinCode(type) {
    const { message } = this.state;
    const { t, pinCode } = this.props;

    return (
      <View style={{position: 'relative', zIndex: 2, flex: 1}}>
        <Text style={styles.title}>{(!pinCode) ? t('authorization:pin_create') : t('authorization:pin_input') }</Text>
        <Content contentContainerStyle={{position: 'relative', zIndex: 2, justifyContent: 'space-between', padding: 15, paddingBottom: 20, height: '100%'}} >
          <ConfirmationCode
            message={message}
            new_user={(type == 'new')}
            onPress={
              (code)=> {
                if (type == 'new') {
                  this.props.savePinCode({code: code, confirmed: true})
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
    const {t, token, methods_auth, confirmed_auth, pinCode, languages_key} = this.props;
    const {showPopup} = this.state;

    return (
      <Container style={styles.container}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          keyboardShouldPersistTaps='handled'
          style={{flex:1}}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-around'}}
        >
          <Header backDisabled={true} search={true} navigation = {this.props.navigation} />
          {/* <HeaderBottom language={languages_key} islanguages={!token} changeLang={(value)=>this.changeLang(value)}  /> */}
          {(!token) && this.renderAuthView()}
          {(token && !methods_auth) && this.renderConfirmCodeChoose()}
          {(token && methods_auth === 'code' && !confirmed_auth && !pinCode) && this.renderPinCode('new')}
          {(token && methods_auth === 'code' && !confirmed_auth && pinCode) && this.renderPinCode('confirm')}
          {(token && methods_auth && methods_auth !== 'code' && !confirmed_auth) && this.renderTouchFaceId()}
        </KeyboardAwareScrollView>
        <Popup
          show={showPopup}
          firstText={t('authorization:phone_not_register')}
          email={'info@diagnostika.kz'}
          laberButton={ t('common:actions.ok') }
          actionButton={this.clickOnPopup}
        />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: white,
  },
  logo: {
    position: 'absolute',
    zIndex: 10
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center'
  },
  input: {
    width: width-50,
    height: 50,
    paddingLeft: 60,
    paddingRight: 10,
    fontSize: large,
    fontFamily: mainFont,
    color: mediumBlack,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: accentBlue,
  },
  textInpWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: 50,
    backgroundColor: accentBlue,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInp: {
    fontSize: main,
    fontFamily: mainFont,
    color: 'white'
  },
  title: {
    color: 'white',
    fontFamily: mainFont,
    fontSize: large,
    position: 'absolute',
    top: -60,
    zIndex: 1,
    left: 0,
    textAlign: 'center',
    width: width
  }
});

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
  return bindActionCreators({...AuthActions, ...ContentActions}, dispatch)
}

export default withNamespaces(['authorization', 'common'])(connect(mapStateToProps, mapDispatchToProps)(AuthorizationScreen));
