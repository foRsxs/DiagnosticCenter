import React, { Component } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Container, Content, View, Text } from 'native-base';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';
import {LocaleConfig, Calendar} from 'react-native-calendars';
import variables from '../../styles/variables';
import CustomBtn from '../../components/common/CustomBtn';

LocaleConfig.locales['ru'] = {
  monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
  monthNamesShort: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
  dayNames: ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
  dayNamesShort: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб']
};

LocaleConfig.defaultLocale = 'ru';
let {colors} = variables;
let openStyle = {
  container: {
    backgroundColor: colors.gray,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.activeGray
  },
  text: {
    color: 'black',
  },
}
let selectedStyle= {
  container: {
    backgroundColor: colors.wiolet,
  },
  text: {
    color: 'white',
  },
}
class ServicesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: '2018-10-25',
      markedDates: {
        '2018-10-25': {
          selected: true,
          customStyles: selectedStyle,
        },
        '2018-10-29': {
          customStyles: openStyle
        },
      }
    };
  }

  componentDidMount() { }

  _selectDate = (date) => {
    let {markedDates} = this.state;
    let obj = {};
    for ( let i in markedDates) {
      if (i === date) {
        if (markedDates[i].selected) {
          obj[i] = {
            selected : false,
            customStyles : openStyle
          }
          this.setState({selectedDate: null})
        } else {
          obj[i] = {
            selected : true,
            customStyles : selectedStyle,
          }
          this.setState({selectedDate: date})
        }
      } else {
        obj[i] = markedDates[i];
        this.setState({selectedDate: null})
      }
    }
    this.setState({markedDates: obj})
  }

  render() {
    let horizontalView = true;
    const { navigate } = this.props.navigation;
    let {markedDates} = this.state;
    console.log(markedDates)
    return (
      <Container style={horizontalView?styles.horizontalWrap:styles.verticalWrap}>
        <Header text="КАТАЛОГ ВРАЧЕЙ" navigation = {this.props.navigation}/>
        <HeaderBottom text="выберите дату визита" />
        <Content style={{marginTop: -10, zIndex: 1}}>
          <Calendar
            style={{paddingTop: 15, backgroundColor: '#eaf3fd',}}
            theme={{
              calendarBackground: '#eaf3fd',
            }}
            onDayPress={(day) => this._selectDate(day.dateString)}
            markedDates={markedDates}
            markingType={'custom'}
          />
          <View style={{paddingVertical: 10}}>
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
        <View style={{paddingHorizontal: 15, paddingTop: 20}}>
          <CustomBtn label='ВЫБРАТЬ ВРЕМЯ' onClick={()=>{Alert.alert('ok')}}/>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    width: '50%', 
    paddingHorizontal: 5,
  },
  horizontalWrap: {
    //paddingHorizontal: 10,
    paddingVertical: 20,
  },
  verticalWrap: {
    paddingHorizontal: 5,
    paddingVertical: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '100%'
  },
  unSelectedItem: {
    marginRight: 10, 
    backgroundColor: variables.colors.backgroundBlue, 
    borderColor: variables.colors.wiolet, 
    width: 10, 
    height: 10, 
    borderRadius: 15, 
    borderWidth: 1
  },
  selectedItem: {
    marginRight: 10, 
    backgroundColor: variables.colors.wiolet, 
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
    color: variables.colors.lightBlack,
    fontSize: variables.fSize.medium
  }
});

export default ServicesScreen;
