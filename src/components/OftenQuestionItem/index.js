import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, Icon } from 'native-base';
import styles from './styles';

export default class OftenQuestionItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showAnswer: false
		};
	}

	render() {
		let { showAnswer } = this.state;
		let { text, textAnswer } = this.props;
		
		return (
			<View style={styles.questionItem}>
				<TouchableOpacity
					style={styles.itemClick}
					onPress={() => {
						this.setState({ showAnswer: !showAnswer });
					}}
				>
					<Text style={styles.questionItemText}>{text}</Text>
					{showAnswer ? (
						<Icon ios="ios-arrow-down" android="ios-arrow-up" style={styles.icon} />
					) : (
						<Icon ios="ios-arrow-down" android="ios-arrow-down" style={styles.icon} />
					)}
				</TouchableOpacity>
				{showAnswer && <Text style={styles.answerItemText}>{textAnswer}</Text>}
			</View>
		);
	}
}
