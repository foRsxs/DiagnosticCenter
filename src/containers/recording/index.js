import React, { Component } from 'react';
import { ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Container, View, Text, Content, Tabs, Tab, Form, Item, Label, Input } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import CustomBtn from '../../components/common/CustomBtn';
import RecordingItem from '../../components/RecordingItem';
import styles from './styles';
import { CONSULT_BG, RESEARCH_BG, ICON_SPEC_SMALL, ICON_SERVICE_SMALL, ICON_DOCTOR_SMALL, ICON_CALENDAR_SMALL, ICON_TIME_SMALL } from '../../styles/images';

class ReceptionInfoScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			activeTabOne: true
		}
	}

	render() {
		const { navigate } = this.props.navigation;
		const { t } = this.props;
		const { activeTabOne } = this.state;
		return (
			<Container contentContainerStyle={styles.mainContainer}>
				<Content>
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
								<RecordingItem onClick={() => this.props.navigation.navigate('specialization')} icon={ICON_SPEC_SMALL} title={t('createrecord:form.specialty')} placeholder={t('createrecord:form.select_specialty')} />
								<RecordingItem onClick={() => this.props.navigation.navigate('specialization')} icon={ICON_SERVICE_SMALL} title={t('createrecord:form.service')} placeholder={t('createrecord:form.select_service')} />
								<RecordingItem onClick={() => this.props.navigation.navigate('specialization')} icon={ICON_DOCTOR_SMALL} title={t('createrecord:form.doctor')} placeholder={t('createrecord:form.select_doctor')} />
								<View style={styles.datetimeWrap}>
									<RecordingItem onClick={() => this.props.navigation.navigate('specialization')} icon={ICON_CALENDAR_SMALL} title={t('createrecord:form.date')} placeholder={t('createrecord:form.select_date')} />
									<RecordingItem onClick={() => this.props.navigation.navigate('specialization')} icon={ICON_TIME_SMALL} title={t('createrecord:form.time')} placeholder='12:00' />
								</View>
							</View>
							<CustomBtn label={t('common:actions_text.check_data')} onClick={() => navigate('authorization')} />
						</Tab>
						<Tab tabStyle={styles.tab} activeTabStyle={styles.tabActive} textStyle={styles.tabText} activeTextStyle={styles.tabTextActive} heading={t('createrecord:form.research').toUpperCase()}>
							<Text>tab2</Text>
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

export default withNamespaces(['createrecord', 'common'])(connect(mapStateToProps, mapDispatchToProps)(ReceptionInfoScreen));
