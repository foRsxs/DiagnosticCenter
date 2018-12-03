import React, {Component} from 'react';
import {BackHandler, ActivityIndicator, Text} from 'react-native';
import {Container, Content, View} from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import QuestionItem from '../../components/questions/QuestionItem';
import CustomBtn from '../../components/common/CustomBtn';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';
import variables from '../../styles/variables';

const { blue } = variables.colors;
const { medium } = variables.fSize;
const { mainFont } = variables.fonts;

class AllQuestionsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doc_id: (props.navigation.state.params) ? props.navigation.state.params.doc_id : null,
      fio: (props.navigation.state.params) ? props.navigation.state.params.fio : null,
      loading: true
    };
  }

  componentDidMount() {
    this.props.getQuestions(this.state.doc_id);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.questions !== nextProps.questions) this.setState({loading: false})
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }

  render() {
    const { navigate } = this.props.navigation;
    const { fio, doc_id, loading } = this.state;
    const { t, questions } = this.props;

    return (
      <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
        <Header text={ t('questions:title') } navigation = {this.props.navigation}/>
        <HeaderBottom text={fio} />
        <Content style={{marginTop: -10, zIndex: 1, paddingTop: 10}} padder>
          {
            (!loading) ? (
              (questions.length) ? (
                questions.map((item)=> (
                  <QuestionItem
                    key={item.id}
                    text={item.question}
                    textAnswer={item.answer? item.answer : t('questions:doc_no_answered')}
                  />
                ))
              ) : <Text style={{color: 'black', fontFamily: mainFont, fontSize: medium, textAlign: 'center'}}>{ t('questions:doc_no_questions') }</Text>
            ) : <ActivityIndicator size="small" color={blue} style={{marginTop: 10}}/>
          }
        </Content >
        {
          (!loading) && (
            <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
              <CustomBtn label={ t('common:actions.ask_question') } onClick={() => navigate("questionForm", {doc_id: doc_id})}/>
            </View>
          )
        }
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    questions: state.content.questions.doctors,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch)
}

export default withNamespaces(['questions', 'common'])(connect(mapStateToProps, mapDispatchToProps)(AllQuestionsScreen));