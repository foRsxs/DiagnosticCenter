import React, {Component} from 'react';
import {StyleSheet, BackHandler} from 'react-native';
import {Container} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import i18n from '../../i18n';
import FormSend from '../../components/common/Form';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';



class FuqScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formData: ''
    };
  }
  
  getData = (info) => {
    this.setState({formData: info});     
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
      <Container>
        <KeyboardAwareScrollView  enableOnAndroid={true} keyboardShouldPersistTaps='handled' contentContainerStyle={{flexGrow: 1, paddingHorizontal: 15, paddingBottom: 5}}>
          <Header text="ОБРАТНАЯ СВЯЗЬ" navigation = {this.props.navigation}/>
          <HeaderBottom text="напишите нам" />
          <FormSend sendData={this.getData}/>
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}

export default FuqScreen;
