import React, { Component } from 'react';
import { Container, Content, View, Text } from 'native-base';
import { withNamespaces } from 'react-i18next';
import * as AuthActions from '../../actions/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

import Header from '../../components/common/Header';
import MenuList from '../../components/common/MenuList';
import styles from './styles';

import { ICON_CARD_PATIENT, ICON_ANALIZE, ICON_JOURNAL_POSTS, ICON_SETTINGS, ICON_LOGOUT } from '../../styles/images';

class ProfileScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menuList: [
        {
          text: props.t('patient:title'),
          icon: ICON_CARD_PATIENT,
          value: 'cardPatientScreen'
        },
        {
          text: props.t('analizes:title'),
          icon: ICON_ANALIZE,
          value: 'analizes'
        },
        {
          text: props.t('profile:journal'),
          icon: ICON_JOURNAL_POSTS,
          value: "recordingList"
        },
        {
          text: props.t('menu:settings'),
          icon: ICON_SETTINGS,
          value: 'settings'
        },
        {
          text: props.t('profile:logout'),
          icon: ICON_LOGOUT,
          value: 'LogOut'
        },
      ]
    };
  }

  onPress = (type) => {
    const { navigation } = this.props;

    if (type === 'LogOut') {
      this.props.logOut();
      navigation.navigate('authorization');
    } else {
      navigation.navigate(type);
    }
  }

  componentDidMount() {
    const { token, navigation } = this.props;

    if (token) {
      this.props.getUserData();
    } else {
      navigation.navigate('authorization');
    }
  }

  render() {
    let { t, token, user } = this.props;
    let userPhone= '';

    if (token && user && user.phone) {
      const phoneNumber = parsePhoneNumberFromString(user.phone, 'KZ');
      userPhone = phoneNumber.formatNational();
    }

    return (
      <Container contentContainerStyle={styles.wrapContainer}>
        <Header isHome={true} navigation={this.props.navigation} />
        <Content>
          {(user) && (
            <View style={styles.prifileBlock}>
              {(user.firstname && user.secondname) && (
              <View style={styles.prifileItem}>
                <Text style={styles.titles}>{t('profile:name')}</Text>
                <Text style={styles.text}>{`${user.lastname} ${user.firstname} ${user.secondname}`}</Text>
              </View>)}
              {(user.birth_date) && (
              <View style={styles.prifileItem}>
                <Text style={styles.titles}>{t('profile:birthDate')}</Text>
                <Text style={styles.text}>{moment(user.birth_date).format('DD.MM.YYYY')}</Text>
              </View>)}
              {(user.phone) && (
              <View style={styles.prifileItem}>
                <Text style={styles.titles}>{t('profile:phone')}</Text>
                <Text style={styles.text}>{userPhone}</Text>
              </View>)}
              {(user.address) && (
              <View style={styles.prifileItem}>
                <Text style={styles.titles}>{t('profile:address')}</Text>
                <Text style={styles.text}>{user.address}</Text>
              </View>)}
            </View>
          )}
          <MenuList onPress={(value) => this.onPress(value)} fields={this.state.menuList} valueName={'value'} navigation={this.props.navigation} />
        </Content >
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    token: state.authorization.token,
    user: state.authorization.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...AuthActions }, dispatch)
}

export default withNamespaces(['profile', 'common', 'patient', 'analizes', 'menu'])(connect(mapStateToProps, mapDispatchToProps)(ProfileScreen));