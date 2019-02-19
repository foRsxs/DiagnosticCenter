import React, {Component} from 'react';
import { StyleSheet, BackHandler } from 'react-native';
import { Container, Content, View, Text, Icon, Picker, Form, Switch } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AuthActions from '../../actions/auth';
import CustomBtn from '../../components/common/CustomBtn';
import variables from '../../styles/variables';
import Header from '../../components/common/Header';

import { MEDIUM_BLACK, MAIN_FONT } from '../../styles/constants';

class SettingsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      local_auth_methods: props.methods_auth,
      local_languages_key: props.languages_key,
      local_notify: props.notify,
      showButton: false
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  switchNotify = (value) => {
    this.setState({ local_notify: value });
  }

  onAuthChange(value) {
    this.setState({ local_auth_methods: value });
  }

  _saveChanges = () => {
    const {local_notify, local_auth_methods, local_languages_key} = this.state;
    const {notify, methods_auth, savePinCode, changeMethodsAuth, navigation, languages_key} = this.props;

    if (languages_key !== local_languages_key) {
      this.props.setLanguage(local_languages_key);
    }
    
    if (notify !== local_notify) {
      this.props.changeNotify(local_notify);
    }

    if (methods_auth !== local_auth_methods) {
      savePinCode({code: null, confirmed: false});
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
    const { t, notify, methods_auth, device_touch, device_face, languages_key } = this.props;
    const { local_notify, local_auth_methods, local_languages_key } = this.state;

    return (
      <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
        <Header backButton={true} text={ t('settings:title') } navigation = {this.props.navigation}/>
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
          {(device_touch || device_face) && (
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
          )}
          <View style={[styles.settingItem, {marginTop: 10}]}>
            <Text style={styles.headTxt}>{ t('settings:items.push') }</Text>
            <Switch
              onValueChange={this.switchNotify}
              value={local_notify}
            />
          </View>           
        </Content>
        {
          (local_auth_methods !== methods_auth || local_languages_key !== languages_key || local_notify !== notify) && (
            <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
              <CustomBtn label={ t('common:actions.save') } onClick={() => this._saveChanges()}/>
            </View>
          )
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
    fontFamily: MAIN_FONT,
    color: MEDIUM_BLACK,
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
    notify: state.authorization.notify,
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
