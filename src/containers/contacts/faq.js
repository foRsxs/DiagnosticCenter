import React, {Component} from 'react';
import {StyleSheet, BackHandler} from 'react-native';
import {Container, Toast} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import i18n from '../../i18n';
import * as ContentActions from '../../actions/content';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormSend from '../../components/common/Form';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';

class FaqScreen extends Component {
  constructor(props) {
    super(props);
  }
  
  getData = (data) => {
    this.props.sendQuestion({type: 'faq', ...data});
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentDidUpdate(prevProps) {
    if (this.props.status !== prevProps.status) {
      if (this.props.status) {
        Toast.show({
          text: 'Ваш вопрос успешно отправлен'
        })
      } else {
        Toast.hide();
      }
    }
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }

  render() {
    const {profile, loading} = this.props;

    return (
      <Container>
        <KeyboardAwareScrollView  enableOnAndroid={true} keyboardShouldPersistTaps='handled' contentContainerStyle={{flexGrow: 1, paddingBottom: 5}}>
          <Header text="ОБРАТНАЯ СВЯЗЬ" navigation = {this.props.navigation}/>
          <HeaderBottom text="напишите нам" />
          <FormSend sendData={this.getData} email={profile.email} loading={loading}/>
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    profile: state.authorization.user,
    status: state.content.newQuestion.status,
    loading: state.content.newQuestion.loading,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FaqScreen)
