import React, { Component } from 'react';
import { Alert, StyleSheet, BackHandler, ActivityIndicator } from 'react-native';
import { Container, Content, Text } from 'native-base';
import i18n from '../../i18n';
import * as ContentActions from '../../actions/content';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
    const {questions} = this.props;
    
    return (
      <Container contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
        <Header text="FAQ" navigation={this.props.navigation} />
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
          <Text>{i18n.t('BtnMainDoctor')}</Text>
        </Content >
        <LinkBtn label='позвонить в call-центр' onClick={() => Alert.alert('ok')} />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
});

function mapStateToProps(state) {
  return {
    questions: state.content.questions.often,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OftenQuestionsScreen)
