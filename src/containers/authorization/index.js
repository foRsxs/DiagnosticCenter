import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Image, TextInput, ActivityIndicator, TouchableOpacity, AsyncStorage } from 'react-native';
import { Text, ListItem, Container, Left, Right, CheckBox, Content } from 'native-base';
import * as AuthActions from '../../actions/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TouchID from 'react-native-touch-id';

import variables from '../../styles/variables';
import CustomBtn from '../../components/common/CustomBtn';
import ConfirmationCode from '../../components/autorization/ConfirmationCode';

let { width, height } = Dimensions.get('window');
const {blue} = variables.colors;
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
    //this.props.navigation.navigate('specialization')
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

  authUser = () => {
    let {number, personalId} = this.state;
    this.setState({loading: true})
    this.props.authUser({phone: ' ', iin: '180705501683'})
      .then((resp)=>{
        this.setState({message: ''});
      })
      .catch((e)=> this.setState({message: e.error}))
    this.setState({loading: false})  
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
        } else if (biometryType === 'TouchID'){
          // Touch ID is supported on IOS
          this.setState({isTouchId: true}) ;         
        } else if (biometryType === true) {
          // Touch ID is supported on Android
          this.setState({isTouchId: true}) ;    
	      }
      })
      .catch(() => {
        this.setState({isTouchId: false, isFaceId: false})
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
      <View style={{position: 'relative', zIndex: 2, flex: 1}}>
        <Text style={styles.title}>Выберите метод входа</Text>
        <Content>
          <ListItem style={{marginRight: 0, marginLeft: 0, paddingRight: 11}} onPress={()=>this.setState({methods_auth_local:'code'})}>
            <Left>
              <Text >Пин код</Text>
            </Left>
            <Right>
              <CheckBox onPress={()=>this.setState({methods_auth_local:'code'})} checked={(methods_auth_local==='code')} color={blue}/>
            </Right>
          </ListItem>
          {
            (isTouchId) && (
              <ListItem style={{marginRight: 0, marginLeft: 0, paddingRight: 11}} onPress={()=>this.setState({methods_auth_local:'touch'})}>
                <Left>
                  <Text >Touch ID</Text>
                </Left>
                <Right>
                  <CheckBox onPress={()=>this.setState({methods_auth_local:'touch'})} checked={(methods_auth_local==='touch')} color={blue}/>
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
                  <CheckBox onPress={()=>this.setState({methods_auth_local:'face'})} checked={(methods_auth_local==='face')} color={blue}/>
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
      <View style={{position: 'relative',  alignItems: 'center', zIndex: 2, height: height-150}}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', width: width, top: -95, position: 'absolute' }}>
          <Text style={this.state.rusOn ? styles.langOn : styles.langOf} onPress={this.changeLang}>РУС</Text>
          <Text style={styles.langOf}>|</Text>
          <Text style={this.state.rusOn ? styles.langOf : styles.langOn} onPress={this.changeLang}>KAZ</Text>
        </View>
 
          <Image style={{top: -60, position: 'absolute', zIndex: 1 }} fadeDuration={0} source={require('../../../assets/img/logo.png')} />
          <View style={styles.content}>
            <Text style={{ textAlign: 'center', color: variables.colors.darkBlue, marginTop: 55, marginBottom: 40}}>областной {"\n"} консультативно диагностический {"\n"} медицинский центр</Text>
            <View style={{marginBottom: 20}}>
              <View style={{ alignItems: 'center' }}>
                <TextInput style={styles.input} onChangeText={(text) => this.onChangeNumber(text)} placeholder='' />
              </View>
              <Text style={styles.textInp} keyboardType='number-pad'>тел</Text>
            </View>
            <View>
              <View style={{ alignItems: 'center' }}>
                <TextInput style={styles.input} onChangeText={(text) => this.onChangeId(text)} placeholder='' />
              </View>
              <Text style={styles.textInp}>иин</Text>
            </View>
            {(message.length)?<Text style={{color: 'red', textAlign: 'center', marginTop: 10, fontSize: normal}}>{message}</Text>:false}
           
          </View>
          {(loading)? (<ActivityIndicator size="small" color={blue} />): (<CustomBtn label='Запросить код' onClick={()=>this.authUser()} />)}    
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

    return (
      <View style={{position: 'relative', zIndex: 2, flex: 1}}>
        <Text style={styles.title}>{(type == 'new')?'Создайте пин код': 'Введите пин код'}</Text> 
        <Content contentContainerStyle={{position: 'relative', zIndex: 2, justifyContent: 'space-between', padding: 15, height: '100%'}} >      
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
        <KeyboardAwareScrollView enableOnAndroid={true} keyboardShouldPersistTaps='handled' style={{flex:1}} contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 15, paddingBottom: 20, justifyContent: 'space-around'}} >
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
    backgroundColor: variables.colors.blue
  },
  oval: {
    width: width,
    height: width,
    borderRadius: width,
    backgroundColor: variables.colors.blue,
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
    width: width - 40,
    height: 50,
    paddingLeft: 60,
    paddingRight: 10,
    fontSize: variables.fSize.large,
    fontFamily: variables.fonts.mainFont,
    color: variables.colors.lightBlack,
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
    color: variables.colors.lightBlack
  },
  title: {
    color: 'white', fontFamily: mainFont, fontSize: large, position: 'absolute', top: -50, zIndex: 1, left: 0, textAlign: 'center', width: '100%', 
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