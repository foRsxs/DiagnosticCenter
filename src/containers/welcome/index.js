import React, { Component } from 'react';
import { Image, ScrollView, View, Platform, Alert, BackHandler, Linking } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Text } from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Timeline from 'react-native-timeline-flatlist';
import OneSignal from 'react-native-onesignal';

import * as AuthActions from '../../actions/auth';
import * as ContentActions from '../../actions/content';
import CustomBtn from '../../components/common/CustomBtn';
import styles from './styles';
import { versionCompare } from '../../utils/helpers';

import { IMAGE_WELCOME_1, IMAGE_WELCOME_2, IMAGE_WELCOME_3 } from '../../styles/images';
import { COLOR_TEXT_GREEN } from '../../styles/constants';

class WelcomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{
					title: this.props.t('welcome:enter_text1'),
					titleBold: this.props.t('welcome:enter_text2'),
					image: IMAGE_WELCOME_1,
					imgStyle: { width: '100%', height: 140 }
				},
				{
					title: this.props.t('welcome:enter_text3'),
					titleBold: this.props.t('welcome:enter_text4'),
					title1: this.props.t('welcome:enter_text5'),
					titleBold1: this.props.t('welcome:enter_text6'),
					title2: this.props.t('welcome:enter_text7'),
					desc: this.props.t('welcome:enter_text8'),
					desc1: this.props.t('welcome:enter_text9'),
					desc2: this.props.t('welcome:enter_text10'),
					image: IMAGE_WELCOME_2,
					imgStyle: { width: '100%', height: 260 }
				},
				{
					title: this.props.t('welcome:enter_text11'),
					image: IMAGE_WELCOME_3,
					imgStyle: { width: '100%', height: 280 }
				}
			]
		};
	}

	componentDidUpdate(prevProps) {
		const { appParamsConfig, t } = this.props;

		if (!prevProps.appParamsConfig && appParamsConfig && appParamsConfig.version_android) {
			const version_device = DeviceInfo.getVersion();
			const version_back = Platform.OS === 'android' ? appParamsConfig.version_android : appParamsConfig.version_ios;
			const compare = versionCompare(version_device, version_back);

			if (compare === -1) {
				SplashScreen.hide();
				Alert.alert(
					t('authorization:updating'),
					t('authorization:you_have_old_version'),
					[
						{
							text: t('authorization:cancel'),
							style: 'cancel',
							onPress: () => BackHandler.exitApp()
						},
						{
							text: t('authorization:update'),
							onPress: () => {
								Platform.OS === 'android'
									? Linking.openURL('market://details?id=com.izzisoftware.diagnosticcenter')
									: Linking.openURL('itms-apps://itunes.apple.com/ru/app/id1447261057?ign-mpt=uo=2');
							}
						}
					],
					{
						cancelable: false
					}
				);
			} else {
				const { notify, languages_key, token } = this.props;

				this.props.changeNotify(notify);
				this.props.setCurrentLang(languages_key);
				if (token) {
					this.props.saveUser({ api_token: token });
				}
				this._checkWelcome();
			}
		}
	}

	_checkWelcome = () => {
		const { hideScreen, token, enableSecure } = this.props;
		const { navigate } = this.props.navigation;

		if (!hideScreen) {
			OneSignal.getPermissionSubscriptionState((state) => {
				this.props.changeNotify(state.userSubscriptionEnabled == 'true');
			});
		} else if (hideScreen && token && enableSecure) {
			navigate('AuthMethods');
		} else if (hideScreen && !enableSecure) {
			navigate('App');
		}
		SplashScreen.hide();
	};

	renderImage = (image, style) => {
		return <Image style={style} resizeMode="contain" source={image} />;
	};

	renderDetail = (rowData) => {
		return (
			<View style={{ flex: 1 }}>
				<Text style={styles.darkText}>
					{rowData.title}
					<Text style={styles.textBold}> {rowData.titleBold} </Text>
					{rowData.title1}
					<Text style={styles.textBold}> {rowData.titleBold1} </Text>
					{rowData.title2}
				</Text>
				<View>
					{this.renderImage(rowData.image, rowData.imgStyle)}
					{rowData.desc && (
						<Text style={styles.darkText}>
							{rowData.desc} <Text style={styles.textBold}>"{rowData.desc1}"</Text> {rowData.desc2}
							{'\n'}
						</Text>
					)}
				</View>
			</View>
		);
	};

	render() {
		const { navigate } = this.props.navigation;
		const { t, hideScreen } = this.props;
		return !hideScreen ? (
			<ScrollView contentContainerStyle={styles.wrapContainer}>
				<Text style={styles.title}>{t('welcome:enter_app')}</Text>
				<Text style={styles.blueText}>{t('welcome:enter_text')}</Text>
				<View style={{ flex: 1 }}>
					<Timeline
						style={{ flex: 1, marginTop: 20, marginLeft: -40 }}
						detailContainerStyle={{ marginTop: -10 }}
						showTime={false}
						separator={false}
						renderFullLine={false}
						circleColor={COLOR_TEXT_GREEN}
						lineColor={COLOR_TEXT_GREEN}
						data={this.state.data}
						renderDetail={this.renderDetail}
					/>
				</View>
				<Text style={styles.darkText}>
					{t('welcome:enter_text12')}{' '}
					<Text style={styles.textBold}>"{t('welcome:enter_text13')}"</Text>{' '}
					{t('welcome:enter_text14')}
				</Text>
				<Text style={styles.blueText}>{t('welcome:enter_text15')}</Text>
				<View style={styles.button}>
					<CustomBtn
						label={t('common:actions.continue')}
						onClick={() => {
							this.props.setWelcomeScreen(true);
							navigate('home');
						}}
					/>
				</View>
			</ScrollView>
		) : (
			<View />
		);
	}
}

function mapStateToProps(state) {
	return {
		token: state.authorization.token,
		hideScreen: state.content.hideScreen,
		enableSecure: state.authorization.enableSecure,
		notify: state.authorization.notify,
		languages_key: state.authorization.language,
		user: state.authorization.user,
		appParamsConfig: state.deviceInfo.appParamsConfig
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ ...AuthActions, ...ContentActions }, dispatch);
}

export default withNamespaces([ 'welcome', 'common', 'authorization' ])(
	connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)
);
