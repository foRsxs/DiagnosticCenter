import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, ListItem, Container, Left, Right, CheckBox, Content } from 'native-base';
import { withNamespaces } from 'react-i18next';
import * as AuthActions from '../../actions/auth';
import * as ContentActions from '../../actions/content';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TouchID from 'react-native-touch-id';

import Header from '../../components/common/Header';
import CustomBtn from '../../components/common/CustomBtn';
import ConfirmationCode from '../../components/ConfirmationCode';
import Popup from '../../components/common/Popup';
import styles from './styles';

import { ACCENT_BLUE } from '../../styles/constants';

class AuthMethodScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      methods_auth_local: 'code',
      message: '',
      loading: false,
      isTouchId: false,
      isFaceId: false,
      showPopup: false,
      user: {}
    };
  }

  componentDidMount() {
    console.log(1);
    const { notify, token, methods_auth, pinCode } = this.props;

    this.props.changeNotify(notify);
    if (token) {
      this.props.saveUser({ api_token: token });
    }
    this.props.changeMethodsAuth({ methods_auth: methods_auth, confirmed: false });
    this.props.savePinCode({ code: pinCode, confirmed: false });
    this._checkTouchSupport();
  }

  componentWillReceiveProps(newProps) {
    console.log(0, newProps);
    if (newProps.confirmed_auth) this.props.navigation.navigate('profile');
  }

  clickOnPopup = () => {
    this.setState({ showPopup: false });
  }

  _confirmCode = (code) => {
    let { t, pinCode, setAuthorized } = this.props;

    if (+code === +pinCode) {
      this.setState({ message: '' });
      setAuthorized(true);
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
        this.props.setAuthorized(true);
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
              <Text style={styles.textItem}>{t('authorization:auth_type.pin_code')}</Text>
            </Left>
            <Right>
              <CheckBox style={styles.checkStyle} onPress={() => this.setState({ methods_auth_local: 'code' })} checked={(methods_auth_local === 'code')} color={ACCENT_BLUE} />
            </Right>
          </ListItem>
          {
            (isTouchId) && (
              <ListItem style={styles.confirmListItem} onPress={() => this.setState({ methods_auth_local: 'touch' })}>
                <Left>
                  <Text style={styles.textItem}>{t('authorization:auth_type.touch_id')}</Text>
                </Left>
                <Right>
                  <CheckBox style={styles.checkStyle} onPress={() => this.setState({ methods_auth_local: 'touch' })} checked={(methods_auth_local === 'touch')} color={ACCENT_BLUE} />
                </Right>
              </ListItem>
            )
          }
          {
            (isFaceId) && (
              <ListItem style={styles.confirmListItem} onPress={() => this.setState({ methods_auth_local: 'face' })}>
                <Left>
                  <Text style={styles.textItem}>{t('authorization:auth_type.face_id')}</Text>
                </Left>
                <Right>
                  <CheckBox style={styles.checkStyle} onPress={() => this.setState({ methods_auth_local: 'face' })} checked={(methods_auth_local === 'face')} color={ACCENT_BLUE} />
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
                  this.props.savePinCode({ code: code, confirmed: true });
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
    const { t, token, methods_auth, confirmed_auth, pinCode, enableSecure } = this.props;
    const { showPopup } = this.state;

    return (
      <Container style={styles.container}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          keyboardShouldPersistTaps='handled'
          style={styles.wrapMain}
          contentContainerStyle={styles.contentStyleMain}
        >
          <Header isHome={false} isPin={true} backButton={false} callButton={false} search={false} navigation={this.props.navigation} />
          {(token && enableSecure && !methods_auth) && this.renderConfirmCodeChoose()}
          {(token && enableSecure && methods_auth === 'code' && !confirmed_auth && !pinCode) && this.renderPinCode('new')}
          {(token && enableSecure && methods_auth === 'code' && !confirmed_auth && pinCode) && this.renderPinCode('confirm')}
          {(token && enableSecure && methods_auth && methods_auth !== 'code' && !confirmed_auth) && this.renderTouchFaceId()}
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
    methods_auth: state.authorization.methods_auth,
    pinCode: state.authorization.pinCode,
    confirmed_auth: state.authorization.confirmed_auth,
    notify: state.authorization.notify,
    user: state.authorization.user,
    enableSecure: state.authorization.enableSecure
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...AuthActions, ...ContentActions }, dispatch)
}

export default withNamespaces(['authorization', 'common'])(connect(mapStateToProps, mapDispatchToProps)(AuthMethodScreen));
