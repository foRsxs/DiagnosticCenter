import React, { Component } from 'react';
import { StyleSheet, BackHandler, ActivityIndicator } from 'react-native';
import { Container, Content, View, Text } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { withNavigationFocus } from 'react-navigation';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import CustomBtn from '../../components/common/CustomBtn';
import RecordingItem from '../../components/RecordingItem';
import variables from '../../styles/variables';
import Header from '../../components/common/Header';
import ShareLinks from '../../components/common/ShareLinks';
import Popup from '../../components/common/Popup';

const { medium, large, main, normal } = variables.fSize;

import {
	ACCENT_BLUE,
	LIGHT_GRAY,
	MEDIUM_BLACK,
	BLACK,
	MAIN_FONT,
	COLOR_LIGHT_BLACK,
} from '../../styles/constants';
import {
	ICON_SERVICE_SMALL,
	ICON_DOCTOR_SMALL,
	ICON_CALENDAR_SMALL,
	ICON_TIME_SMALL,
	ICON_PRICE_SMALL,
	ICON_NUMBER_SMALL
} from '../../styles/images';

class ReceptionInfoItemScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
			hideButton: false
		};
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
	}

	componentDidUpdate(prevProps) {
		const { payLink, isFocused, navigation } = this.props;

		if (prevProps.orderCreated !== this.props.orderCreated && this.props.orderCreated)
			this.setState({ modalVisible: true });
		if (prevProps.orderDeleted !== this.props.orderDeleted && this.props.orderDeleted)
			this.props.navigation.navigate('recordingList');
		if (prevProps.payLink !== payLink && payLink && isFocused) {
			navigation.navigate('payment');
		}
	}

	handleBackButtonClick = () => {
		this.props.navigation.goBack(null);
		return true;
	};

	_onClickDelete = () => {
		const { infoListTalonInfo } = this.props;

		this.props.deleteOrder({ rnumb_id: infoListTalonInfo.rnumb_id });
		this.props.navigation.goBack(null);
	};

	_onClickPayButton = () => {
		const { navigation } = this.props;
		navigation.navigate('paymentCards');
	};

	_save = () => {
		this.props.setCreatingOrderSuccess(false);
		this.props.getListTalons();
		this.setState({ modalVisible: false, hideButton: true });
		this.props.navigation.navigate('recordingList');
	};

	getButtonNameAndStatus = (status = 0, paid_status = 0) => {
		const { t } = this.props;
		// status (1 - активен и можно оплачивать, 0 - неактивен). paid_status (1- оплачен, 0 - не оплачен)
		const buttonObj = { text: 'Неоплачено', color: 'grayColor', showPayButton: false };

		if (paid_status === 1) {
			//paid
			buttonObj.text = t('common:actions.paid');
			buttonObj.color = 'grayColor';
			buttonObj.showPayButton = true;
		} else if (paid_status === 0) {
			if (status === 1) {
				//pay
				buttonObj.text = t('common:actions.pay');
				buttonObj.color = 'greenColor';
				buttonObj.showPayButton = true;
			} else if (status === 0) {
				//not paid
				buttonObj.text = t('common:actions.not_paid');
				buttonObj.color = 'grayColor';
				buttonObj.showPayButton = true;
			}
    }
    
		return buttonObj;
	};

	render() {
    const { t, infoListTalonInfo, isRequest } = this.props;
	
		const status = infoListTalonInfo && infoListTalonInfo.hasOwnProperty('status') ? infoListTalonInfo.status : null;
		const paid_status = infoListTalonInfo && infoListTalonInfo.hasOwnProperty('paid_status') ? infoListTalonInfo.paid_status : null;
		const headTxt = infoListTalonInfo ? (`${infoListTalonInfo.doctor}, ${infoListTalonInfo.spec}`) : null;
		const dateTxt = infoListTalonInfo ? (`${infoListTalonInfo.dd} ${infoListTalonInfo.time}`) : null;

		const { text: buttonPayText, color: buttonPayColor, showPayButton } = this.getButtonNameAndStatus(
			status,
			paid_status
		);

		const {
			modalVisible,
			hideButton,
		} = this.state;

		return (
			<Container contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
				<Header backButton={true} text={t('recordings:info_record')} navigation={this.props.navigation} />
					{ isRequest ? (
						<View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center'}}>
							<ActivityIndicator size="large" color={ACCENT_BLUE} />
						</View>
					) : (
					<View style={{ flex: 1, height: '100%'}}>
						<Content>
							<View style={styles.wrapper}>
								<RecordingItem
									icon={ICON_SERVICE_SMALL}
									title={t('createrecord:form.service')}
									placeholder={t('createrecord:form.select_service')}
									text={infoListTalonInfo.serv}
								/>
								<View style={styles.datetimeWrap}>
									<View style={{ flex: 3 }}>
										<RecordingItem
											icon={ICON_PRICE_SMALL}
											title={t('createrecord:price')}
											placeholder={t('createrecord:price')}
											text={`${infoListTalonInfo.price} KZT`}
										/>
									</View>
									<View style={styles.separator} />
									<View style={{ flex: 2 }}>
										<RecordingItem
											contentContainerStyle={{ paddingRight: 0, paddingLeft: 10 }}
											icon={ICON_NUMBER_SMALL}
											title={t('createrecord:room_number')}
											text={infoListTalonInfo.room}
											placeholder="300"
										/>
									</View>
								</View>
								<RecordingItem
									icon={ICON_DOCTOR_SMALL}
									title={t('createrecord:form.doctor')}
									placeholder={t('createrecord:form.select_doctor')}
									text={infoListTalonInfo.doc}
								/>
								<View style={styles.datetimeWrap}>
									<View style={{ flex: 2 }}>
										<RecordingItem
											icon={ICON_CALENDAR_SMALL}
											title={t('createrecord:form.date')}
											placeholder={t('createrecord:form.select_date')}
											text={infoListTalonInfo.dd}
										/>
									</View>
									<View style={styles.separator} />
									<View style={{ flex: 1 }}>
										<RecordingItem
											contentContainerStyle={{ paddingRight: 0, paddingLeft: 10 }}
											icon={ICON_TIME_SMALL}
											title={t('createrecord:form.time')}
											placeholder="12:00"
											text={infoListTalonInfo.time}
										/>
									</View>
								</View>
							</View>
							{infoListTalonInfo.pdf && <ShareLinks url={infoListTalonInfo.pdf} title={headTxt} text={dateTxt} />}
						</Content>
						{showPayButton && (
							<View style={{ paddingHorizontal: 15, paddingTop: 20, paddingBottom: 5 }}>
								<CustomBtn
									color={buttonPayColor}
									label={buttonPayText}
									onClick={() => this._onClickPayButton()}
								/>
							</View>
						)}
						{!hideButton && (
							<View style={{ paddingHorizontal: 15, paddingBottom: 20, paddingTop: 10 }}>
								<CustomBtn
									label={t('common:actions.cancel_recording')}
									onClick={() => this._onClickDelete()}
								/>
							</View>
						)}
						<Popup
							show={modalVisible}
							firstText={t('recordings:item.success').toUpperCase()}
							laberButton={t('common:actions.ok')}
							actionButton={this._save}
						/>
					</View>
				)}
			</Container>
		);
	}
}

function mapStateToProps(state) {
	return {
		isRequest: state.content.isRequest,
		orderCreated: state.content.orderCreated,
		orderDeleted: state.content.orderDeleted,
		lang_key: state.authorization.language,
		payLink: state.content.payLink,
		infoListTalonInfo: state.content.infoListTalonInfo
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ContentActions, dispatch);
}

export default compose(
	withNavigationFocus,
	withNamespaces([ 'recordings', 'common' ]),
	connect(mapStateToProps, mapDispatchToProps)
)(ReceptionInfoItemScreen);

const styles = StyleSheet.create({
	itemWrap: {
		paddingHorizontal: 20,
		margin: 5
	},
	txtHead: {
		color: ACCENT_BLUE,
		fontFamily: MAIN_FONT,
		fontSize: medium,
		width: '100%',
		textAlign: 'center',
		marginBottom: 5
	},
	wrapName: {
		backgroundColor: LIGHT_GRAY,
		width: '100%',
		textAlign: 'center',
		borderRadius: 10,
		paddingHorizontal: 0,
		paddingVertical: 10
	},
	txtName: {
		color: BLACK,
		fontFamily: MAIN_FONT,
		fontSize: large,
		width: '100%',
		textAlign: 'center'
	},
	txtSubname: {
		color: MEDIUM_BLACK,
		fontFamily: MAIN_FONT,
		fontSize: main,
		marginTop: 5,
		width: '100%',
		textAlign: 'center'
	},
	actionsWrap: {
		justifyContent: 'flex-start',
		flexDirection: 'row',
		alignItems: 'center'
	},
	actionsImg: {
		width: 20,
		height: 15,
		marginRight: 10
	},
	wrapper: {
		paddingHorizontal: 20
	},
	datetimeWrap: {
		flexDirection: 'row'
	},
	separator: {
		marginVertical: 10,
		borderLeftWidth: 1,
		borderColor: ACCENT_BLUE
	},
	helpText: {
		fontSize: normal,
		color: COLOR_LIGHT_BLACK,
		fontFamily: MAIN_FONT,
		paddingLeft: 50,
		paddingRight: 30,
		marginBottom: 0,
		marginTop: 10
	}
});
