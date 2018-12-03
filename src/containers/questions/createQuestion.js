import React, {Component} from 'react';
import {BackHandler} from 'react-native';
import {Container, Toast} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import FormSend from '../../components/common/Form';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';

class QuestionFormScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doc_id: (props.navigation.state.params) ? props.navigation.state.params.doc_id : null
    };
  }
  
  getData = (data) => {
    const {doc_id} = this.state;
    this.props.sendQuestion({type: 'questions', doc_id , ...data});
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
          text: t('common:actions_text.question_sent')
        });
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
    const { t, profile, loading } = this.props;

    return (
      <Container>
        <KeyboardAwareScrollView  enableOnAndroid={true} keyboardShouldPersistTaps='handled' contentContainerStyle={{flexGrow: 1, paddingBottom: 5}}>
          <Header text={ t('questions:form.title') } navigation = {this.props.navigation}/>
          <HeaderBottom text={ t('questions:form.sub_title') } />
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

export default withNamespaces(['questions', 'common'])(connect(mapStateToProps, mapDispatchToProps)(QuestionFormScreen));
