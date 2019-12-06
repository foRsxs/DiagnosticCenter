import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Item, Textarea, Input, Form } from 'native-base';
import { withNamespaces } from 'react-i18next';

import CustomBtn from '../CustomBtn';
import styles from './styles';
import { RED, ACCENT_BLUE } from '../../../styles/constants';

class FormSend extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: props.email,
			question: '',
			emailValid: true,
			questionValid: true
		};
	}

	_confirm = () => {
		const { question, email, emailValid, questionValid } = this.state;
		this.validate(email);
		this.validateMess(question);

		if (emailValid && questionValid && question.length) {
			this.props.sendData({ email, question });
		}
	};

	validate = (value) => {
		let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		this.setState({ email: value });
		!reg.test(value) ? this.setState({ emailValid: false }) : this.setState({ emailValid: true });
	};

	validateMess = (value) => {
		this.setState({ question: value });
		!value.length || value.length < 10
			? this.setState({ questionValid: false })
			: this.setState({ questionValid: true });
	};

	render() {
		const { question, emailValid, questionValid, email } = this.state;
		const { t, sendQuest = false, loading } = this.props;

		return (
			<Form style={styles.formWrap}>
				<View style={{ flex: 1 }}>
					<Item style={styles.inputWrap} regular>
						<Input style={styles.input} placeholder={t('common:actions_text.your_name')} />
					</Item>
					<Item style={[ styles.inputWrap, !emailValid ? { borderColor: RED } : {} ]} regular>
						<Input
							autoCapitalize={'none'}
							style={styles.input}
							onChangeText={(email) => this.validate(email)}
							value={email}
							placeholder={t('common:actions_text.your_email')}
						/>
					</Item>
					<Textarea
						style={[ styles.textarea, !questionValid ? { borderColor: RED } : {} ]}
						bordeRED
						placeholder={t('common:actions_text.your_question')}
						onChangeText={(question) => this.validateMess(question)}
						value={question}
					/>
				</View>
				<View style={styles.buttonWrap}>
					{!loading ? (
						<CustomBtn
							label={sendQuest ? t('common:actions.send_question') : t('common:actions.send_msg')}
							onClick={() => this._confirm()}
						/>
					) : (
						<ActivityIndicator size="small" color={ACCENT_BLUE} style={{ marginTop: 10 }} />
					)}
				</View>
			</Form>
		);
	}
}

export default withNamespaces('common')(FormSend);
