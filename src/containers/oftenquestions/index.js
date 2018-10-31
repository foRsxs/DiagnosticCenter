import React, {Component} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Container, Content, View} from 'native-base';
import i18n from '../../i18n';
import OftenQuestionItem from '../../components/oftenquestions/OftenQuestionItem';
import LinkBtn from '../../components/common/LinkBtn';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';


class OftenQuestionsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
          <Header text="ЧАСТЫЕ ВОПРОСЫ" navigation = {this.props.navigation}/>
          <HeaderBottom search={true} />
          <Content style={{marginTop: -10, zIndex: 1, paddingTop: 10}} padder>
            <OftenQuestionItem 
              text='Здравствуйте я инвалид 3группы.'
              textAnswer='Здравствуйте я инвалид 3группы. У меня сильно болит голова!'
            />
            <OftenQuestionItem 
              text='Здравствуйте я инвалид 3группы.'
              textAnswer='Здравствуйте я инвалид 3группы. У меня сильно болит голова!'
            />
            <OftenQuestionItem 
              text='Здравствуйте я инвалид 3группы.'
              textAnswer='Здравствуйте я инвалид 3группы. У меня сильно болит голова!'
            />
            <OftenQuestionItem 
              text='Здравствуйте я инвалид 3группы.'
              textAnswer='Здравствуйте я инвалид 3группы. У меня сильно болит голова!'
            />
          </Content >
          <LinkBtn label='позвонить в call-центр' onClick={() => Alert.alert('ok')}/>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
});

export default OftenQuestionsScreen;
