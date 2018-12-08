import React, { Component } from 'react';
import { BackHandler, ActivityIndicator, Linking, Text } from 'react-native';
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
import { CALL_CENTRE_TEL } from '../../config';

const { blue } = variables.colors;
const {medium} = variables.fSize;
const { mainFont} = variables.fonts;

class OftenQuestionsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sorted_questions: props.questions,
      loading: (props.questions) ? false : true,
    };
  }

  componentDidMount() {
    this.props.getOftenQuestions();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.questions !== this.props.questions) this.setState({loading: false, sorted_questions: this.props.questions});
  }

  handleChange = (value) => {
    const {questions} = this.props;
    function findElements(item) {
      return item.question.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    }
    this.setState({ sorted_questions: questions.filter(findElements)});
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }

  render() {
    const { t } = this.props;
    const { loading, sorted_questions } = this.state;

    return (
      <Container contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
        <Header text={ t('faq:title') } navigation={this.props.navigation} />
        <HeaderBottom search={true} onChangeSearch={this.handleChange}/>
        <Content style={{ marginTop: -10, zIndex: 1, paddingTop: 10 }} padder>
          {
            (loading) ? <ActivityIndicator size="small" color={blue} />:
            (
              (sorted_questions && sorted_questions.length)? (
                sorted_questions.map((item, index)=>(
                  <OftenQuestionItem
                    key={index}
                    text={item.question}
                    textAnswer={item.answer}
                  />
                ))
              ): (
                <Text style={{textAlign: 'center', fontSize: medium, fontFamily: mainFont}}>{t('faq:no_often_questions_text')}</Text>
              )
            )
          }
        </Content >
        <LinkBtn label={ t('common:actions_text.call_centre_text') } onClick={()=> Linking.openURL(`tel:${CALL_CENTRE_TEL}`) }/>
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
