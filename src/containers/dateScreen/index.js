import React, { Component } from 'react';
import { StyleSheet, BackHandler, TouchableOpacity, Dimensions, Modal, ScrollView, ActivityIndicator } from 'react-native';
import { Container, Content, View, Text } from 'native-base';
import { LocaleConfig, Calendar } from 'react-native-calendars';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import Header from '../../components/common/Header';

import variables from '../../styles/variables';
const { medium } = variables.fSize;

import { ACCENT_BLUE, GRAY, DARK_GREY, BACKGROUND_BLUE, ACTIVE_GRAY, COLOR_BORDER, MAIN_FONT } from '../../styles/constants';

let openStyle = {
	container: {
		backgroundColor: GRAY,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: ACTIVE_GRAY
	},
	text: {
		color: 'black',
	},
}

let selectedStyle = {
	container: {
		backgroundColor: ACCENT_BLUE,
	},
	text: {
		color: 'white',
	},
}

LocaleConfig.locales['ru'] = {
	monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
	monthNamesShort: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
	dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
	dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
};

LocaleConfig.locales['kz'] = {
	monthNames: ['Қаңтар', 'Ақпан', 'Наурыз', 'Сәуір', 'Мамыр', 'Маусым', 'Шілде', 'Тамыз', 'Қыркүйек', 'Қазан', 'Қараша', 'Желтоқсан'],
	monthNamesShort: ['Қаңтар', 'Ақпан', 'Наурыз', 'Сәуір', 'Мамыр', 'Маусым', 'Шілде', 'Тамыз', 'Қыркүйек', 'Қазан', 'Қараша', 'Желтоқсан'],
	dayNames: ['Жексенбі', 'Дүйсенбі', 'Сейсенбі', 'Сәрсенбі', 'Бейсенбі', 'Жұма', 'Сенбі'],
	dayNamesShort: ['Жс', 'Дс', 'Сс', 'Ср', 'Бс', 'Жм', 'Сб']
};

class DateScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			testShortOrder: {
				dd: "14.12.2018",
				rnumb_id: "5677155",
				room: "412",
				selected: false,
				time: "15:00",
			},
			shortOrder: null,
			showDates: false,
			showTimes: false,
			typeExperiments: [
				{
					id: 1,
					value: props.t('createrecord:form.consultation'),
				},
				{
					id: 2,
					value: props.t('createrecord:form.research')
				}
			],
			markedDates: {
				'2019-02-10': {
					selected: true,
					customStyles: selectedStyle,
				},
				'2019-02-08': {
					customStyles: openStyle
				},
			},
			markedTimes: [],
			props_data: {
				type: (props.navigation.state.params) ? +props.navigation.state.params.type : 1,
				spec_id: (props.navigation.state.params) ? +props.navigation.state.params.spec_id : null,
				docdep_id: (props.navigation.state.params) ? +props.navigation.state.params.docdep_id : null,
			},
			enableScroll: true,
			openedKey: null,
			loading: false
		};
	}

	componentDidUpdate(prevProps) {
		if (prevProps.orderDatas !== this.props.orderDatas) this.setState({ loading: false })
		if (prevProps.orderDatas.dates !== this.props.orderDatas.dates) this.setDates(this.props.orderDatas.dates);
		if (prevProps.order.date !== this.props.order.date) this.setDates(this.props.orderDatas.dates, this.props.order.date);
	}

	setDates = (dates, selectedDay) => {
		let obj = {};
		dates.forEach((item) => {
			const day = moment(item.dd, ["DD-MM-YYYY"]).format('YYYY-MM-DD').toString();
			if (day === moment(selectedDay, ["DD-MM-YYYY"]).format('YYYY-MM-DD').toString()) {
				obj[day] = { selected: true, customStyles: selectedStyle }
			} else {
				obj[day] = { customStyles: openStyle }
			}
		})
		this.setState({ markedDates: obj });
	}

	selectDate = (date) => {
		if (!this.state.markedDates[date]) return;
		this.props.setDate({ date: moment(date, ["YYYY-MM-DD"]).format('DD.MM.YYYY').toString() });
		this.setState({ showDates: false });
	}

	render() {
		const { showDates, markedDates } = this.state;
		const { t } = this.props;
		return (
			<Container contentContainerStyle={styles.mainContainer}>
				<Header backButton={true} text={t('recordings:item.select_date')} navigation={this.props.navigation} />
				<Content>
					<Calendar
						style={{ paddingTop: 20, backgroundColor: '#fff', marginHorizontal: 20 }}
						theme={{
							calendarBackground: '#fff',
						}}
						onDayPress={(day) => this.selectDate(day.dateString)}
						markedDates={markedDates}
						markingType={'custom'}
					/>
					<View style={{ paddingVertical: 10, borderTopWidth: 1, borderColor: COLOR_BORDER }}>
						<View style={styles.itemsWrap}>
							<View style={styles.unSelectedItem}></View>
							<Text style={styles.itemsTxt}>запись доступна</Text>
						</View>
						<View style={styles.itemsWrap}>
							<View style={styles.selectedItem}></View>
							<Text style={styles.itemsTxt}>выбранная дата</Text>
						</View>
					</View>
				</Content>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	mainContainer: {
		flexDirection: 'column',
		height: '100%',
	},
	unSelectedItem: {
		marginRight: 10,
		backgroundColor: BACKGROUND_BLUE,
		borderColor: ACCENT_BLUE,
		width: 10,
		height: 10,
		borderRadius: 15,
		borderWidth: 1
	},
	selectedItem: {
		marginRight: 10,
		backgroundColor: ACCENT_BLUE,
		width: 10,
		height: 10,
		borderRadius: 15
	},
	itemsWrap: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	itemsTxt: {
		color: DARK_GREY,
		fontFamily: MAIN_FONT,
		fontSize: medium
	}
})

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

export default withNamespaces(['createrecord', 'recordings', 'common'])(connect(mapStateToProps, mapDispatchToProps)(DateScreen));