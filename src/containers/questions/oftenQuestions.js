import React, { Component } from 'react';
import { BackHandler, ActivityIndicator, Linking } from 'react-native';
import { Container, Content } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import OftenQuestionItem from '../../components/questions/OftenQuestionItem';
import LinkBtn from '../../components/common/LinkBtn';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';
import variables from '../../styles/variables';

const { blue } = variables.colors;

class OftenQuestionsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getOftenQuestions();
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
    const { t, questions } = this.props;
    
    return (
      <Container contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
        <Header text={ t('faq:title') } navigation={this.props.navigation} />
        <HeaderBottom search={true} />
        <Content style={{ marginTop: -10, zIndex: 1, paddingTop: 10 }} padder>
          {
            (questions) ? (
              questions.map((item, index)=>(
                <OftenQuestionItem
                  key={index}
                  text={item.question}
                  textAnswer={item.answer}
                />
              ))
            ) : <ActivityIndicator size="small" color={blue} style={{marginTop: 10}}/>
          }
        </Content >
        <LinkBtn label={ t('common:actions_text.call_centre_text') } onClick={()=> Linking.openURL('tel:+87252367132') }/>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    questions: state.content.questions.often,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch)
}

export default withNamespaces(['faq', 'common'])(connect(mapStateToProps, mapDispatchToProps)(OftenQuestionsScreen));
