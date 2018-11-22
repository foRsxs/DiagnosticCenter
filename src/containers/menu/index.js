import React, { Component } from "react";
import {BackHandler, Image} from "react-native";
import {Text, View, Header, Container, Content} from "native-base";
import styles from './styles'
import i18n from '../../i18n';
import MenuItem from '../../components/menu/MenuItem';

class DrawerMenu extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    this.props.navigation.closeDrawer();
    return true;
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
    <Container style={styles.container}>
        <Header style={styles.header}>
          <Image
            style={{width: 20, height: 20, marginRight: 15}}
            resizeMode='contain'
            source={require('../../../assets/img/menu-user-ic.png')}
          />
          <Text style={styles.headerTxt}>Best Man Ever</Text>
        </Header>
        <Content>
          <MenuItem onClick={() => navigate("home")} label={i18n.t('MenuMain')} imageUri={require('../../../assets/img/menu-main-ic.png')}/>
          <MenuItem onClick={() => navigate("listDoctors")} label={i18n.t('MenuDoc')} imageUri={require('../../../assets/img/menu-doc-ic.png')}/>
          <MenuItem onClick={() => navigate("specialization")} label={i18n.t('MenuServ')} imageUri={require('../../../assets/img/menu-serv-ic.png')}/>
          <MenuItem onClick={() => navigate("recordingList")} label={i18n.t('MenuPost')} imageUri={require('../../../assets/img/menu-post-ic.png')}/>
          <MenuItem onClick={() => navigate("analizes")} label={i18n.t('MenuAnalize')} imageUri={require('../../../assets/img/menu-analize-ic.png')}/>
          <MenuItem onClick={() => navigate("history")} label={i18n.t('MenuHistory')} imageUri={require('../../../assets/img/menu-history-ic.png')}/>
          <MenuItem onClick={() => navigate("info")} label={i18n.t('MenuInfo')} imageUri={require('../../../assets/img/menu-info-ic.png')}/>
          <MenuItem onClick={() => navigate("settings")} label={i18n.t('MenuSet')} imageUri={require('../../../assets/img/menu-set-ic.png')}/>
          <MenuItem onClick={() => navigate("contacts")} label={i18n.t('MenuCont')} imageUri={require('../../../assets/img/menu-cont-ic.png')}/>
        </Content>
        <MenuItem onClick={() => navigate("authorization")} label={i18n.t('MenuExit')} imageUri={require('../../../assets/img/menu-exit-ic.png')}/>
    </Container>
    );
  }
}

export default DrawerMenu