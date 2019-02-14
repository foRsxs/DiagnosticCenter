import React, {Component} from 'react';
import {Container, Content, View, Text} from 'native-base';
import { withNamespaces } from 'react-i18next';

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
          value: 'contacts'
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
    (type === 'LogOut') ? navigation.navigate('authorization') : navigation.navigate(type); 
  } 

  render() {
    let { t } = this.props;
    
    return (
      <Container contentContainerStyle={styles.wrapContainer}>
        <Header isHome={true} navigation={this.props.navigation}/>
        <Content>
          <View style={styles.prifileBlock}>
            <View style={styles.prifileItem}>
              <Text style={styles.titles}>{t('profile:name')}</Text>
              <Text style={styles.text}>Иванов Иван Иванович</Text>
            </View>
            <View style={styles.prifileItem}>
              <Text style={styles.titles}>{t('profile:birthDate')}</Text>
              <Text style={styles.text}>15.09.1975</Text>
            </View>
            <View style={styles.prifileItem}>
              <Text style={styles.titles}>{t('profile:phone')}</Text>
              <Text style={styles.text}>8 (777) 333-22-11</Text>
            </View>
            <View style={styles.prifileItem}>
              <Text style={styles.titles}>{t('profile:address')}</Text>
              <Text style={styles.text}>г. Шымкент, пр. Кунаева, 22</Text>
            </View>
          </View>
          <MenuList onPress={(value)=>this.onPress(value)} fields={this.state.menuList} valueName={'value'} navigation={this.props.navigation} />
        </Content >
      </Container>
    )
  }
}

export default withNamespaces('profile')(ProfileScreen);
