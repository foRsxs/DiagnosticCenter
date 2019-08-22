import React, { Component } from 'react';
import { View, Text, Modal } from 'react-native';
import { withNamespaces } from 'react-i18next';
import { LocaleConfig, Calendar } from 'react-native-calendars';
import moment from 'moment';
import CustomBtn from '../../../components/common/CustomBtn';

import styles from './styles';
import { ACCENT_BLUE } from '../../../styles/constants';

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

class SimpleFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      finishDate: null,
      markedDates: null
    }
    LocaleConfig.defaultLocale = (props.lang_key === 'en') ? '' : props.lang_key;
  }

  selectDate = (date) => {
    const { startDate } = this.state;
    let start = null;
    let finish = null;

    if (startDate) {
      if (moment(date).isBefore(startDate)) {
        start = date;
        finish = startDate
      } else if (moment(startDate).isSame(date)) {
        start = null;
        finish = null;
      } else {
        start = startDate;
        finish = date
      }
    } else {
      start = date;
    }

    this.setState({
      startDate: start,
      finishDate: finish,
      markedDates: (start && finish) ? this.getAllDatesBetween(start, finish) :
        (start) ? { [this.getDateForCalendar(start)]: { endingDay: true, startingDay: true, color: ACCENT_BLUE, textColor: 'white' } } : null
    })
  }

  getDateForCalendar = (date) => {
    return moment(date).format('YYYY-MM-DD');
  };

  getAllDatesBetween = (fromDate, toDate) => {

    let curDate = new Date(fromDate.getTime());
    const datesForCalendar = {};
    datesForCalendar[this.getDateForCalendar(fromDate)] = {
      startingDay: true,
      color: ACCENT_BLUE,
      textColor: 'white'
    };
    if (toDate) {
      while (curDate < toDate) {
        curDate = new Date(curDate.setDate(curDate.getDate() + 1));
        datesForCalendar[this.getDateForCalendar(curDate)] = {
          color: ACCENT_BLUE,
          textColor: 'white',
          overflow: 'hidden'
        };
      }
      datesForCalendar[this.getDateForCalendar(toDate)] = {
        endingDay: true,
        color: ACCENT_BLUE,
        textColor: 'white',
        overflow: 'hidden'
      };
    }

    return datesForCalendar;
  };

  onSuccess = () => {
    const { onSuccess } = this.props;
    const { markedDates } = this.state;

    onSuccess(markedDates)
  }

  render() {
    const { openModal, onRemove, onSuccess, onCancel, t } = this.props;
    const { startDate, markedDates } = this.state;

    return (
      <Modal
        visible={openModal}
        transparent
      >
        <View style={styles.popupWrap}>
          <View style={styles.popup}>
            <Text style={styles.title}>{t(`common:actions.calendar_filter_title`)}</Text>
            <Calendar
              current={(startDate) ? this.getDateForCalendar(startDate) : new Date()}
              maxDate={this.getDateForCalendar(new Date())}
              style={styles.calendar}
              onDayPress={(day) => this.selectDate(new Date(day.timestamp))}
              markedDates={markedDates}
              markingType={'period'}
              theme={{
                calendarBackground: '#fff',
                'stylesheet.day.period': {
                  base: {
                    overflow: 'hidden',
                    height: 34,
                    alignItems: 'center',
                    width: 38,
                  }
                }
              }}
            />
            <View style={{marginTop: 10}}>
              <CustomBtn
                label={t(`common:actions.${(startDate) ? 'save' : 'cancel'}`)}
                onClick={() => {
                  (startDate) ? onSuccess(markedDates) : onCancel()
                }}
              />
              {
                (startDate) && (
                  <CustomBtn
                    label={t(`common:actions.clear`)}
                    onClick={() => {
                      this.setState({ startDate: null, finishDate: null, markedDates: null })
                      onRemove();
                    }}
                    contentContainerStyle={{ marginTop: 10 }}
                  />
                )
              }
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

export default withNamespaces('common')(SimpleFilter);