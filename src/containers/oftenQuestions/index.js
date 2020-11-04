import React, { Component } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Container, Content } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import OftenQuestionItem from '../../components/OftenQuestionItem';
import Header from '../../components/common/Header';

import styles from './styles';
import { ACCENT_BLUE } from '../../styles/constants';

class OftenQuestionsScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sorted_questions: props.questions
		};
	}

	componentDidMount() {
		this.props.getOftenQuestions();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.questions !== this.props.questions) this.setState({ sorted_questions: this.props.questions });
	}

	handleChange = (value) => {
		const { questions } = this.props;
		function findElements(item) {
			return item.question.toLowerCase().indexOf(value.toLowerCase()) !== -1;
		}
		this.setState({ sorted_questions: questions.filter(findElements) });
	};

	render() {
		const { t, isRequest } = this.props;
		const { sorted_questions } = this.state;

		return (
			<Container contentContainerStyle={styles.mainContainer}>
				<Header backButton={true} textUpper={t('faq:title')} navigation={this.props.navigation} />
				<Content
					style={styles.mainContent}
					contentContainerStyle={isRequest ? { flex: 1, justifyContent: 'center' } : {}}
				>
					{!!isRequest ? (
						<ActivityIndicator size="large" color={ACCENT_BLUE} />
					) : !!sorted_questions && sorted_questions.length ? (
						<View>
							<Text style={styles.titleMain}>{t('faq:titleMain').toUpperCase()}</Text>
							<Text style={styles.subtitleMain}>{t('faq:subtitleMain')}</Text>
							{sorted_questions.map((item, index) => (
								<OftenQuestionItem key={index} text={item.question} textAnswer={item.answer} />
							))}
						</View>
					) : (
						<Text style={styles.noText}>{t('faq:no_often_questions_text')}</Text>
					)}
				</Content>
			</Container>
		);
	}
}

function mapStateToProps(state) {
	return {
		questions: state.content.questions.often,
		isRequest: state.content.isRequest
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ContentActions, dispatch);
}

export default withNamespaces([ 'faq', 'common' ])(connect(mapStateToProps, mapDispatchToProps)(OftenQuestionsScreen));
