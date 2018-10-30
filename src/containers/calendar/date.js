import React, { Component } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Container, Content, View } from 'native-base';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';
import {LocaleConfig, Calendar} from 'react-native-calendars';
import variables from '../../styles/variables'

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
        <HeaderBottom search={true} />
        <Content padder>
          <Calendar
            onDayPress={(day) => this._selectDate(day.dateString)}
            markedDates={markedDates}
            markingType={'custom'}
          />
        </Content>

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
  }
});

export default ServicesScreen;
