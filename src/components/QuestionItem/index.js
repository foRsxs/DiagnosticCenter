import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, Icon } from 'native-base';
import { withNamespaces } from 'react-i18next';

import styles from './styles';

class QuestionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAnswer: false
    };
  }

  render() {
    let { showAnswer } = this.state
    let { t, text, textAnswer } = this.props;

    return (
      <View style={styles.questionItem}>
        <Text style={styles.questionItemText}>
          {text}
        </Text>
        {(!!showAnswer) && (
          <Text style={styles.answerItemText}>{textAnswer}</Text>
        )}
        {(!!showAnswer) ? (
          <TouchableOpacity
            style={{ width: '100%' }}
            onPress={() => { this.setState({ showAnswer: false }) }} >
            <Text style={styles.buttonTextClose}>
              <Icon ios='ios-arrow-up' android="ios-arrow-up" style={styles.icon} />
            </Text>
          </TouchableOpacity>
        ) : (
            <TouchableOpacity
              style={{ width: '100%' }}
              onPress={() => { this.setState({ showAnswer: true }) }} >
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

export default withNamespaces(['questions', 'common'])(QuestionItem);