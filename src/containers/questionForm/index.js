import React, { Component } from 'react';
import { Container, Toast } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import FormSend from '../../components/common/Form';
import Header from '../../components/common/Header';
import styles from './styles';

class QuestionFormScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      docdep: (props.navigation.state.params) ? props.navigation.state.params.docdep : null,
    };
  }

  getData = (data) => {
    const { docdep } = this.state;

    this.props.sendQuestion({ type: 'questions', docdep, ...data });
  }

  componentDidUpdate(prevProps) {
    const { t, navigation } = this.props;
    const { docdep } = this.state;

    if (this.props.status !== prevProps.status) {
      if (this.props.status) {
        Toast.show({ text: t('common:actions_text.question_sent') });
        setTimeout(()=> {
        Toast.hide();
        this.props.getQuestions(docdep);
        navigation.goBack();
        }, 3000);
      }
    }
  }

  render() {
    const { t, profile, loading } = this.props;

    return (
      <Container>
        <Header backButton={true} text={t('questions:form.title')} navigation={this.props.navigation} />
        <KeyboardAwareScrollView enableOnAndroid={true} keyboardShouldPersistTaps='handled' contentContainerStyle={styles.mainContainer}>
          <FormSend sendData={this.getData} email={profile.email} loading={loading} sendQuest={true} />
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
