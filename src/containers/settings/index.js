import React, {Component} from 'react';
import {StyleSheet, BackHandler, AsyncStorage} from 'react-native';
import {Container, Content, View, Text, Icon, Picker, Form, Switch} from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AuthActions from '../../actions/auth';
import CustomBtn from '../../components/common/CustomBtn';
import variables from '../../styles/variables';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';

class SettingsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      local_auth_methods: props.methods_auth,
      local_languages_key: props.languages_key,
      switchone: false,
      showButton: false
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  switchOne = (value) => {
    this.setState({ switchone: value });
  }

  onAuthChange(value) {
    this.setState({local_auth_methods: value});
  }

  _saveChanges = () => {
    const {local_auth_methods, local_languages_key} = this.state;
    const {methods_auth, savePinCode, changeMethodsAuth, navigation, languages_key} = this.props;

    if (languages_key !== local_languages_key) {
      this.props.setLanguage(local_languages_key);
    }
    if (methods_auth !== local_auth_methods) {
      savePinCode({code: null, confirmed: false});
      AsyncStorage.removeItem('pinCode');
      if (local_auth_methods === 'code') {
        changeMethodsAuth({methods_auth: local_auth_methods, confirmed: false});
        navigation.navigate('authorization');
      } else {
        changeMethodsAuth({methods_auth: local_auth_methods, confirmed: true});
      }
    }
  }
  
  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }

  changeLang = (key) => {
    if (key === this.state.local_languages_key) return;
    this.setState({local_languages_key: key})
  }

  render() {
    const { t, methods_auth, device_touch, device_face, languages_key } = this.props;
    const { local_auth_methods, local_languages_key } = this.state;

    return (
      <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
          <Header text={ t('settings:title') } navigation = {this.props.navigation}/>
          <HeaderBottom />
          <Content style={{marginTop: -10, zIndex: 1, paddingTop: 10}} padder>
            <View style={styles.settingItem}>
              <Text style={styles.headTxt}>{ t('settings:items.language') }</Text>
              <Form style={{ width: '40%' }}>
                <Picker
                  mode="dropdown"
                  style={{width: '100%', position: 'relative'}}
                  selectedValue={local_languages_key}
                  onValueChange={this.changeLang.bind(this)}
                  headerBackButtonText={ t('common:actions.back') }
                  iosHeader={ t('common:actions_text.select_language') }
                  iosIcon={<Icon style={styles.pickerIcon} name="ios-arrow-down-outline" />}
                >
                  <Picker.Item label="Рус" value="ru" />
                  <Picker.Item label="Kaз" value="kz" />
                  <Picker.Item label="Eng" value="en" />
                </Picker>
              </Form>
            </View>
            <View style={styles.settingItem}>
              <Text style={styles.headTxt}>{ t('settings:items.auth') }</Text>
              <Form style={{ width: '40%' }}>
                {(device_touch) && (
                    <Picker
                      mode="dropdown"
                      style={{width: '100%', position: 'relative'}}
                      selectedValue={local_auth_methods}
                      onValueChange={this.onAuthChange.bind(this)}
                      headerBackButtonText={ t('common:actions.back') }
                      iosHeader={ t('common:actions_text.select_auth_method') }
                      iosIcon={<Icon style={styles.pickerIcon} name="ios-arrow-down-outline" />}
                    >
                      <Picker.Item label="Code" value="code"/>
                      <Picker.Item label={ t('authorization:auth_type.touch_id') } value="touch"/>
                    </Picker>
                  )
                }
                {
                  (device_face) && (
                    <Picker
                      mode="dropdown"
                      style={{width: '100%', position: 'relative'}}
                      selectedValue={local_auth_methods}
                      onValueChange={this.onAuthChange.bind(this)}
                      headerBackButtonText={ t('common:actions.back') }
                      iosHeader={ t('common:actions_text.select_auth_method') }
                      iosIcon={<Icon style={styles.pickerIcon} name="ios-arrow-down-outline" />}
                    >
                      <Picker.Item label="Code" value="code"/>
                      <Picker.Item label={ t('authorization:auth_type.face_id') } value="face" />
                    </Picker>
                  )
                }
              </Form>
            </View>
            {/* <View style={[styles.settingItem, {marginTop: 10}]}>
              <Text style={styles.headTxt}>{ t('settings:items.push') }</Text>
              <Switch
                onValueChange={this.switchOne}
                value={this.state.switchone}
              />
            </View> */}
          </Content>
          {
            (local_auth_methods !== methods_auth || local_languages_key !== languages_key) ? (
              <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
                <CustomBtn label={ t('common:actions.save') } onClick={() => this._saveChanges()}/>
              </View>
            ): false
          }
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  settingItem: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  headTxt: {
    fontSize: variables.fSize.medium,
    fontFamily: variables.fonts.mainFont,
    color: variables.colors.mediumBlack,
    width: '60%'
  },
  pickerIcon: {
    position: 'absolute', 
    top: 10,
    right: 5, 
    backgroundColor: 'white', 
    marginLeft: 0,
    paddingHorizontal: 5, 
    paddingTop: 0, 
    marginRight: 0
  },  
});

function mapStateToProps(state) {
  return {
    methods_auth: state.authorization.methods_auth,
    device_touch: state.authorization.device_touch,
    device_face: state.authorization.device_face,
    languages_key: state.authorization.language
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AuthActions, dispatch)
}

export default withNamespaces(['settings', 'authorization', 'common'])(connect(mapStateToProps, mapDispatchToProps)(SettingsScreen));
