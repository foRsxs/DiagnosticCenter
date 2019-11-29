import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';

import { getSavedCards } from '../../actions/content';

import Header from '../../components/common/Header';
import { ACCENT_BLUE } from '../../styles/constants';

class Payment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isRequest: false,
			showLoader: true
		};
		this.senderResp = false;
	}

	onNavigationStateChange = ({ url }) => {
		const { navigation, getSavedCards } = this.props;

		if (url.includes('process')) {
			this.senderResp = true;
		}

		if (url.includes('err_process')) {
			if (this.senderResp) {
				setTimeout(() => {
					navigation.goBack();
				}, 2000);
				this.senderResp = false;
			}
		}

		if (url.includes('process/result')) {
			if (this.senderResp) {
				setTimeout(() => {
					navigation.navigate('recordingList');
				}, 4000);
				this.senderResp = false;
			}
		}

		if (url.includes('hbpay/result')) {
			getSavedCards();
			setTimeout(() => {
				navigation.goBack();
			}, 4000);
		}

		if (url.includes('api/epay_success')) {
			navigation.goBack();
		}
		
	};

	render() {
		const { payLink, navigation } = this.props;
		const { showLoader } = this.state;

		return (
			<View style={{ flex: 1 }}>
				<Header backButton={true} text={'Оплата'} navigation={navigation} />
				{showLoader && (
					<View style={styles.container}>
						<ActivityIndicator size="large" color={ACCENT_BLUE} />
					</View>
				)}
				<WebView
					style={{ flex: 1 }}
					onLoadEnd={() => this.setState({ showLoader: false })}
					source={{ uri: payLink }}
					onNavigationStateChange={this.onNavigationStateChange}
					scalesPageToFit={true}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	}
});

const mapStateToProps = (state) => ({
	payLink: state.content.payLink
});

const mapDispatchToProps = (dispatch) => bindActionCreators({	getSavedCards }, dispatch);

export default compose(withNavigationFocus, connect(mapStateToProps, mapDispatchToProps))(Payment);
