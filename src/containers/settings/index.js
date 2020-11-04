import React, { Component } from 'react';
import { BackHandler, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text, Icon, Picker, Form, Switch } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AuthActions from '../../actions/auth';
import CustomBtn from '../../components/common/CustomBtn';
import Header from '../../components/common/Header';

import styles from './styles';
import variables from '../../styles/variables';
const { medium } = variables.fSize;

class SettingsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      local_auth_methods: props.methods_auth,
      local_languages_key: props.languages_key,
      local_secure: props.enableSecure,
      local_notify: props.notify,
      showButton: false,
    };
  }

  switchNotify = (value) => {
    this.setState({ local_notify: value });
  }
  
  switchSecure = (value) => {
    this.setState({ local_secure: value });
  }

  onAuthChange(value) {
    this.setState({ local_auth_methods: value });
  }

  _saveChanges = () => {
    const { local_notify, local_auth_methods, local_languages_key, local_secure } = this.state;
    const { notify, methods_auth, savePinCode, changeMethodsAuth, navigation, languages_key, enableSecure, updateSecure, setLanguage, changeNotify } = this.props;

    if (languages_key !== local_languages_key) {
      setLanguage(local_languages_key);
    }

    if (notify !== local_notify) {
      changeNotify(local_notify);
    }

    if (local_secure !== enableSecure) {
      updateSecure(local_secure);
      changeMethodsAuth({ methods_auth: null, confirmed: false });
      if (local_secure) {
        changeMethodsAuth({ methods_auth: null, confirmed: false });
        return navigation.navigate('AuthMethods');
      } else {
        changeMethodsAuth({ methods_auth: null, confirmed: true });
        savePinCode({ code: null, confirmed: true });
      }
    }

    if (methods_auth !== local_auth_methods) {
      savePinCode({ code: null, confirmed: false });
      if (local_auth_methods === 'code') {
        changeMethodsAuth({ methods_auth: local_auth_methods, confirmed: false });
        return navigation.navigate('AuthMethods');
      } else {
        changeMethodsAuth({ methods_auth: local_auth_methods, confirmed: true });
      }
    }
    navigation.goBack();
  }

  changeLang = (key) => {
    if (key === this.state.local_languages_key) return;
    this.setState({ local_languages_key: key })
  }

  render() {
    const { t, notify, methods_auth, device_touch, device_face, languages_key, pinCode, changeMethodsAuth, navigation, savePinCode, enableSecure } = this.props;
    const { local_notify, local_auth_methods, local_languages_key, local_secure } = this.state;

    return (
      <Container contentContainerStyle={styles.mainContainer}>
        <Header backButton={true} text={t('settings:title')} navigation={this.props.navigation} />
        <Content style={styles.mainContent} padder>
          <View style={styles.settingItem}>
            <Text style={styles.headTxt}>{t('settings:items.language')}</Text>
            <Form style={styles.form}>
              <Picker
                mode="dropdown"
                style={styles.pickerWrap}
                textStyle= {{
                  fontSize: medium
                }}
                itemTextStyle= {{
                  fontSize: medium
                }}
                selectedValue={local_languages_key}
                onValueChange={this.changeLang.bind(this)}
                headerBackButtonText={t('common:actions.back')}
                iosHeader={t('common:actions_text.select_language')}
                iosIcon={<Icon style={styles.pickerIcon} type="Fontisto" name="angle-down" />}
              >
                <Picker.Item label="Рус" value="ru" />
                <Picker.Item label="Kaз" value="kz" />
                <Picker.Item label="Eng" value="en" />
              </Picker>
            </Form>
          </View>
          
          <View style={[styles.settingItem, { marginTop: 10 }]}>
            <Text style={styles.headTxt}>{t('settings:items.push')}</Text>
            <Switch
              style={styles.switchStyle}
              onValueChange={this.switchNotify}
              value={local_notify}
            />
          </View>
          <View style={[styles.settingItem, { marginTop: 20 }]}>
            <Text style={styles.headTxt}>{(local_secure)? t('settings:items.secureDisable'): t('settings:items.secureEnable')}</Text>
            <Switch
              style={styles.switchStyle}
              onValueChange={this.switchSecure}
              value={local_secure}
            />
          </View>
          { ((!!enableSecure) &&(!!device_touch || !!device_face)) && (
            <View style={[styles.settingItem, { marginTop: 10 }]}>
              <Text style={styles.headTxt}>{t('settings:items.auth')}</Text>
              <Form style={styles.form}>
                {(device_touch) && (
                  <Picker
                    mode="dropdown"
                    style={styles.pickerWrap}
                    selectedValue={local_auth_methods}
                    onValueChange={this.onAuthChange.bind(this)}
                    headerBackButtonText={t('common:actions.back')}
                    iosHeader={t('common:actions_text.select_auth_method')}
                    iosIcon={<Icon style={styles.pickerIcon} type="Fontisto" name="angle-right" />}
                  >
                    <Picker.Item label="Code" value="code" />
                    <Picker.Item label={t('authorization:auth_type.touch_id')} value="touch" />
                  </Picker>
                )
                }
                {
                  (!!device_face) && (
                    <Picker
                      mode="dropdown"
                      style={styles.pickerWrap}
                      selectedValue={local_auth_methods}
                      onValueChange={this.onAuthChange.bind(this)}
                      headerBackButtonText={t('common:actions.back')}
                      iosHeader={t('common:actions_text.select_auth_method')}
                      iosIcon={<Icon style={styles.pickerIcon} type="Fontisto" name="angle-right" />}
                    >
                      <Picker.Item label="Code" value="code" />
                      <Picker.Item label={t('authorization:auth_type.face_id')} value="face" />
                    </Picker>
                  )
                }
              </Form>
            </View>
          )}
          {
            (!!pinCode) && (
              <TouchableOpacity 
                style={{marginTop: 10}}
                activeOpacity={0.8}
                onPress={()=> {
                  savePinCode({ code: null, confirmed: false });
                  changeMethodsAuth({ methods_auth: local_auth_methods, confirmed: false });
                  navigation.navigate('AuthMethods');
                }}
                >
                <View style={[styles.settingItem]}>
                  <Text style={styles.headTxt}>{t('settings:items.newPinCode')}</Text>
                </View>
              </TouchableOpacity>
            )
          }
        </Content>
        {
          (local_auth_methods !== methods_auth || local_languages_key !== languages_key || local_notify !== notify || local_secure !== enableSecure) && (
            <View style={styles.btnWrap}>
              <CustomBtn label={t('common:actions.save')} onClick={() => this._saveChanges()} />
            </View>
          )
        }
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    notify: state.authorization.notify,
    methods_auth: state.authorization.methods_auth,
    device_touch: state.authorization.device_touch,
    device_face: state.authorization.device_face,
    languages_key: state.authorization.language,
    pinCode: state.authorization.pinCode,
    enableSecure: state.authorization.enableSecure
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AuthActions, dispatch)
}

export default withNamespaces(['settings', 'authorization', 'common'])(connect(mapStateToProps, mapDispatchToProps)(SettingsScreen));
