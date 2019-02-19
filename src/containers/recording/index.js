import React, { Component } from 'react';
import { ImageBackground, Image, TouchableOpacity } from 'react-native';
import { Container, View, Content, Tabs, Tab } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import CustomBtn from '../../components/common/CustomBtn';
import RecordingItem from '../../components/RecordingItem';
import styles from './styles';
import { CONSULT_BG, RESEARCH_BG, ICON_SPEC_SMALL, ICON_SERVICE_SMALL, ICON_DOCTOR_SMALL, ICON_CALENDAR_SMALL, ICON_TIME_SMALL, ICON_UPDATE } from '../../styles/images';

class ReceptionCreateScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			activeTabOne: true
		}
	}

	render() {
		const { navigation } = this.props;
		const { t } = this.props;
		const { activeTabOne } = this.state;
		return (
			<Container contentContainerStyle={styles.mainContainer}>
				<Content>
					<TouchableOpacity
						onPress={() => alert('update')}
						style={styles.btnUpdate}
					>
						<Image
							style={styles.imgUpdate}
							resizeMode='contain'
							source={ICON_UPDATE}
						/>
					</TouchableOpacity>
					{(activeTabOne) ? (
						<ImageBackground
							style={styles.bgImage}
							resizeMode='cover'
							source={CONSULT_BG}
						/>
					) : (
							<ImageBackground
								style={styles.bgImage}
								resizeMode='cover'
								source={RESEARCH_BG}
							/>
						)}
					<Tabs onChangeTab={() => this.setState({ activeTabOne: !activeTabOne })} tabContainerStyle={styles.wrapTabs}>
						<Tab tabStyle={styles.tab} activeTabStyle={styles.tabActive} textStyle={styles.tabText} activeTextStyle={styles.tabTextActive} heading={t('createrecord:form.consultation').toUpperCase()}>
							<View style={styles.wrapper}>
								<RecordingItem onClick={() => navigation.navigate('specialization')} icon={ICON_SPEC_SMALL} title={t('createrecord:form.specialty')} placeholder={t('createrecord:form.select_specialty')} />
								<RecordingItem onClick={() => navigation.navigate('servicesDetail')} icon={ICON_SERVICE_SMALL} title={t('createrecord:form.service')} placeholder={t('createrecord:form.select_service')} />
								<RecordingItem onClick={() => navigation.navigate('doctorsList')} icon={ICON_DOCTOR_SMALL} title={t('createrecord:form.doctor')} placeholder={t('createrecord:form.select_doctor')} />
								<View style={styles.datetimeWrap}>
									<View style={{ flex: 2 }}>
										<RecordingItem onClick={() => navigation.navigate('dateScreen')} icon={ICON_CALENDAR_SMALL} title={t('createrecord:form.date')} placeholder={t('createrecord:form.select_date')} />
									</View>
									<View style={styles.separator}></View>
									<View style={{ flex: 1 }}>
										<RecordingItem onClick={() => navigation.navigate('timeScreen')} contentContainerStyle={{ paddingLeft: 10 }} icon={ICON_TIME_SMALL} title={t('createrecord:form.time')} placeholder='12:00' />
									</View>
								</View>
							</View>
							<View style={styles.buttonWrap}>
								<CustomBtn label={t('common:actions_text.check_data')} onClick={() => navigate('authorization')} disabled={true} />
							</View>
						</Tab>
						<Tab tabStyle={styles.tab} activeTabStyle={styles.tabActive} textStyle={styles.tabText} activeTextStyle={styles.tabTextActive} heading={t('createrecord:form.research').toUpperCase()}>
							<View style={styles.wrapper}>
								<RecordingItem onClick={() => navigation.navigate('specialization')} icon={ICON_SPEC_SMALL} title={t('createrecord:form.specialty')} placeholder={t('createrecord:form.select_specialty')} />
								<RecordingItem onClick={() => navigation.navigate('servicesDetail')} icon={ICON_SERVICE_SMALL} title={t('createrecord:form.service')} placeholder={t('createrecord:form.select_service')} />
								<RecordingItem onClick={() => navigation.navigate('listDoctors')} icon={ICON_DOCTOR_SMALL} title={t('createrecord:form.doctor')} placeholder={t('createrecord:form.select_doctor')} />
								<View style={styles.datetimeWrap}>
									<View style={{ flex: 2 }}>
										<RecordingItem onClick={() => navigation.navigate('dateScreen')} icon={ICON_CALENDAR_SMALL} title={t('createrecord:form.date')} placeholder={t('createrecord:form.select_date')} />
									</View>
									<View style={styles.separator}></View>
									<View style={{ flex: 1 }}>
										<RecordingItem onClick={() => navigation.navigate('timeScreen')} contentContainerStyle={{ paddingLeft: 10 }} icon={ICON_TIME_SMALL} title={t('createrecord:form.time')} text='12:00' />
									</View>
								</View>
							</View>
							<View style={styles.buttonWrap}>
								<CustomBtn label={t('common:actions_text.check_data')} onClick={() => navigation.navigate('checkRecordScreen')} />
							</View>
						</Tab>
					</Tabs>
				</Content >
			</Container>
		)
	}
}

function mapStateToProps(state) {
	return {
		order: state.content.order,
		orderDatas: state.content.orderDatas,
		lang_key: state.authorization.language
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ContentActions, dispatch)
}

export default withNamespaces(['createrecord', 'common'])(connect(mapStateToProps, mapDispatchToProps)(ReceptionCreateScreen));
