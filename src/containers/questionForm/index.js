import React, {Component} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Container, Button, Text} from 'native-base';
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

  componentDidMount() {}

  render() {
    return (
      <KeyboardAwareScrollView>
      <Container>
        <Header text="ВОПРОС ВРАЧУ" navigation = {this.props.navigation}/>
        <HeaderBottom search={true} />
        <FormSend sendData={this.getData}/>
      </Container>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  
});

export default QuestionFormScreen;
