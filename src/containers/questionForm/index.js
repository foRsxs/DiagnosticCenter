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
      doc_id: (props.navigation.state.params) ? props.navigation.state.params.doc_id : null,
      specid: (props.navigation.state.params) ? props.navigation.state.params.specid : null,
      docdep: (props.navigation.state.params) ? props.navigation.state.params.docdep : null,
    };
  }

  getData = (data) => {
    const { doc_id } = this.state;
    this.props.sendQuestion({ type: 'questions', doc_id, ...data });
  }

  componentDidUpdate(prevProps) {
    const { t } = this.props;
    const { doc_id, specid, docdep } = this.state;

    if (this.props.status !== prevProps.status) {
      if (this.props.status) {
        Toast.show({ text: t('common:actions_text.question_sent') });
      } else {
        Toast.hide();
        this.props.navigation.navigate('doctor', { docid: +doc_id, spec_id: specid, docdep_id: docdep })
      }
    }
  }

  render() {
    const { doc_id } = this.state;
    const { t, profile, loading } = this.props;

    return (
      <Container>
        <Header backButton={true} text={t('questions:form.title')} navigation={this.props.navigation} />
        <KeyboardAwareScrollView enableOnAndroid={true} keyboardShouldPersistTaps='handled' contentContainerStyle={styles.mainContainer}>
          <FormSend sendData={this.getData} email={profile.email} loading={loading} sendQuest={true} docid={doc_id} />
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
