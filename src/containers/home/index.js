import React, {Component} from 'react';
import {StyleSheet, Dimensions, ActivityIndicator, NetInfo, AsyncStorage} from 'react-native';
import {Container, Content, View} from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import * as AuthActions from '../../actions/auth';
import HomeCarousel from '../../components/home/HomeCarousel';
import HomeButton from '../../components/home/HomeButton';
import LinkBtn from '../../components/common/LinkBtn';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';

import variebles from '../../styles/variables';

const Height = Dimensions.get('window').height;
const {blue} = variebles.colors;

class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {user, getUserData, token, t, setAuthMessage, logOut, navigation} = this.props;

    if (!user && token) getUserData().then((resp) => {
      if (Object.keys(resp).length === 0) {
        setAuthMessage(t(`common:actions_text.token_not_valid_text`))
        AsyncStorage.clear();
        logOut();
        navigation.navigate("authorization");
      }
    });
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
      <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
        <Header text={ t('home:title') } navigation = {this.props.navigation} backDisabled={true} />
        <HeaderBottom/>
        <Content style={{marginTop: -60, zIndex: 2}}>
          <View style={{height: Height/3, justifyContent: 'center', alignItems: 'center'}}>
            { sales ? (<HomeCarousel navigate={navigate} data={sales}/>) : <ActivityIndicator size="small" color={blue} /> }
          </View>
          <View style={styles.buttonContainer}>
            <HomeButton keyNumber={0} nameBtn= { [t('home:menu.doc_list_1'), t('home:menu.doc_list_2')] } onClick={() => navigate({routeName: "listDoctors", key: 777})} imageUri={require('../../../assets/img/btn-doc-ic.png')}/>
            <HomeButton keyNumber={1} nameBtn= { [t('home:menu.cat_services_1'), t('home:menu.cat_services_2')] } onClick={() => navigate("specialization")} imageUri={require('../../../assets/img/btn-serv-ic.png')}/>
            <HomeButton keyNumber={2} nameBtn= { [t('home:menu.doc_appointment_1'), t('home:menu.doc_appointment_2')] } onClick={()=> this._openPage("recordingCreate", 'recording')} imageUri={require('../../../assets/img/btn-post-ic.png')}/>
            <HomeButton keyNumber={3} nameBtn= { [t('home:menu.test_results_1'), t('home:menu.test_results_2')] } onClick={()=> this._openPage("analizes", 'analizes')} imageUri={require('../../../assets/img/btn-analize-ic.png')}/>
          </View>
        </Content >
        <LinkBtn label={ t('home:faq_text_link') } onClick={()=>navigate('oftenQuestions')}/>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexWrap:'wrap', 
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 10
  }
});

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
