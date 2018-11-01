import React, {Component} from 'react';
import {Alert, StyleSheet, BackHandler} from 'react-native';
import {Container, Content, View} from 'native-base';
import i18n from '../../i18n';
import QuestionItem from '../../components/questions/QuestionItem';
import CustomBtn from '../../components/common/CustomBtn';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';


class QuestionsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
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
    const { navigate } = this.props.navigation;
    return (
      <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
          <Header text="ВОПРОС ВРАЧУ" navigation = {this.props.navigation}/>
          <HeaderBottom text="Пародонтозов Иван" />
          <Content style={{marginTop: -10, zIndex: 1, paddingTop: 10}} padder>
            <QuestionItem 
              text='Здравствуйте я инвалид 3группы. У меня сильно болит голова! Мой врач невропатолог сказал что бы я принесла снимок УЗДТ БЦА, МРТ ШОП, ВБА! И мне ведь положено пройти все эти обследовании у вас в клинике бесплатно! Для этого какие документы нужны? Заранее спасибо!'
              textAnswer='Здравствуйте я инвалид 3группы. У меня сильно болит голова! Мой врач невропатолог сказал что бы я принесла снимок УЗДТ БЦА, МРТ ШОП, ВБА! И мне ведь положено пройти все эти обследовании у вас в клинике бесплатно! Для этого какие документы нужны? Заранее спасибо!'
            />
            <QuestionItem 
              text='Здравствуйте я инвалид 3группы. У меня сильно болит голова! Мой врач невропатолог сказал что бы я принесла снимок УЗДТ БЦА, МРТ ШОП, ВБА! И мне ведь положено пройти все эти обследовании у вас в клинике бесплатно! Для этого какие документы нужны? Заранее спасибо!'
              textAnswer='Здравствуйте я инвалид 3группы. У меня сильно болит голова! Мой врач невропатолог сказал что бы я принесла снимок УЗДТ БЦА, МРТ ШОП, ВБА! И мне ведь положено пройти все эти обследовании у вас в клинике бесплатно! Для этого какие документы нужны? Заранее спасибо!'
            />
            <QuestionItem 
              text='Здравствуйте я инвалид 3группы. У меня сильно болит голова! Мой врач невропатолог сказал что бы я принесла снимок УЗДТ БЦА, МРТ ШОП, ВБА! И мне ведь положено пройти все эти обследовании у вас в клинике бесплатно! Для этого какие документы нужны? Заранее спасибо!'
              textAnswer='Здравствуйте я инвалид 3группы. У меня сильно болит голова! Мой врач невропатолог сказал что бы я принесла снимок УЗДТ БЦА, МРТ ШОП, ВБА! И мне ведь положено пройти все эти обследовании у вас в клинике бесплатно! Для этого какие документы нужны? Заранее спасибо!'
            />
          </Content >
          <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
            <CustomBtn label='ЗАДАТЬ ВОПРОС' onClick={() => navigate("questionForm")}/>
          </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
});

export default QuestionsScreen;
