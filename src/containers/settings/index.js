import React, {Component} from 'react';
import {StyleSheet, BackHandler, AsyncStorage} from 'react-native';
import {Container, Content, View, Text, Icon, Picker, Form, Switch} from 'native-base';
import i18n from '../../i18n';
import * as AuthActions from '../../actions/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CustomBtn from '../../components/common/CustomBtn';
import variables from '../../styles/variables';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';


class SettingsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      language: "key1",
      local_auth_methods: props.methods_auth,
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

  onLanguageChange(value) {
    this.setState({
      language: value
    });
  } 

  onAuthChange(value) {
    this.setState({local_auth_methods: value});
    
  }


  _saveChanges = () => {
    const {local_auth_methods} = this.state;
    const {methods_auth, savePinCode, changeMethodsAuth, navigation} = this.props;

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

  render() {
    const {methods_auth, device_touch} = this.props;
    const {local_auth_methods} = this.state;
    return (
      <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
          <Header text="НАСТРОЙКИ" navigation = {this.props.navigation}/>
          <HeaderBottom />
          <Content style={{marginTop: -10, zIndex: 1, paddingTop: 10}} padder>
            <View style={styles.settingItem}>
              <Text style={styles.headTxt}>Язык интерфейса</Text>
              <Form style={{ width: '40%' }}>
                <Picker
                  mode="dropdown"
                  style={{width: '100%', position: 'relative'}}
                  selectedValue={this.state.language}
                  onValueChange={this.onLanguageChange.bind(this)}
                  headerBackButtonText="Назад"
                  iosHeader="Выберите язык интерфейса"
                  iosIcon={<Icon style={styles.pickerIcon} name="ios-arrow-down-outline" />}
                >
                  <Picker.Item label="Рус" value="key0" />
                  <Picker.Item label="Русский" value="key1" />
                </Picker>
              </Form>
            </View>
            <View style={styles.settingItem}>
              <Text style={styles.headTxt}>Авторизация</Text>
              <Form style={{ width: '40%' }}>
                <Picker
                  mode="dropdown"
                  style={{width: '100%', position: 'relative'}}
                  selectedValue={local_auth_methods}
                  onValueChange={this.onAuthChange.bind(this)}
                  headerBackButtonText="Назад"
                  iosHeader="Выберите метод авторизации"
                  iosIcon={<Icon style={styles.pickerIcon} name="ios-arrow-down-outline" />}
                >
                  <Picker.Item label="Code" value="code"/>
                  {(device_touch) ? <Picker.Item label="TouchId" value="touch"/>: <Picker.Item label="FaceId" value="face" />}
                </Picker>
              </Form>
            </View>
            <View style={[styles.settingItem, {marginTop: 10}]}>
              <Text style={styles.headTxt}>Push уведомления</Text>
              <Switch
                onValueChange={this.switchOne}
                value={this.state.switchone}
              />
            </View>
          </Content>
          {
            (local_auth_methods !== methods_auth) ? (
              <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
                <CustomBtn label='СОХРАНИТЬ' onClick={() => this._saveChanges()}/>
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
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AuthActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
