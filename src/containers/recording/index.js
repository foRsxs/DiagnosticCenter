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
    console.log(props)
		this.state = {
      activeTabOne: true,
      props_data: {
				type: (props.navigation.state.params) ? +props.navigation.state.params.type : 1,
				spec_id: (props.navigation.state.params) ? props.navigation.state.params.spec_id : null,
				docdep_id: (props.navigation.state.params) ? props.navigation.state.params.docdep_id : null,
			},
		}
  }
  
  componentDidMount() {
    const {type, spec_id, docdep_id} = this.state.props_data;
		const {setOrder, cleareOrderSuccess, cleareOrderDatas, setOrderValue, doctorData} = this.props;

		cleareOrderSuccess();
		cleareOrderDatas();
    console.log(type, spec_id, docdep_id)
		if (type) setOrder({type}, 'type', 'spec');
		if (spec_id && type == 1) {
      setOrder({spec_id}, 'spec_id', 'doc');
      setOrderValue({spec: doctorData.speciality});
    }
		if (docdep_id) {
      setOrder({docdep_id}, 'docdep_id');
      setOrderValue({docdep: `${doctorData.lastname} ${doctorData.firstname} ${doctorData.secondname}`});
    }
  }

  complete = () => {
    const { navigation, orderDatas, order } = this.props; 
    navigation.navigate('checkRecordScreen', {
      price: orderDatas.services.find((item) => +item.servid === +order.servid).price, 
      room: orderDatas.times.find((item) => item.time === order.time).room,
      rnumb_id: orderDatas.times.find((item) => item.time === order.time).rnumb_id,
    });
  }

	render() {
		const { navigation, setOrder, orderValues, order } = this.props;
		const { t } = this.props;
    const { activeTabOne } = this.state;
    
    const orderIsComplete = (order.date && order.docdep_id && order.servid && order.spec_id && order.time) ? true : false;

		return (
			<Container contentContainerStyle={styles.mainContainer}>
				<Content>
					<TouchableOpacity
						onPress={() => {}}
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
          <Tabs 
            onChangeTab={() => {
              this.setState({ activeTabOne: !activeTabOne });
              setOrder({type: (activeTabOne)? 2: 1}, 'type', 'spec');
            }} 
            tabContainerStyle={styles.wrapTabs}
          >
						<Tab tabStyle={styles.tab} activeTabStyle={styles.tabActive} textStyle={styles.tabText} activeTextStyle={styles.tabTextActive} heading={t('createrecord:form.consultation').toUpperCase()}>
							<View style={styles.wrapper}>
                <RecordingItem 
                  onClick={() => navigation.navigate('specialization')} 
                  icon={ICON_SPEC_SMALL} 
                  title={t('createrecord:form.specialty')}
                  text={orderValues.spec}
                  placeholder={t('createrecord:form.select_specialty')} 
                />
                <RecordingItem 
                  icon={ICON_SERVICE_SMALL} title={t('createrecord:form.service')}
                  text={orderValues.serv}
                  placeholder={t('createrecord:form.select_service')} 
                />
                <RecordingItem 
                  onClick={() => {
                    if (!order.servid) return;
                    navigation.navigate('doctorsList',{isOrder: true})
                  }} 
                  icon={ICON_DOCTOR_SMALL} title={t('createrecord:form.doctor')} 
                  text={orderValues.docdep}
                  placeholder={t('createrecord:form.select_doctor')} 
                />
								<View style={styles.datetimeWrap}>
									<View style={{ flex: 2 }}>
                    <RecordingItem 
                      onClick={() => {
                        if (!order.docdep_id) return;
                        navigation.navigate('dateScreen')
                      }} 
                      icon={ICON_CALENDAR_SMALL} 
                      title={t('createrecord:form.date')} 
                      text={orderValues.date}
                      placeholder={t('createrecord:form.select_date')} 
                    />
									</View>
									<View style={styles.separator}></View>
									<View style={{ flex: 1 }}>
                    <RecordingItem 
                      onClick={() => {
                        if (!order.date) return;
                        navigation.navigate('timeScreen')
                      }} 
                      contentContainerStyle={{ paddingLeft: 10 }} 
                      icon={ICON_TIME_SMALL} 
                      title={t('createrecord:form.time')} 
                      placeholder='12:00'
                      text={orderValues.time}
                    />
									</View>
								</View>
							</View>
							<View style={styles.buttonWrap}>
								<CustomBtn label={t('common:actions_text.check_data')} onClick={() => this.complete()} disabled={!orderIsComplete} />
							</View>
						</Tab>
						<Tab tabStyle={styles.tab} activeTabStyle={styles.tabActive} textStyle={styles.tabText} activeTextStyle={styles.tabTextActive} heading={t('createrecord:form.research').toUpperCase()}>
							<View style={styles.wrapper}>
                <RecordingItem 
                  onClick={() => navigation.navigate('specialization')} 
                  icon={ICON_SPEC_SMALL} 
                  title={t('createrecord:form.specialty')}
                  text={orderValues.spec}
                  placeholder={t('createrecord:form.select_specialty')} 
                />
                <RecordingItem 
                  onClick={() => {
                    if (!order.spec_id) return;
                    navigation.navigate('servicesDetail', {isOrder: true})
                  }}
                  icon={ICON_SERVICE_SMALL} title={t('createrecord:form.service')}
                  text={orderValues.serv}
                  placeholder={t('createrecord:form.select_service')} 
                />
                <RecordingItem 
                  onClick={() => {
                    if (!order.servid) return;
                    navigation.navigate('doctorsList', {isOrder: true})
                  }} 
                  icon={ICON_DOCTOR_SMALL} title={t('createrecord:form.doctor')} 
                  text={orderValues.docdep}
                  placeholder={t('createrecord:form.select_doctor')} 
                />
								<View style={styles.datetimeWrap}>
									<View style={{ flex: 2 }}>
                    <RecordingItem 
                      onClick={() => {
                        if (!order.docdep_id) return;
                        navigation.navigate('dateScreen');
                      }} 
                      icon={ICON_CALENDAR_SMALL} title={t('createrecord:form.date')} 
                      text={orderValues.date}
                      placeholder={t('createrecord:form.select_date')} 
                    />
									</View>
									<View style={styles.separator}></View>
									<View style={{ flex: 1 }}>
                    <RecordingItem 
                      onClick={() => {
                        if (!order.date) return;
                        navigation.navigate('timeScreen');
                      }}
                      contentContainerStyle={{ paddingLeft: 10 }} 
                      icon={ICON_TIME_SMALL} 
                      title={t('createrecord:form.time')} 
                      text={orderValues.time}
                    />
									</View>
								</View>
							</View>
							<View style={styles.buttonWrap}>
								<CustomBtn label={t('common:actions_text.check_data')} onClick={() => this.complete()} disabled={!orderIsComplete}/>
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
    orderValues: state.content.orderValues,
    lang_key: state.authorization.language,
    doctorData: state.content.doctorData,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ContentActions, dispatch)
}

export default withNamespaces(['createrecord', 'common'])(connect(mapStateToProps, mapDispatchToProps)(ReceptionCreateScreen));
