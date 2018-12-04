import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View, Icon} from 'native-base';
import variables from '../../styles/variables';

const {backgroundBlue, accentBlue, black} = variables.colors;
const {main} = variables.fSize;
const {mainFont} = variables.fonts;

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
            style={styles.iconWrap}
            onPress={()=> {this.setState({showAnswer: false})}} >
              <Icon ios='ios-arrow-up' android="ios-arrow-up" style={styles.icon} />
          </TouchableOpacity>
        ): (
          <TouchableOpacity
            style={styles.iconWrap}
            onPress={()=> {this.setState({showAnswer: true})}} >
              <Icon ios='ios-arrow-down' android="ios-arrow-down" style={styles.icon} />
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
    padding: 10,
    position: 'relative'
  },
  questionItemText: {
    fontSize: main,
    fontFamily: mainFont,
    color: black,
    textAlign: 'left',
    width: '100%'
  },
  answerItemText: {
    fontSize: main,
    fontFamily: mainFont,
    color: accentBlue,
    textAlign: 'left',
    width: '100%',
    paddingTop: 5
  },
  iconWrap: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: 10,
    right: 5,
    zIndex: 1,
  },
  icon: {
    color: accentBlue,  
    fontSize: main,
    fontFamily: mainFont,
  },
});