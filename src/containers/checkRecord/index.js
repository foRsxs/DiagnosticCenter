import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { Container, View, Content, Text } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import * as ContentActions from '../../actions/content';
import Header from '../../components/common/Header';
import CustomBtn from '../../components/common/CustomBtn';
import RecordingItem from '../../components/RecordingItem';
import Popup from '../../components/common/Popup';
import styles from './styles';
import { ICON_SERVICE_SMALL, ICON_DOCTOR_SMALL, ICON_CALENDAR_SMALL, ICON_TIME_SMALL, ICON_PRICE_SMALL, ICON_NUMBER_SMALL } from '../../styles/images';
import { ACCENT_BLUE } from '../../styles/constants';
import 'moment/locale/ru';
import 'moment/locale/kk';
import 'moment/locale/en-gb';

class CheckRecordScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      price: (props.navigation.state.params) ? props.navigation.state.params.price : null,
      room: (props.navigation.state.params) ? props.navigation.state.params.room : null,
      rnumb_id: (props.navigation.state.params) ? props.navigation.state.params.rnumb_id : null,
      preparation_text: (props.navigation.state.params) ? props.navigation.state.params.preparation_text : null,
      modalVisible: false,
      hideButton: false,
      loading: false,
    }
    moment.locale((props.lang_key === 'kz') ? 'kk' : (props.lang_key === 'en') ? 'en-gb' : 'ru');
  }

  componentDidMount() {
    this.props.setCreatingOrderSuccess(false);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.orderCreated !== this.props.orderCreated && this.props.orderCreated) this.setState({ modalVisible: true, loading: false });
    if (prevProps.orderDeleted !== this.props.orderDeleted && this.props.orderDeleted) this.props.navigation.navigate('recordingList');
  }

  createOrder = () => {
    const { order, saveOrder } = this.props;
    const { rnumb_id } = this.state;

    saveOrder({ rnumb_id, date: order.date, serv_id: order.servid, type: order.type });
    this.setState({ loading: true });
  }

  _save = () => {
    const { setCreatingOrderSuccess, getListTalonInfo, cleareOrder } = this.props;
    const { navigate } = this.props.navigation;
    const { rnumb_id } = this.state;

    setCreatingOrderSuccess(false);
    cleareOrder();
    this.setState({ modalVisible: false, hideButton: true });
    getListTalonInfo(rnumb_id);
    navigate('recordingItem');
  }

  render() {
    const { t, orderValues } = this.props;
    const { price, room, modalVisible, hideButton, preparation_text, loading } = this.state;

    return (
      <Container contentContainerStyle={styles.mainContainer}>
        <Header backButton={true} text={t('recordings:info_record')} navigation={this.props.navigation} />
        <Content>
          <View style={styles.wrapper}>
            <RecordingItem
              icon={ICON_SERVICE_SMALL}
              title={t('createrecord:form.service')}
              placeholder={t('createrecord:form.select_service')}
              text={orderValues.serv}
            />
            <View style={styles.datetimeWrap}>
              <View style={{ flex: 3 }}>
                <RecordingItem
                  icon={ICON_PRICE_SMALL}
                  title={t('createrecord:price')}
                  placeholder={t('createrecord:form.select_date')}
                  text={`${price} KZT`}
                />
              </View>
              <View style={styles.separator}></View>
              <View style={{ flex: 2 }}>
                <RecordingItem
                  contentContainerStyle={{ paddingRight: 0, paddingLeft: 10 }}
                  icon={ICON_NUMBER_SMALL}
                  title={t('createrecord:room_number')}
                  text={room.toString()}
                  placeholder='300'
                />
              </View>
            </View>
            <RecordingItem
              icon={ICON_DOCTOR_SMALL}
              title={t('createrecord:form.doctor')}
              placeholder={t('createrecord:form.select_doctor')}
              text={orderValues.docdep}
            />
            <View style={styles.datetimeWrap}>
              <View style={{ flex: 2 }}>
                <RecordingItem
                  icon={ICON_CALENDAR_SMALL}
                  title={t('createrecord:form.date')}
                  placeholder={t('createrecord:form.select_date')}
                  text={moment(orderValues.data).format("DD MMMM, YYYY")}
                />
              </View>
              <View style={styles.separator}></View>
              <View style={{ flex: 1 }}>
                <RecordingItem
                  contentContainerStyle={{ paddingRight: 0, paddingLeft: 10 }}
                  icon={ICON_TIME_SMALL}
                  title={t('createrecord:form.time')}
                  placeholder='12:00'
                  text={orderValues.time}
                />
              </View>
            </View>
          </View>
          {
            (preparation_text) && (
              <View style={styles.helpText}>
                <Text>{preparation_text}</Text>
              </View>
            )}
          <Popup
            show={modalVisible}
            firstText={t('recordings:item.success').toUpperCase()}
            laberButton={t('common:actions.ok')}
            actionButton={this._save}
          />
        </Content >
        {(loading) && <ActivityIndicator size="large" color={ACCENT_BLUE} style={{position: 'absolute', top: '75%', zIndex: 20, alignSelf: 'center'}} />}
        {
          (!hideButton) && (
            <View style={styles.buttonWrap}>
              <Text style={styles.textInfo}>{t('recordings:info_warning_text')}</Text>
              <CustomBtn label={t('common:actions.appointment')} onClick={() => this.createOrder()} />
            </View>
          )
        }
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
    orderCreated: state.content.orderCreated,
    orderDeleted: state.content.orderDeleted
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch)
}

export default withNamespaces(['createrecord', 'common'])(connect(mapStateToProps, mapDispatchToProps)(CheckRecordScreen));
