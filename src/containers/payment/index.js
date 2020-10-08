import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { withNamespaces } from 'react-i18next';
import { WebView } from 'react-native-webview';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';

import { getSavedCards, getListTalonInfo } from '../../actions/content';

import Header from '../../components/common/Header';
import { ACCENT_BLUE } from '../../styles/constants';

class Payment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isRequest: false,
			showLoader: true,
			add_cart: false
		};
		this.senderResp = false;
	}

	componentDidMount() {
		const { type } = this.props.navigation.state.params;

		this.setState({ add_cart: (type && type === 'add_cart') ? true : false });
	}

	onNavigationStateChange = ({ url }) => {
		const { navigation, getSavedCards, getListTalonInfo, infoListTalonInfo } = this.props;

		if (url.includes('process')) {
			this.senderResp = true;
		}

		if (url.includes('process/err_process') || url.includes('hbpay/err_process')) {
			if (this.senderResp) {
				setTimeout(() => {
					navigation.goBack();
				}, 2000);
				this.senderResp = false;
			}
		}

		if (url.includes('process/result')) {
			if (this.senderResp && infoListTalonInfo?.rnumb_id) {
				setTimeout(() => {
					getListTalonInfo(infoListTalonInfo?.rnumb_id);
					navigation.navigate('recordingItem');
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
		const { t, payLink, navigation } = this.props;
		const { showLoader, add_cart } = this.state;

		return (
			<View style={{ flex: 1 }}>
				<Header backButton={true} text={add_cart ? t('payment:add_cart_page_title') : t('payment:payment_page_title')} navigation={navigation} />
				{!!showLoader && (
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
	infoListTalonInfo: state.content.infoListTalonInfo,
	payLink: state.content.payLink
});

const mapDispatchToProps = (dispatch) => bindActionCreators({	getSavedCards, getListTalonInfo }, dispatch);

export default withNamespaces(['payment'])(compose(withNavigationFocus, connect(mapStateToProps, mapDispatchToProps))(Payment));
