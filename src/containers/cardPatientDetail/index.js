import React, { Component } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { Container, Content } from 'native-base';
import HTMLView from 'react-native-htmlview';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import Header from '../../components/common/Header';
import ShareLinks from '../../components/common/ShareLinks';
import styles from './styles';

import { ACCENT_BLUE } from '../../styles/constants';

class CardPatientDetailScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			p_type: (props.navigation.state.params) ? props.navigation.state.params.p_type : null,
			headTxt: (props.navigation.state.params) ? props.navigation.state.params.headTxt : null,
			dateTxt: (props.navigation.state.params) ? props.navigation.state.params.dateTxt : null,
			keyid: (props.navigation.state.params) ? props.navigation.state.params.keyid : null,
			pdf: (props.navigation.state.params) ? props.navigation.state.params.pdf : null,
		};
	}

	componentDidMount() {
		const { p_type, keyid } = this.state;

		this.props.getHistory({ type: 'html', p_type, vis_id: keyid });
	}

	staticContent = () => {
		const { history } = this.props;

		return (
			<View style={{ backgroundColor: 'white', padding: 15, marginTop: 10 }}>
				<HTMLView value={history.data} />
			</View>
		)
	}

	render() {
		const { t, history, isRequest } = this.props;
		const { pdf, headTxt, dateTxt } = this.state;

		return (
			<Container contentContainerStyle={styles.mainContainer}>
				<Header backButton={true} text={t('patient:protocol_vizit')} navigation={this.props.navigation} />
				<Content padder contentContainerStyle={(isRequest) ? { flex: 1, justifyContent: 'center' } : styles.mainContent }>
					{(!!isRequest) ? <ActivityIndicator size="large" color={ACCENT_BLUE} /> : (
						<View>
							<View style={styles.headBlock}>
								<Text style={styles.topText}>{headTxt}</Text>
								<Text style={styles.bottomText}>{dateTxt}</Text>
							</View>
							{history && this.staticContent()}
						</View>
					)}
				</Content>
				<ShareLinks url={pdf} title={headTxt} text={dateTxt} />
			</Container>
		)
	}
}

function mapStateToProps(state) {
	return {
		history: state.content.history.current,
    isRequest: state.content.isRequest
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ContentActions, dispatch);
}

export default withNamespaces(['history', 'common', 'patient'])(connect(mapStateToProps, mapDispatchToProps)(CardPatientDetailScreen));