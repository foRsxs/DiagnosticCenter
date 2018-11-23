import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Image, TextInput, ActivityIndicator, TouchableOpacity, AsyncStorage } from 'react-native';
import { Text, ListItem, Container, Left, Right, CheckBox, Content } from 'native-base';
import * as AuthActions from '../../actions/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TouchID from 'react-native-touch-id';
import TextInputMask from 'react-native-text-input-mask';

import variables from '../../styles/variables';
import CustomBtn from '../../components/common/CustomBtn';
import ConfirmationCode from '../../components/autorization/ConfirmationCode';

let { width, height } = Dimensions.get('window');
const {accentBlue} = variables.colors;
const {mainFont} = variables.fonts;
const {large, normal} = variables.fSize;

class AuthorizationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rusOn: true,
      number: '',
      personalId: '',
      methods_auth_local: 'code',
      message: '',
      loading: false,
      isTouchId: false,
      isFaceId: false
    };
  }

  componentDidMount() {
    this._checkTouchSupport();
    //AsyncStorage.clear()
    AsyncStorage.getItem('api_token').then((resp)=>{
      this.props.saveUser({api_token: resp});
    })
    AsyncStorage.getItem('methods_auth').then((resp)=>{
      this.props.changeMethodsAuth({methods_auth: resp, confirmed: false});
    })
    AsyncStorage.getItem('pinCode').then((resp)=>{
      this.props.savePinCode({code:resp, confirmed: false});
      SplashScreen.hide();
    })
  }

  componentWillReceiveProps(newProps) {
    if (newProps.confirmed_auth) this.props.navigation.navigate('home');
    
  }

  changeLang = () => {
    this.setState(state => ({ rusOn: !state.rusOn }))
  }

  onChangeNumber = (value) => {
    this.setState({ number: value });
  }

  onChangeId = (value) => {
    this.setState({ personalId: value });
  }

  checkValid = (number, personalId) => {
    let result = true;
    if (number.length < 10) {
       this.setState({message: 'Некорректный номер телефона'});
       result = false;
    } else if (personalId.length < 12) {
      this.setState({message: 'Некорректный номер иин'});
      result = false;
    } else {
      this.setState({message: ''})
    }
    return result
  }
  authUser = () => {
    let {number, personalId} = this.state;
    if (this.checkValid(number, personalId)) {
      this.setState({loading: true})
      this.props.authUser({phone: 7059809008, iin: 180705501683})//this.props.authUser({phone: number, iin: personalId})
        .then((resp)=>{
          this.setState({message: ''});
        })
        .catch((e)=> this.setState({message: e.error}))
      this.setState({loading: false}) 
    }
  }

  _confirmCode = (code) => {
    if (+code === +this.props.pinCode) {
      this.setState({message: ''});
      this.props.setAuthorized();
    } else {
      this.setState({message: 'неверный пин код '});
    }
  }

  _checkTouchSupport = () => {
    TouchID.isSupported()
      .then(biometryType => {
        if (biometryType === 'FaceID') {
          // Face ID is supported on IOS
          this.setState({isFaceId: true});
          this.props.setMethodsAuthDevice({face: true, touch: false});
        } else if (biometryType === 'TouchID'){
          // Touch ID is supported on IOS
          this.setState({isTouchId: true});  
          this.props.setMethodsAuthDevice({face: false, touch: true}); 
        } else if (biometryType === true) {
          // Touch ID is supported on Android
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
    const optionalConfigObject = {
      title: "Требуется авторизация", // Android
      color: "#000", // Android
      sensorDescription: (this.state.isTouchId) ? "Отпечаток пальца": "Скан лица", // Android
      cancelText: "Отмена", // Android
    }
    TouchID.authenticate('',optionalConfigObject)
    .then(() => {
      this.props.setAuthorized();
    })
  }

  renderConfirmCodeChoose() {
    let {methods_auth_local, isFaceId, isTouchId} = this.state;
    let {changeMethodsAuth} = this.props;

    return (
      <View style={{position: 'relative', zIndex: 2, flex: 1, padding:15, paddingBottom:20}}>
        <Text style={styles.title}>Выберите метод входа</Text>
        <Content>
          <ListItem style={{marginRight: 0, marginLeft: 0, paddingRight: 11}} onPress={()=>this.setState({methods_auth_local:'code'})}>
            <Left>
              <Text >Пин код</Text>
            </Left>
            <Right>
              <CheckBox onPress={()=>this.setState({methods_auth_local:'code'})} checked={(methods_auth_local==='code')} color={accentBlue}/>
            </Right>
          </ListItem>
          {
            (isTouchId) && (
              <ListItem style={{marginRight: 0, marginLeft: 0, paddingRight: 11}} onPress={()=>this.setState({methods_auth_local:'touch'})}>
                <Left>
                  <Text >Touch ID</Text>
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
                  <Text >Face ID</Text>
                </Left>
                <Right>
                  <CheckBox onPress={()=>this.setState({methods_auth_local:'face'})} checked={(methods_auth_local==='face')} color={accentBlue}/>
                </Right>
              </ListItem>
            )
          }
        </Content>
        <CustomBtn label='Сохранить' onClick={()=> changeMethodsAuth({methods_auth: methods_auth_local, confirmed: (methods_auth_local === 'code')? false: true})} />
      </View>
    )
  }

  renderAuthView() {
    const {message, loading} = this.state;

    return (
      <View style={{position: 'relative',  alignItems: 'center', zIndex: 2, height: height-150, padding: 15, paddingBottom: 16}}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', width: width, top: -60, position: 'absolute' }}>
          <Text style={this.state.rusOn ? styles.langOn : styles.langOf} onPress={this.changeLang}>РУС</Text>
          <Text style={styles.langOf}>|</Text>
          <Text style={this.state.rusOn ? styles.langOf : styles.langOn} onPress={this.changeLang}>KAZ</Text>
        </View>
          <Image style={{ zIndex: 1, marginTop: -20, height: 130, marginBottom: 10 }} resizeMode='contain' fadeDuration={0} source={require('../../../assets/img/logo.png')} />
          <View style={styles.content}>
          
            <View style={{marginBottom: 20}}>
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
              <Text style={styles.textInp} >тел</Text>
            </View>
            <View>
              <View style={{ alignItems: 'center' }}>
                <TextInput style={styles.input} onChangeText={(text) => this.onChangeId(text)} placeholder='' keyboardType='number-pad' maxLength={12}/>
              </View>
              <Text style={styles.textInp}>иин</Text>
            </View>
            {(message.length)?<Text style={{color: 'red', textAlign: 'center', marginTop: 10, fontSize: normal}}>{message}</Text>:false}
          </View>
          {(loading)? (<ActivityIndicator size="small" color={accentBlue} />): (<CustomBtn label='Авторизоваться' onClick={()=>this.authUser()} />)}    
      </View>
    )
  }

  renderTouchFaceId() {
    const {isTouchId} = this.state;
    this._openScan()
    return (
      <View style={{position: 'relative', zIndex: 2, flex: 1}} >
        <Text style={styles.title}>{(isTouchId)?'Авторизация через Touch id': 'Авторизация через Face id'}</Text> 
        <TouchableOpacity onPress={()=>this._openScan()} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} activeOpacity={1}>
          <Text style={{color: 'transparent'}}>122</Text>
        </TouchableOpacity>
      </View>
    )
  }
  

  renderPinCode(type) {
    const {message} = this.state;
    const {pinCode} = this.props;
    return (
      <View style={{position: 'relative', zIndex: 2, flex: 1}}>
        <Text style={styles.title}>{(!pinCode)?'Создайте пин код':'Введите пин код'}</Text> 
        <Content contentContainerStyle={{position: 'relative', zIndex: 2, justifyContent: 'space-between', padding: 15, paddingBottom: 20, height: '100%'}} >      
          <ConfirmationCode message={message} onPress={
            (code)=> {
              if (type == 'new') {
                this.props.savePinCode({code: code, confirmed: true})
              } else {
                this._confirmCode(code);
              }
            }
          }/>
        </Content>
      </View>
    )
  }

  render() {
    let {token, methods_auth, confirmed_auth, pinCode} = this.props;

    return (
      <Container style={styles.container}>
        <KeyboardAwareScrollView enableOnAndroid={true} keyboardShouldPersistTaps='handled' style={{flex:1}} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-around'}} >
          <View style={styles.header} />
          <View style={{ alignItems: 'center', marginTop: -width + height / 25, zIndex: 1, backgroundColor: 'rgba(0, 0, 0, 0)' }}>
            <View style={styles.oval} />
          </View>
          {(!token) && this.renderAuthView()}
          {(token && !methods_auth) && this.renderConfirmCodeChoose()}
          {(token && methods_auth === 'code' && !confirmed_auth && !pinCode) && this.renderPinCode('new')}
          {(token && methods_auth === 'code' && !confirmed_auth && pinCode) && this.renderPinCode('confirm')}
          {(token && methods_auth && methods_auth !== 'code' && !confirmed_auth) && this.renderTouchFaceId()}
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: variables.colors.white,
  },
  header: {
    width: '100%',
    height: 100,
    backgroundColor: variables.colors.accentBlue
  },
  oval: {
    width: width,
    height: width,
    borderRadius: width,
    backgroundColor: variables.colors.accentBlue,
    transform: [
      { scaleX: 3 }
    ]
  },
  langOn: {
    color: variables.colors.white,
    margin: 3
  },
  langOf: {
    color: variables.colors.darkBlue,
    margin: 3
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
    width: width-30,
    height: 50,
    paddingLeft: 60,
    paddingRight: 10,
    fontSize: variables.fSize.large,
    fontFamily: variables.fonts.mainFont,
    color: variables.colors.mediumBlack,
    backgroundColor: 'rgba(78, 158, 255, 0.15)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(112, 172, 245, 0.5)',
  },
  textInp: {
    position: 'absolute',
    top: 18,
    left: 15,
    fontSize: variables.fSize.main,
    fontFamily: variables.fonts.mainFont,
    color: variables.colors.mediumBlack
  },
  title: {
    color: 'white', fontFamily: mainFont, fontSize: large, position: 'absolute', top: -50, zIndex: 1, left: 0, textAlign: 'center', width: width, 
  }
});


function mapStateToProps(state) {
  return {
    token: state.authorization.token,
    methods_auth: state.authorization.methods_auth,
    pinCode: state.authorization.pinCode,
    confirmed_auth: state.authorization.confirmed_auth,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AuthActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationScreen)