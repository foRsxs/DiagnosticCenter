import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View, Icon} from 'native-base';
import variables from '../../styles/variables';

const { accentBlue, black, backgroundBlue } = variables.colors;
const { main } = variables.fonts;
const { mainFont } = variables.fSize;

export default class QuestionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAnswer: false
    };
  }

  render() {
    let {showAnswer} = this.state
    let {text, textAnswer} = this.props;
    return (
      <View style={styles.questionItem}>
        <Text style={styles.questionItemText}>
          {text}
        </Text>
        { (showAnswer) ? (
        <Text style={styles.answerItemText}>
          {textAnswer}
        </Text>
        ): false}
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
              посмотреть ответ {" "}
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
    backgroundColor: backgroundBlue,
    marginBottom: 10,
    padding: 10
  },
  questionItemText: {
    fontSize: main,
    fontFamily: mainFont,
    color: black,
    textAlign: 'justify'
  },
  answerItemText: {
    fontSize: main,
    fontFamily: mainFont,
    color: accentBlue,
    textAlign: 'justify',
    paddingTop: 5
  },
  buttonTextClose: {
    textAlign:'right', 
    alignItems: 'center'
  },
  icon: {
    color: accentBlue,  
    fontSize: main,
    fontFamily: mainFont,
    paddingLeft: 10
  },
  buttonTextShow: {
    textAlign:'right', 
    fontSize: main,
    fontFamily: mainFont,
    color: accentBlue, 
    alignItems: 'center'
  }
});