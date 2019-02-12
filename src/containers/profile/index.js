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
    this.state = {};
  }

  menuList = [
    {
      text: 'Карта пациента',
      icon: ICON_CARD_PATIENT,
      link: 'contacts'
    },
    {
      text: 'Результаты анализов',
      icon: ICON_ANALIZE,
      link: 'information'
    },
    {
      text: 'Журнал записей на приём',
      icon: ICON_JOURNAL_POSTS,
    },
    {
      text: 'Настройки',
      icon: ICON_SETTINGS,
      link: 'oftenQuestions'
    },
    {
      text: 'Выход из учётной записи',
      icon: ICON_LOGOUT,
      link: 'oftenQuestions'
    },
  ]

  render() {
    
    return (
      <Container contentContainerStyle={styles.wrapContainer}>
        <Header isHome={true} />
        <Content>
          <View>
            <Text>Profile</Text>
          </View>
          <MenuList fields={this.menuList} navigation={this.props.navigation} />
        </Content >
      </Container>
    )
  }
}

export default withNamespaces('home')(ProfileScreen);
