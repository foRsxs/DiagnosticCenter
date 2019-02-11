import React, {Component} from 'react';
import {StyleSheet, ActivityIndicator, NetInfo, AsyncStorage} from 'react-native';
import {Container, Content} from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import * as ContentActions from '../../actions/content';
import * as AuthActions from '../../actions/auth';
import HomeCarousel from '../../components/home/HomeCarousel';
// import HomeButton from '../../components/home/HomeButton';
// import LinkBtn from '../../components/common/LinkBtn';
import Header from '../../components/common/Header';
import FooterTabs from '../../components/common/FooterTabs';
import MenuList from '../../components/common/MenuList';
import styles from './styles';

import { ACCENT_BLUE, COLOR_LIGHT_GRAY, WHITE } from '../../styles/constants';
import { ICON_CONTACT, ICON_INFO, ICON_VACANCY, ICON_QUESTION } from '../../styles/images';

class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  menuList = [
    {
      text: 'Контакты',
      icon: ICON_CONTACT,
      link: 'contacts'
    },
    {
      text: 'Информация',
      icon: ICON_INFO,
      link: 'information'
    },
    {
      text: 'Вакансии',
      icon: ICON_VACANCY,
    },
    {
      text: 'Частые вопросы',
      icon: ICON_QUESTION,
      link: 'oftenQuestions'
    },
  ]

  componentDidMount() {
    const {user, getUserData, token, t, setAuthMessage, logOut, navigation} = this.props;  
    
    if (!user && token) {
      getUserData().then((resp) => {
        if (Object.keys(resp).length === 0) {
          setAuthMessage(t(`common:actions_text.token_not_valid_text`))
          AsyncStorage.clear();
          logOut();
          navigation.navigate("authorization");
        }
      });
    }
    
    SplashScreen.hide();
    NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionChange);
  }

  _handleConnectionChange = (isConnected) => {
    this.props.changeNetworkConnection(isConnected);
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
    const { t, sales } = this.props;
    
    return (
      <Container contentContainerStyle={styles.wrapContainer}>
        <Header isHome={true} />
        <Content>
          <LinearGradient colors={[WHITE, COLOR_LIGHT_GRAY]} style={styles.wrapCarousel}>
            { sales ? (<HomeCarousel navigate={navigate} data={sales}/>) : <ActivityIndicator size="large" color={ACCENT_BLUE} /> }
          </LinearGradient>
          {/* <View>
            <HomeButton keyNumber={0} nameBtn= { [t('home:menu.doc_list_1'), t('home:menu.doc_list_2')] } onClick={() => navigate({routeName: "listDoctors", key: 777})} imageUri={require('../../../assets/img/btn-doc-ic.png')}/>
            <HomeButton keyNumber={1} nameBtn= { [t('home:menu.cat_services_1'), t('home:menu.cat_services_2')] } onClick={() => navigate("specialization")} imageUri={require('../../../assets/img/btn-serv-ic.png')}/>
            <HomeButton keyNumber={2} nameBtn= { [t('home:menu.doc_appointment_1'), t('home:menu.doc_appointment_2')] } onClick={()=> this._openPage("recordingCreate", 'recording')} imageUri={require('../../../assets/img/btn-post-ic.png')}/>
            <HomeButton keyNumber={3} nameBtn= { [t('home:menu.test_results_1'), t('home:menu.test_results_2')] } onClick={()=> this._openPage("analizes", 'analizes')} imageUri={require('../../../assets/img/btn-analize-ic.png')}/>
          </View> */}
          <MenuList fields={this.menuList} navigation={this.props.navigation} />
        </Content >
        <FooterTabs />
        {/* <LinkBtn label={ t('home:faq_text_link') } onClick={()=>navigate('oftenQuestions')}/> */}
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
  return bindActionCreators({...ContentActions, ...AuthActions}, dispatch);
}

export default withNamespaces('home')(connect(mapStateToProps, mapDispatchToProps)(HomeScreen));
