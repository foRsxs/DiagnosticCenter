import React, {Component} from 'react';
import {StyleSheet, BackHandler, TouchableOpacity, Dimensions, Modal, ScrollView, ActivityIndicator} from 'react-native';
import {Container, View, Text} from 'native-base';
import {LocaleConfig, Calendar} from 'react-native-calendars';
import moment from 'moment';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import CustomBtn from '../../components/common/CustomBtn';
import variables from '../../styles/variables';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';
import Autocompete from '../../components/common/Autocomplete';
import ButtonDates from '../../components/common/ButtonDates';

const { mediumBlack, gray, activeGray, accentBlue, backgroundBlue } = variables.colors;
const { mainFont } = variables.fonts;
const { medium }  = variables.fSize;
const { width, height } = Dimensions.get('window');

let openStyle = {
  container: {
    backgroundColor: gray,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: activeGray
  },
  text: {
    color: 'black',
  },
}

let selectedStyle= {
  container: {
    backgroundColor: accentBlue,
  },
  text: {
    color: 'white',
  },
}

LocaleConfig.locales['ru'] = {
  monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
  monthNamesShort: ['Янв','Фев','Март','Апр','Май','Июнь','Июль','Авг','Сент','Окт','Нояб','Дек'],
  dayNames: ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
  dayNamesShort: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб']
};

LocaleConfig.locales['kz'] = {
  monthNames: ['Қаңтар','Ақпан','Наурыз','Сәуір','Мамыр','Маусым','Шілде','Тамыз','Қыркүйек','Қазан','Қараша','Желтоқсан'],
  monthNamesShort: ['Қаңтар','Ақпан','Наурыз','Сәуір','Мамыр','Маусым','Шілде','Тамыз','Қыркүйек','Қазан','Қараша','Желтоқсан'],
  dayNames: ['Жексенбі','Дүйсенбі','Сейсенбі','Сәрсенбі','Бейсенбі','Жұма','Сенбі'],
  dayNamesShort: ['Жс','Дс','Сс','Ср','Бс','Жм','Сб']
};

class ReceptionInfoScreen extends Component {

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
      markedDates: {},
      markedTimes: [],
      props_data: {
        type: (props.navigation.state.params) ? +props.navigation.state.params.type: 1,
        spec_id: (props.navigation.state.params) ? +props.navigation.state.params.spec_id: null,
        docdep_id: (props.navigation.state.params) ? +props.navigation.state.params.docdep_id: null,
      },
      enableScroll: true,
      openedKey: null,
      loading: false
    };
  }

  componentDidMount() {
    const {type, spec_id, docdep_id} = this.state.props_data;
    const {lang_key} = this.props;

    LocaleConfig.defaultLocale = (lang_key === 'en') ? '': lang_key;
    this.props.cleareOrderSuccess();
    this.props.cleareOrderDatas();

    if (type) this.props.setOrder({type}, 'type', 'spec');
    if (spec_id && type == 1) this.props.setOrder({spec_id}, 'spec_id', 'doc');
    if (docdep_id) this.props.setOrder({docdep_id}, 'docdep_id');

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.orderDatas !== this.props.orderDatas) this.setState({loading: false})
    if (prevProps.orderDatas.dates !== this.props.orderDatas.dates) this.setDates(this.props.orderDatas.dates);
    if (prevProps.orderDatas.times !== this.props.orderDatas.times) this.setTimes(this.props.orderDatas.times);
    if (prevProps.order.date !== this.props.order.date) this.setDates(this.props.orderDatas.dates, this.props.order.date);
    if (prevProps.order.time !== this.props.order.time) this.setTimes(this.props.orderDatas.times, this.props.order.time);
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }

  handleScroll(key) {
    let { openedKey } = this.state;

    this.setState({
      openedKey: (openedKey !== key) ? key : null,
      enableScroll: (openedKey === key) ? true : false
    });
  }

  setTimes = (times, selectedTime) => {
    if (!selectedTime) this.setState({shortOrder: null});
    let array = [];
    times.forEach((item, index)=> {
      array.push(item);
      (item.time === selectedTime) ? array[index].selected = true : array[index].selected = false;
    })
    this.setState({markedTimes: array});
  }

  setDates = (dates, selectedDay) => {
    let obj = {};
    dates.forEach((item) => {
      const day = moment(item.dd, ["DD-MM-YYYY"]).format('YYYY-MM-DD').toString();
      if (day === moment(selectedDay, ["DD-MM-YYYY"]).format('YYYY-MM-DD').toString()) {
        obj[day] = {selected: true, customStyles: selectedStyle}
      } else {
        obj[day] = {customStyles: openStyle}
      }
    })
    this.setState({markedDates: obj});
  }

  selectDate = (date) => {
    if (!this.state.markedDates[date]) return;
    this.props.setDate({date: moment(date, ["YYYY-MM-DD"]).format('DD.MM.YYYY').toString()});
    this.setState({showDates: false});
  }

  updateTimes = (time) => {
    this.props.setTime({time: time.time});
    this.setState({shortOrder: time, showTimes: false});
    if (this.props.order.time == time.time) this.setState({shortOrder: null})
  }

  renderDatePopup() {
    const {showDates, markedDates} = this.state;
    const { t } = this.props;

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={showDates}
        style={{zIndex: 10}}
        onRequestClose={() => {}}
      >
          <TouchableOpacity
            activeOpacity={1}
            onPress={()=> this.setState({showDates: false})}
          >
          <View style={styles.popupWrap}>
            <View style={styles.popup}>
              <Text style={{textAlign: 'center', fontFamily: mainFont, fontSize: medium}}>{ t('createrecord:form.select_date') }</Text>
              <Calendar
                style={{paddingTop: 20, backgroundColor: '#fff'}}
                theme={{
                  calendarBackground: '#fff',
                }}
                onDayPress={(day) => this.selectDate(day.dateString)}
                markedDates={markedDates}
                markingType={'custom'}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }

  renderTimePopup() {
    const {showTimes, markedTimes} = this.state;
    const { t } = this.props;

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={showTimes}
        style={{zIndex: 10}}
        onRequestClose={() => {}}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={()=> this.setState({showTimes: false})}
        >
          <View style={styles.popupWrap}>
            <ScrollView >
              <View style={[styles.popup, {marginTop: 30}]}>
                <Text style={{textAlign: 'center', fontFamily: mainFont, fontSize: medium}}>{ t('createrecord:form.select_time') }</Text>
                <View style={styles.timeContainer}>
                  {markedTimes.map((item, key)=>(
                    <View key={key} style={styles.timeItemWrap}>
                      <TouchableOpacity onPress={()=>this.updateTimes(item)}>
                        <Text style={[styles.timeItemAvaliable, (item.selected)? {backgroundColor: accentBlue, color: 'white'}: {}]}> { item.time } </Text>
                      </TouchableOpacity>
                    </View>
                    )
                  )}
                </View>
              </View>
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }


  render() {
    const { navigate } = this.props.navigation;
    const { t, order, orderDatas } = this.props;
    const { enableScroll, openedKey, shortOrder, typeExperiments, loading} = this.state;
    let doctor = '';
    let spec = '';
    let serv = '';
    let price = '';

    orderDatas.doctors.forEach((item) => {if (+item.docdep === +order.docdep_id) doctor = `${item.lastname} ${item.firstname} ${item.secondname}`});
    orderDatas.specialities.forEach((item) => {if (+item.spec_id === +order.spec_id) spec = `${item.spec_name}`});
    orderDatas.services.forEach((item) => {if (+item.servid === +order.servid) {serv = `${item.text}`; price = `${item.price}`}});
    console.log(orderDatas, order)
    return (
      <Container>
        {(loading) && (<View style={styles.loaderWrap}>
          <ActivityIndicator size="large" color={accentBlue} />
        </View>)}
        <ScrollView scrollEnabled={enableScroll}>   
          <Header text={ t('createrecord:title') } navigation = {this.props.navigation}/>
          <HeaderBottom />
          <View style={{margin: 20, position: 'relative', flex: 1, zIndex: 2}} >        
            <Autocompete 
              contentContainerStyle={{marginBottom: 20}}
              label={ t('createrecord:form.research') } 
              data={typeExperiments} 
              currentKey={0}
              openedKey={openedKey}
              onTap={ () => this.handleScroll(0) }
              onSelect={(value) => {
                if (order.type !== value) this.setState({loading: true});  
                this.handleScroll(0);
                this.props.setOrder({type: value}, 'type', 'spec');
              }} 
              selected={(order.type)? (order.type): 1} 
              disabled={false}
            />
            <Autocompete 
              contentContainerStyle={{marginBottom: 20}} 
              label={ t('createrecord:form.select_specialty') }
              data={orderDatas.specialities} 
              currentKey={1}
              openedKey={openedKey}
              onTap={ () => this.handleScroll(1)}
              onSelect={(value) => {
                if (order.spec_id !== value) this.setState({loading: true});  
                this.handleScroll(1);
                (order.type == 1) ? this.props.setOrder({spec_id: value}, 'spec_id', 'doc') : this.props.setOrder({spec_id: value}, 'spec_id');
              }}
              selected={order.spec_id}
              disabled={(order.type && orderDatas.specialities) ? false : true}
            />
            <Autocompete 
              contentContainerStyle={{marginBottom: 20}} 
              label={ t('createrecord:form.select_service') }
              data={orderDatas.services} 
              currentKey={2}
              openedKey={openedKey}
              onTap={ () => this.handleScroll(2) }
              onSelect={(value) => {
                if (order.servid !== value) this.setState({loading: true});               
                this.handleScroll(2);
                this.props.setOrder({servid: value}, 'servid', 'doc');
              }}
              selected={order.servid}
              disabled={((order.type === 2 && order.spec_id && orderDatas.services)) ? false : true}
            />
            <Autocompete 
              contentContainerStyle={{marginBottom: 20}} 
              label={ t('createrecord:form.select_doctor') } 
              data={orderDatas.doctors}
              currentKey={3}
              openedKey={openedKey}
              onTap={ () => this.handleScroll(3) }
              onSelect={(value) => {
                if (order.docdep_id !== value) this.setState({loading: true});             
                this.handleScroll(3);
                this.props.setOrder({docdep_id: value}, 'docdep_id');
              }}
              selected={order.docdep_id}
              disabled={((order.type === 2 && order.spec_id && order.servid && orderDatas.doctors) || (order.type === 1 && order.spec_id && orderDatas.doctors)) ? false : true}
            />
            <ButtonDates 
              contentContainerStyle={{marginBottom: 20}}
              label={ t('createrecord:form.select_date') }
              data={orderDatas.dates} 
              onPress={() => this.setState({showDates: true})}
              selected={order.date} 
              disabled={(order.docdep_id) ? false : true}
            />
            <ButtonDates 
              contentContainerStyle={{marginBottom: 20}}
              label={ t('createrecord:form.select_time') } 
              data={orderDatas.times} 
              onPress={() => this.setState({showTimes: true})} 
              selected={order.time} 
              disabled={(order.docdep_id && order.date) ? false : true}
            />
          {this.renderDatePopup()}
          {this.renderTimePopup()}
        </View>
        {(shortOrder) && (
          <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
            <CustomBtn label={ t('common:actions_text.check_data') } onClick={()=> navigate('recordingItem', {...shortOrder, serv_id: order.servid, doctor, spec, serv, price, type: order.type})}/>
          </View>
        )}        
        </ScrollView> 
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  autocompleteContainer: {
    position: 'relative',
    zIndex: 1
  },
  popupWrap: {
    width: width, 
    height: height, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  popup: {
    width: 300, 
    backgroundColor: 'white', 
    alignSelf: 'center', 
    borderRadius: 10, 
    padding: 20,
    justifyContent: 'space-between'
  },
  timeItemWrap: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  timeItemAvaliable: {
    width: 70,
    paddingVertical: 5,
    backgroundColor: backgroundBlue,
    borderColor: accentBlue,
    borderRadius: 10,
    borderWidth: 1,
    textAlign: 'center',
    margin: 10,
    justifyContent: 'center',
    fontSize: variables.fSize.large,
    fontFamily: variables.fonts.mainFont,
    color: mediumBlack
  },
  timeContainer: {
    paddingHorizontal: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    paddingTop: 20
  },
  loaderWrap: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    width: '100%', 
    height: '100%', 
    justifyContent: 'center', 
    alignItems: 'center'
  }
});


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
