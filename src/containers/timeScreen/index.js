import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Content, View, Text } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import Header from '../../components/common/Header';
import styles from './styles';

class TimeScreen extends Component {

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
			markedTimes: [
				'09:00',
        '17:30'
			],
		};
	}

	componentDidUpdate(prevProps) {
    if (prevProps.orderDatas.times !== this.props.orderDatas.times) this.setTimes(this.props.orderDatas.times);
    if (prevProps.order.time !== this.props.order.time) this.setTimes(this.props.orderDatas.times, this.props.order.time);
  }

	setTimes = (times, selectedTime) => {
		if (!selectedTime) this.setState({ shortOrder: null });
		let array = [];
		times.forEach((item, index) => {
			array.push(item);
			(item.time === selectedTime) ? array[index].selected = true : array[index].selected = false;
		})
		this.setState({ markedTimes: array });
	}

	updateTimes = (time) => {
		this.props.setTime({ time: time.time });
		this.setState({ shortOrder: time, showTimes: false });
		if (this.props.order.time == time.time) this.setState({ shortOrder: null })
	}

	render() {
		const { markedTimes } = this.state;
		const { t } = this.props;
		return (
			<Container contentContainerStyle={styles.mainContainer}>
				<Header backButton={true} text={t('recordings:item.select_time')} navigation={this.props.navigation} />
				<Content>
					<View style={styles.timeContainer}>
						{markedTimes.map((item, key) => (
							<View key={key} style={styles.timeItemWrap}>
								<TouchableOpacity onPress={() => this.updateTimes(item)}>
									<Text style={[styles.timeItemAvaliable, (item.selected) ? styles.textTime : {}]}> {item.time} </Text>
								</TouchableOpacity>
							</View>
						)
						)}
					</View>
					<View style={styles.bottomWrap}>
						<View style={styles.centerWrap}>
							<View style={styles.itemsWrap}>
								<View style={styles.unSelectedItem}></View>
								<Text style={styles.itemsTxt}>{t('recordings:item.ok_time')}</Text>
							</View>
							<View style={styles.itemsWrap}>
								<View style={styles.selectedItem}></View>
								<Text style={styles.itemsTxt}>{t('recordings:item.time_select')}</Text>
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

export default withNamespaces(['createrecord', 'recordings', 'common'])(connect(mapStateToProps, mapDispatchToProps)(TimeScreen));