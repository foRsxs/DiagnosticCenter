import React, {Component} from 'react';
import {Container, Toast} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import FormSend from '../../components/common/Form';
import Header from '../../components/common/Header';
import styles from './styles';

class FaqScreen extends Component {
  constructor(props) {
    super(props);
  }
  
  getData = (data) => {
    this.props.sendQuestion({type: 'faq', ...data});
  }

  componentDidUpdate(prevProps) {
    const {t} = this.props;

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

  render() {
    const {t, profile, loading} = this.props;

    return (
      <Container>
        <KeyboardAwareScrollView enableOnAndroid={true} keyboardShouldPersistTaps='handled' contentContainerStyle={styles.mainContainer}>
          <Header backButton={true} text={ t('contacts:faq.title') } navigation = {this.props.navigation}/>
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

export default withNamespaces(['contacts', 'common'])(connect(mapStateToProps, mapDispatchToProps)(FaqScreen));
