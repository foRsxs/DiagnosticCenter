import React, {Component} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Container, Content, View, Item, Textarea, Input} from 'native-base';
import i18n from '../../i18n';
import CustomBtn from '../../components/common/CustomBtn'
import variables from '../../styles/variables';


class QuestionFormScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
          <Content padder>
            <Item style={styles.inputWrap} regular>
              <Input style={styles.input} placeholder='ваш e-mail' />
            </Item>
            <Textarea style={styles.textarea} bordered placeholder="ваш вопрос" />
          </Content >
          <View style={styles.buttonWrap}>
            <CustomBtn label='ОТПРАВИТЬ' onClick={() => Alert.alert('ok')}/>
          </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  inputWrap: {
    marginBottom: 20, 
    borderColor: variables.colors.blue, 
    borderRadius: 10, 
    backgroundColor: variables.colors.backgroundBlue
  },
  input: {
    fontSize: variables.fSize.main
  },
  textarea: {
    height: 300, 
    fontSize: variables.fSize.main, 
    borderColor: variables.colors.blue, 
    borderRadius: 10, 
    backgroundColor: variables.colors.backgroundBlue
  },
  buttonWrap: {
    paddingHorizontal: 15, 
    paddingVertical: 20
  }
});

export default QuestionFormScreen;
