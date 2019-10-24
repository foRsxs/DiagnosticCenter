import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { Container, Content } from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import * as ContentActions from '../../actions/content';
import * as AuthActions from '../../actions/auth';
import HomeCarousel from '../../components/HomeCarousel';
import Header from '../../components/common/Header';
import MenuList from '../../components/common/MenuList';
import styles from './styles';

import { ACCENT_BLUE, COLOR_LIGHT_GRAY, WHITE } from '../../styles/constants';
import { ICON_CONTACT, ICON_INFO, ICON_VACANCY, ICON_QUESTION, ICON_SCAN_QRCODE } from '../../styles/images';

class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menuList: []
    };
  }

  componentDidMount() {
    const { t } = this.props;
    this._renderMenuList(t);
    this.props.getSales();
    SplashScreen.hide();
  }

  componentDidUpdate(prevProps) {
    const { t, languages_key } = this.props;
    
    if (prevProps.languages_key !== languages_key) {
      this._renderMenuList(t);
    }
  }

  _openPage = (page, text_error) => {
    const { t, isGuest, navigation } = this.props;

    if (isGuest) {
      this.props.setAuthMessage(t(`common:actions_text.${text_error}_text`));
      navigation.navigate('authorization');
    } else {
      navigation.navigate(page);
    }
  }
  
  _renderMenuList = (t) => {
    this.setState({
      menuList: [
        {
          text: t(`home:menu_list.contacts`),
          icon: ICON_CONTACT,
          value: 'contacts'
        },
        {
          text: t(`home:menu_list.information`),
          icon: ICON_INFO,
          value: 'information'
        },
        {
          text: t(`home:menu_list.vacancy`),
          icon: ICON_VACANCY,
          value: 'vacantion'
        },
        {
          text: t(`home:menu_list.faq`),
          icon: ICON_QUESTION,
          value: 'oftenQuestions'
        },
        {
          text: t(`home:menu_list.qrcode`),
          icon: ICON_SCAN_QRCODE,
          value: 'scanCode'
        },
      ]
    })
  }

  onPress = (type) => {
    const { navigation } = this.props;
    (type === 'LogOut') ? navigation.navigate('authorization') : navigation.navigate(type);
  }

  render() {
    const { navigate } = this.props.navigation;
    const { isRequest, sales, callcenterTel } = this.props;

    return (
      <Container contentContainerStyle={styles.wrapContainer}>
        <Header isHome={true} navigation={this.props.navigation} callCenterTel={callcenterTel ? callcenterTel.value : callcenterTel }/>
        <Content>
          <LinearGradient colors={[WHITE, COLOR_LIGHT_GRAY]} style={styles.wrapCarousel}>
            {(isRequest) ? (<ActivityIndicator size="large" color={ACCENT_BLUE} />) : (<HomeCarousel navigate={navigate} data={sales} />)}
          </LinearGradient>
          <MenuList onPress={(value) => this.onPress(value)} valueName={'value'} fields={this.state.menuList} navigation={this.props.navigation} />
        </Content >
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    sales: state.content.sales,
    profile: state.authorization.user,
    token: state.authorization.token,
    isGuest: state.authorization.isGuest,
    languages_key: state.authorization.language,
    isRequest: state.content.isRequest,
    callcenterTel: state.content.appParamsConfig ? state.content.appParamsConfig.find((item) => item.name == 'callcenter') : null,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...ContentActions, ...AuthActions }, dispatch);
}

export default withNamespaces(['home', 'common'])(connect(mapStateToProps, mapDispatchToProps)(HomeScreen));
