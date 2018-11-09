import React, {Component} from 'react';
import {Alert, StyleSheet, BackHandler} from 'react-native';
import {Container, Content, View, Text, Icon, Picker, Form, Switch} from 'native-base';
import i18n from '../../i18n';
import CustomBtn from '../../components/common/CustomBtn';
import variables from '../../styles/variables';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';


class SettingsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      language: "key1",
      auth: "key1",
      switchone: false,
    };
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
    this.setState({
      auth: value
    });
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }

  render() {
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
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  selectedValue={this.state.language}
                  onValueChange={this.onLanguageChange.bind(this)}
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
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  
                  selectedValue={this.state.auth}
                  onValueChange={this.onAuthChange.bind(this)}
                >
                  <Picker.Item label="Code" value="key0" />
                  <Picker.Item label="FaceId" value="key1" />
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
          </Content >
          <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
            <CustomBtn label='СОХРАНИТЬ' onClick={()=>{Alert.alert('ok')}}/>
          </View>
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
  }
});

export default SettingsScreen;
