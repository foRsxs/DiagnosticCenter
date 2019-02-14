import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, Icon } from 'native-base';
import styles from './styles';

export default class QuestionItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showAnswer: false
		};
	}

	render() {
		let { showAnswer } = this.state
		let { text, textAnswer } = this.props;
		return (
			<View style={styles.questionItem}>
				<Text style={styles.questionItemText}>
					{text}
				</Text>
				{(showAnswer) ? (
					<Text style={styles.answerItemText}>
						{textAnswer}
					</Text>
				) : false}
				{(showAnswer) ? (
					<TouchableOpacity
						style={styles.iconWrap}
						onPress={() => { this.setState({ showAnswer: false }) }} >
						<Icon ios='ios-arrow-up' android="ios-arrow-up" style={styles.icon} />
					</TouchableOpacity>
				) : (
						<TouchableOpacity
							style={styles.iconWrap}
							onPress={() => { this.setState({ showAnswer: true }) }} >
							<Icon ios='ios-arrow-down' android="ios-arrow-down" style={styles.icon} />
						</TouchableOpacity>
					)}
			</View>
		);
	}
}
