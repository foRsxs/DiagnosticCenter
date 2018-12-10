import React, {Component} from "react";
import {BackHandler, Image, AsyncStorage} from "react-native";
import {Text, View, Container, Content} from "native-base";
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AuthActions from '../../actions/auth';
import * as ContentActions from '../../actions/content';
import styles from './styles'
import MenuItem from '../../components/menu/MenuItem';

class DrawerMenu extends Component {
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

  _openPage = (page, text_error) => {
    const {t, isGuest, navigation} = this.props;
    
    if (isGuest) {
      this.props.setAuthMessage(t(`common:actions_text.${text_error}_text`));
      navigation.navigate('authorization');
    } else { 
      navigation.navigate(page);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { t, user, logOut, isGuest } = this.props;

    return (
      <Container style={styles.container}>   
        <View style={styles.header}>
          <Image
            style={{width: 20, height: 20, marginRight: 15}}
            resizeMode='contain'
            source={require('../../../assets/img/menu-user-ic.png')}
          />
          <Text style={styles.headerTxt}>{(isGuest)? t('menu:guest') : (user.api_token) ?`${user.lastname} ${user.firstname} ${user.secondname}`: ''}</Text>
        </View>
        <Content>
          <MenuItem 
            onClick={() => navigate("home")} 
            label={ t('menu:home') } 
            imageUri={require('../../../assets/img/menu-main-ic.png')} 
          />
          <MenuItem 
            onClick={() => navigate({routeName: "listDoctors", key: 777})} 
            label={ t('menu:doctors') } 
            imageUri={require('../../../assets/img/menu-doc-ic.png')}
          />
          <MenuItem 
            onClick={() => navigate("specialization")} 
            label={ t('menu:services') } 
            imageUri={require('../../../assets/img/menu-serv-ic.png')}
          />
          <MenuItem 
            onClick={() => this._openPage("recordingList", 'recording')} 
            label={ t('menu:records') } 
            imageUri={require('../../../assets/img/menu-post-ic.png')}
          />
          <MenuItem 
            onClick={() => this._openPage("analizes", 'analizes')} 
            label={ t('menu:analyzes') } 
            imageUri={require('../../../assets/img/menu-analize-ic.png')}
          />
          <MenuItem 
            onClick={() => this._openPage("history", 'history')}
            label={ t('menu:history') } 
            imageUri={require('../../../assets/img/menu-history-ic.png')}
          />
          <MenuItem 
            onClick={() => navigate("information")} 
            label={ t('menu:information') }
            imageUri={require('../../../assets/img/menu-info-ic.png')}
          />
          <MenuItem 
            onClick={() => navigate("settings")} 
            label={ t('menu:settings') } 
            imageUri={require('../../../assets/img/menu-set-ic.png')}
          />
          <MenuItem 
            onClick={() => navigate("contacts")} 
            label={ t('menu:contacts') } 
            imageUri={require('../../../assets/img/menu-cont-ic.png')}
          />
        </Content>
        <MenuItem 
          onClick={() => { 
            AsyncStorage.clear();
            logOut();
            navigate("authorization");
          }} 
          label={ t('menu:logout') } 
          imageUri={require('../../../assets/img/menu-exit-ic.png')}
        />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.authorization.user,
    isGuest: state.authorization.isGuest
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...AuthActions, ...ContentActions}, dispatch)
}

export default withNamespaces(['menu', 'common'])(connect(mapStateToProps, mapDispatchToProps)(DrawerMenu));