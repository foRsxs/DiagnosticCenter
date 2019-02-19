import React, {Component} from 'react';
import {Container, Content, View, Text} from 'native-base';
import { withNamespaces } from 'react-i18next';
import * as AuthActions from '../../actions/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
          text: 'Карта пациента',
          icon: ICON_CARD_PATIENT,
          value: 'cardPatientDetailScreen'
        },
        {
          text: 'Результаты анализов',
          icon: ICON_ANALIZE,
          value: 'analizes'
        },
        {
          text: 'Журнал записей на приём',
          icon: ICON_JOURNAL_POSTS,
          value: "recordingList"
        },
        {
          text: 'Настройки',
          icon: ICON_SETTINGS,
          value: 'settings'
        },
        {
          text: 'Выход из учётной записи',
          icon: ICON_LOGOUT,
          value: 'LogOut'
        },
      ]
    };
  }

  onPress = (type) => {
    const {navigation} = this.props;
    
    if (type === 'LogOut') {
      this.props.logOut();
      navigation.navigate('authorization');
    } else {
      navigation.navigate(type); 
    } 
  }

  componentDidMount() {
    const { navigate } = this.props.navigation;
    let { user, getUserData } = this.props; 

    if (user && user.api_token) {
      getUserData();
    } else {
      navigate('authorization');
    }
	}

  render() {
    let { t, user } = this.props;
    
    return (
      <Container contentContainerStyle={styles.wrapContainer}>
        <Header isHome={true} navigation={this.props.navigation}/>
        <Content>
          <View style={styles.prifileBlock}>
            <View style={styles.prifileItem}>
              <Text style={styles.titles}>{t('profile:name')}</Text>
              <Text style={styles.text}>{user.lastname} {user.firstname} {user.secondname}</Text>
            </View>
            <View style={styles.prifileItem}>
              <Text style={styles.titles}>{t('profile:birthDate')}</Text>
              <Text style={styles.text}>-</Text>
            </View>
            <View style={styles.prifileItem}>
              <Text style={styles.titles}>{t('profile:phone')}</Text>
              <Text style={styles.text}>{user.phone}</Text>
            </View>
            <View style={styles.prifileItem}>
              <Text style={styles.titles}>{t('profile:address')}</Text>
              <Text style={styles.text}>-</Text>
            </View>
          </View>
          <MenuList onPress={(value)=>this.onPress(value)} fields={this.state.menuList} valueName={'value'} navigation={this.props.navigation} />
        </Content >
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.authorization.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...AuthActions }, dispatch)
}

export default withNamespaces(['profile', 'common'])(connect(mapStateToProps, mapDispatchToProps)(ProfileScreen));