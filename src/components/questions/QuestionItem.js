import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View, Icon} from 'native-base';
import { withNamespaces } from 'react-i18next';

import variables from '../../styles/variables';
const { main } = variables.fSize;

import { BACKGROUND_BLUE, BLACK, ACCENT_BLUE, MAIN_FONT  } from '../../styles/constants';

class QuestionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAnswer: false
    };
  }

  render() {
    let {showAnswer} = this.state
    let {t, text, textAnswer} = this.props;

    return (
      <View style={styles.questionItem}>
        <Text style={styles.questionItemText}>
          {text}
        </Text>
        { (showAnswer) && (
        <Text style={styles.answerItemText}>{textAnswer}</Text>
        )}
        { (showAnswer) ? (
          <TouchableOpacity
            style={{width: '100%'}}
            onPress={()=> {this.setState({showAnswer: false})}} >
            <Text style={styles.buttonTextClose}>
              <Icon ios='ios-arrow-up' android="ios-arrow-up" style={styles.icon} />
            </Text>
          </TouchableOpacity>
        ): (
          <TouchableOpacity
            style={{width: '100%'}}
            onPress={()=> {this.setState({showAnswer: true})}} >
            <Text style={styles.buttonTextShow}>
              {t('questions:look_answer')} {" "}
              <Icon ios='ios-arrow-down' android="ios-arrow-down" style={styles.icon} />
            </Text>
          </TouchableOpacity>
        )}        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  questionItem: {
    borderRadius: 10,
    alignItems: "center",
    width: '100%',
    backgroundColor: BACKGROUND_BLUE,
    marginBottom: 10,
    padding: 10
  },
  questionItemText: {
    fontSize: main,
    fontFamily: MAIN_FONT,
    color: BLACK,
    textAlign: 'justify'
  },
  answerItemText: {
    fontSize: main,
    fontFamily: MAIN_FONT,
    color: ACCENT_BLUE,
    textAlign: 'justify',
    paddingTop: 5
  },
  buttonTextClose: {
    textAlign:'right', 
    alignItems: 'center'
  },
  icon: {
    color: ACCENT_BLUE,  
    fontSize: main,
    fontFamily: MAIN_FONT,
    paddingLeft: 10
  },
  buttonTextShow: {
    textAlign:'right', 
    fontSize: main,
    fontFamily: MAIN_FONT,
    color: ACCENT_BLUE, 
    alignItems: 'center'
  }
});

export default withNamespaces(['questions', 'common'])(QuestionItem);