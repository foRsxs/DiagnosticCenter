import React, { Component } from 'react';
import { View } from 'react-native';
import moment from 'moment';
import { Container, Content, Text } from 'native-base';
import { LocaleConfig, Calendar } from 'react-native-calendars';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import Header from '../../components/common/Header';

import styles from './styles';
import { ACCENT_BLUE, GRAY, ACTIVE_GRAY, BLACK, WHITE } from '../../styles/constants';

let openStyle = {
	container: {
		backgroundColor: GRAY,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: ACTIVE_GRAY
	},
	text: {
		color: BLACK,
	},
}

let selectedStyle = {
	container: {
		backgroundColor: ACCENT_BLUE,
	},
	text: {
		color: WHITE,
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
			markedDates: {},
		};
	}

	componentDidMount() {
		const {lang_key, orderDatas} = this.props;
		this.setDates(orderDatas.dates)
		LocaleConfig.defaultLocale = (lang_key === 'en') ? '': lang_key;
	}

	componentDidUpdate(prevProps) {
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
		const { setDate, navigation } = this.props;
		if (!this.state.markedDates[date]) return;
		setDate({ date: moment(date, ["YYYY-MM-DD"]).format('DD.MM.YYYY').toString() });
		this.setState({ showDates: false });
		navigation.goBack();
	}

	render() {
		const { markedDates } = this.state;
		const { t } = this.props;
		return (
			<Container contentContainerStyle={styles.mainContainer}>
				<Header backButton={true} text={t('recordings:item.select_date')} navigation={this.props.navigation} />
				<Content>
					<Calendar
						style={styles.calendar}
						theme={{
							calendarBackground: '#fff',
						}}
						onDayPress={(day) => this.selectDate(day.dateString)}
						markedDates={markedDates}
						markingType={'custom'}
					/>
					<View style={styles.bottomWrap}>
						<View style={styles.centerWrap}>
							<View style={styles.itemsWrap}>
								<View style={styles.unSelectedItem}></View>
								<Text style={styles.itemsTxt}>{t('recordings:item.ok_recording')}</Text>
							</View>
							<View style={styles.itemsWrap}>
								<View style={styles.selectedItem}></View>
								<Text style={styles.itemsTxt}>{t('recordings:item.date_select')}</Text>
							</View>
						</View>
					</View>
				</Content>
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

export default withNamespaces(['createrecord', 'recordings', 'common'])(connect(mapStateToProps, mapDispatchToProps)(DateScreen));