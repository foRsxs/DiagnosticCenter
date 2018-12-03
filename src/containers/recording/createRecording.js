import React, {Component} from 'react';
import {StyleSheet, BackHandler, TouchableOpacity, Dimensions, Modal} from 'react-native';
import {Container, View, Text} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
const { medium, large, main }  = variables.fSize;
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
  monthNamesShort: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
  dayNames: ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
  dayNamesShort: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб']
};

LocaleConfig.defaultLocale = 'ru';

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
          value: 'Консультация',
        },
        {
          id: 2,
          value: 'Исследования'
        }
      ],
      markedDates: {},
      markedTimes: [],
      props_data: {
        type: 1,
        spec_id: (props.navigation.state.params) ? props.navigation.state.params.spec_id: null,
        docdep_id: (props.navigation.state.params) ? props.navigation.state.params.docdep_id: null,
      }
    };
  }

  componentDidMount() {
    const {type, spec_id, docdep_id} = this.state.props_data;
    this.props.cleareOrderSuccess();
    console.log(type, spec_id, docdep_id);
    if (type) this.props.setOrder({type}, 'type', 'spec');
    if (spec_id && type == 1) this.props.setOrder({spec_id}, 'spec_id', 'doc');
    if (docdep_id) this.props.setOrder({docdep_id}, 'docdep_id');
    
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.orderDatas.dates !== this.props.orderDatas.dates) this.setDates(this.props.orderDatas.dates);
    if (prevProps.orderDatas.times !== this.props.orderDatas.times) this.setTimes(this.props.orderDatas.times);
    if (prevProps.order.date !== this.props.order.date) this.setDates(this.props.orderDatas.dates, this.props.order.date);
    if (prevProps.order.time !== this.props.order.time) this.setTimes(this.props.orderDatas.times, this.props.order.time);
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
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

  _selectDate = (date) => {
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

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={showDates}
        style={{zIndex: 10}}
        onRequestClose={() => {}}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={()=> this.setState({showDates: false})}
          >
          <View style={styles.popupWrap}>
            <View style={styles.popup}>
              <Text style={{textAlign: 'center', fontFamily: mainFont, fontSize: medium}}>Выберите дату</Text>
              <Calendar
                style={{paddingTop: 20, backgroundColor: '#fff'}}
                theme={{
                  calendarBackground: '#fff',
                }}
                onDayPress={(day) => this._selectDate(day.dateString)}
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
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={showTimes}
        style={{zIndex: 10}}
        onRequestClose={() => {}}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={()=> this.setState({showTimes: false})}
          >
          <View style={styles.popupWrap}>
            <View style={styles.popup}>
              <Text style={{textAlign: 'center', fontFamily: mainFont, fontSize: medium}}>Свободные номерки</Text>
              <View style={styles.timeContainer}>
                {markedTimes.map((item, key)=>(
                  <View key={key} style={styles.timeItemWrap}>
                    <TouchableOpacity 
                      onPress={()=>this.updateTimes(item)}
                    >
                    <Text style={[styles.timeItemAvaliable, (item.selected)? {backgroundColor: accentBlue, color: 'white'}: {}]}> { item.time } </Text>
                    </TouchableOpacity>
                  </View>
                  )
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }

  render() {
    const { navigate } = this.props.navigation;
    const { order, orderDatas } = this.props;
    const { shortOrder, typeExperiments} = this.state;
    let doctor = '';
    orderDatas.doctors.forEach((item) => {if (+item.docdep === +order.docdep_id) doctor = `${item.lastname} ${item.firstname} ${item.secondname}`})
    let spec = '';
    orderDatas.specialities.forEach((item) => {if (+item.spec_id === +order.spec_id) spec = `${item.spec_name}`})
    return (
      <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
        <Header text={"ЗАПИСЬ НА ПРИЁМ"} navigation = {this.props.navigation}/>
        <HeaderBottom />
        <KeyboardAwareScrollView style={{marginTop: -10, zIndex: 1, position: 'relative', flex: 1}} contentContainerStyle={{ margin: 20, position: 'relative', flex: 1, zIndex: 2}}>
          <View style={[styles.autocompleteContainer, {zIndex: 6}]}>
            <Autocompete 
              contentContainerStyle={{marginBottom: 10}}
              label="Исследования" 
              data={typeExperiments} 
              onSelect={(value) => this.props.setOrder({type: value}, 'type', 'spec')} 
              selected={(order.type)? (order.type): 1} 
              disabled={false}/>
          </View>
          <View style={[styles.autocompleteContainer, {top: 60, zIndex: 5}]}>
            <Autocompete 
              contentContainerStyle={{marginBottom: 10}} 
              label="Выберите специальность" 
              data={orderDatas.specialities} 
              onSelect={(value) => {
                (order.type == 1) ? this.props.setOrder({spec_id: value}, 'spec_id', 'doc') : this.props.setOrder({spec_id: value}, 'spec_id');
              }}
              selected={order.spec_id}
              disabled={(order.type && orderDatas.specialities)?false: true}
            />
          </View>
          <View style={[styles.autocompleteContainer, {top: 120, zIndex: 4}]}>
            <Autocompete 
              contentContainerStyle={{marginBottom: 10}} 
              label="Выберите услугу" 
              data={orderDatas.services} 
              onSelect={(value) => this.props.setOrder({servid: value}, 'servid', 'doc')} 
              selected={order.servid}
              disabled={((order.type === 2 && order.spec_id && orderDatas.services))?false: true}/>
          </View>
          <View style={[styles.autocompleteContainer, {top: 180, zIndex: 3}]}>
            <Autocompete 
              contentContainerStyle={{marginBottom: 10}} 
              label="Выберите врача" 
              data={orderDatas.doctors}
              onSelect={(value) => this.props.setOrder({docdep_id: value}, 'docdep_id')}
              selected={order.docdep_id}
              disabled={((order.type === 2 && order.spec_id && order.servid && orderDatas.doctors) || (order.type === 1 && order.spec_id && orderDatas.doctors))?false: true}/>
          </View>
          <View style={[styles.autocompleteContainer, {top: 240, zIndex: 2}]}>
            <ButtonDates 
              contentContainerStyle={{marginBottom: 10}}
              label="Выберите дату" 
              data={orderDatas.dates} 
              onPress={() => this.setState({showDates: true})} 
              selected={order.date} 
              disabled={(order.docdep_id)? false: true}/>
          </View>
          <View style={[styles.autocompleteContainer, {top: 300, zIndex: 2}]}>
            <ButtonDates 
              contentContainerStyle={{marginBottom: 10}}
              label="Выберите время" 
              data={orderDatas.times} 
              onPress={() => this.setState({showTimes: true})} 
              selected={order.time} 
              disabled={(order.docdep_id && order.date)? false: true}/>
          </View>
          {this.renderDatePopup()}
          {this.renderTimePopup()}
        </KeyboardAwareScrollView > 
        {(shortOrder) && (
          <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
            <CustomBtn label={'ПРОВЕРИТЬ ДАННЫЕ'} onClick={()=> navigate('recordingItem', {...shortOrder, serv_id: order.servid, doctor, spec})}/>
          </View>
        )}
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
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
    width: '80%', 
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
});


function mapStateToProps(state) {
  return {
    order: state.content.order,
    orderDatas: state.content.orderDatas,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch)
}

export default withNamespaces(['listdoctors', 'common'])(connect(mapStateToProps, mapDispatchToProps)(ReceptionInfoScreen));
