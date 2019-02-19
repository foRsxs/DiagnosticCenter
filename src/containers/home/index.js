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
import HomeCarousel from '../../components/home/HomeCarousel';
import Header from '../../components/common/Header';
import MenuList from '../../components/common/MenuList';
import styles from './styles';

import { ACCENT_BLUE, COLOR_LIGHT_GRAY, WHITE } from '../../styles/constants';
import { ICON_CONTACT, ICON_INFO, ICON_VACANCY, ICON_QUESTION } from '../../styles/images';

class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menuList: [
        {
          text: props.t(`home:menu_list.contacts`),
          icon: ICON_CONTACT,
          value: 'contacts'
        },
        {
          text: props.t(`home:menu_list.information`),
          icon: ICON_INFO,
          value: 'information'
        },
        {
          text: props.t(`home:menu_list.vacancy`),
          icon: ICON_VACANCY,
        },
        {
          text: props.t(`home:menu_list.faq`),
          icon: ICON_QUESTION,
          value: 'oftenQuestions'
        },
      ]
    };
  }

  componentDidMount() {
    const { user, getUserData, token, t, setAuthMessage, logOut, navigation } = this.props;

    this.props.getSales();

    if (!user && token) {
      getUserData().then((resp) => {
        if (Object.keys(resp).length === 0) {
          setAuthMessage(t(`common:actions_text.token_not_valid_text`))
          logOut();
          navigation.navigate("authorization");
        }
      });
    }

    SplashScreen.hide();
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

  onPress = (type) => {
    const { navigation } = this.props;
    (type === 'LogOut') ? navigation.navigate('authorization') : navigation.navigate(type);
  }

  render() {
    const { navigate } = this.props.navigation;
    const { t, sales } = this.props;

    return (
      <Container contentContainerStyle={styles.wrapContainer}>
        <Header isHome={true} navigation={this.props.navigation} />
        <Content>
          <LinearGradient colors={[WHITE, COLOR_LIGHT_GRAY]} style={styles.wrapCarousel}>
            {sales ? (<HomeCarousel navigate={navigate} data={sales} />) : <ActivityIndicator size="large" color={ACCENT_BLUE} />}
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
    isGuest: state.authorization.isGuest
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...ContentActions, ...AuthActions }, dispatch);
}

export default withNamespaces('home')(connect(mapStateToProps, mapDispatchToProps)(HomeScreen));
