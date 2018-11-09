import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Text, View, Icon} from 'native-base';
import variables from '../../styles/variables'

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
    backgroundColor: variables.colors.backgroundBlue,
    marginBottom: 10,
    padding: 10
  },
  questionItemText: {
    fontSize: variables.fSize.main,
    fontFamily: variables.fonts.mainFont,
    color: variables.colors.mediumBlack,
    textAlign: 'justify'
  },
  answerItemText: {
    fontSize: variables.fSize.main,
    fontFamily: variables.fonts.mainFont,
    color: variables.colors.blue,
    textAlign: 'justify',
    paddingTop: 5
  },
  buttonTextClose: {
    textAlign:'right', 
    alignItems: 'center'
  },
  icon: {
    color:variables.colors.blue,  
    fontSize: variables.fSize.main,
    fontFamily: variables.fonts.mainFont,
    paddingLeft: 10
  },
  buttonTextShow: {
    textAlign:'right', 
    fontSize: variables.fSize.main,
    fontFamily: variables.fonts.mainFont,
    color: variables.colors.blue, 
    alignItems: 'center'
  }
});