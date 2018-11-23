import React, {Component} from 'react';
import {BackHandler} from 'react-native';
import {Container} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import i18n from '../../i18n';
import FormSend from '../../components/common/Form';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';



class QuestionFormScreen extends Component {

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
        <KeyboardAwareScrollView  enableOnAndroid={true} keyboardShouldPersistTaps='handled' contentContainerStyle={{flexGrow: 1, paddingBottom: 5}}>
          <Header text="ВОПРОС ВРАЧУ" navigation = {this.props.navigation}/>
          <HeaderBottom text="напишите свой вопрос" />
          <FormSend sendData={this.getData}/>
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}

export default QuestionFormScreen;
