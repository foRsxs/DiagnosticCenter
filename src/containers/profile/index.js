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
      menuList: []
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
    const { t, token, navigation } = this.props;
    this._renderMenuList(t);

    if (token) {
      this.props.getUserData();
    } else {
      navigation.navigate('authorization');
    }
  }

  componentDidUpdate(prevProps) {
    const { t, languages_key } = this.props;
    
    if (prevProps.languages_key !== languages_key) {
      this._renderMenuList(t);
    }
  }

  Capitalize(str) {
    if (!str) return;

    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  _renderMenuList = (t) => {
    this.setState({
      menuList: [
        {
          text: t('patient:title'),
          icon: ICON_CARD_PATIENT,
          value: 'cardPatientScreen'
        },
        {
          text: t('analizes:title'),
          icon: ICON_ANALIZE,
          value: 'analizes'
        },
        {
          text: t('profile:journal'),
          icon: ICON_JOURNAL_POSTS,
          value: "recordingList"
        },
        {
          text: t('menu:settings'),
          icon: ICON_SETTINGS,
          value: 'settings'
        },
        {
          text: t('profile:logout'),
          icon: ICON_LOGOUT,
          value: 'LogOut'
        },
      ]
    });
  }

  render() {
    let { t, token, user, appParamsConfig } = this.props;
    let userPhone= '';

    if (token && user && user.phone) {
      const phoneNumber = parsePhoneNumberFromString(user.phone, 'KZ');
      userPhone = phoneNumber.formatNational();
    }

    return (
      <Container contentContainerStyle={styles.wrapContainer}>
        <Header isHome={true} navigation={this.props.navigation} callCenterTel={(appParamsConfig && appParamsConfig.callcenter) ? appParamsConfig.callcenter : '' } />
        <Content>
          {(user) && (
            <View style={styles.profileBlock}>
              {(user.firstname || user.secondname || user.lastname) && (
              <View style={styles.profileItem}>
                <Text style={styles.titles}>{t('profile:name')}</Text>
                <Text style={styles.text}>{`${this.Capitalize(user.lastname)} ${this.Capitalize(user.firstname)} ${this.Capitalize(user.secondname)}`}</Text>
              </View>)}
              {(user.birth_date) && (
              <View style={styles.profileItem}>
                <Text style={styles.titles}>{t('profile:birthDate')}</Text>
                <Text style={styles.text}>{moment(user.birth_date).format('DD.MM.YYYY')}</Text>
              </View>)}
              {(user.phone) && (
              <View style={styles.profileItem}>
                <Text style={styles.titles}>{t('profile:phone')}</Text>
                <Text style={styles.text}>{userPhone}</Text>
              </View>)}
              {(user.address) && (
              <View style={styles.profileItem}>
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
    user: state.authorization.user,
    languages_key: state.authorization.language,
    appParamsConfig: state.deviceInfo.appParamsConfig,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...AuthActions }, dispatch)
}

export default withNamespaces(['profile', 'common', 'patient', 'analizes', 'menu'])(connect(mapStateToProps, mapDispatchToProps)(ProfileScreen));