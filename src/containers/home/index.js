import React, {Component} from 'react';
import {Alert, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import {Container, Content, View} from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import i18n from '../../i18n';
import * as ContentActions from '../../actions/content';
import * as AuthActions from '../../actions/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
    const {user, getSales, getUserData} = this.props;
    getSales();
    if (!user) getUserData()
    SplashScreen.hide();
  }

  render() {
    const { navigate } = this.props.navigation;
    const {sales} = this.props;

    return (
      <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
        <Header text="НАШИ АКЦИИ" navigation = {this.props.navigation} backDisabled={true} />
        <HeaderBottom/>
        <Content style={{marginTop: -60, zIndex: 2}}>
          <View style={{height: Height/3, justifyContent: 'center', alignItems: 'center'}}>
            {sales ?(<HomeCarousel navigate={navigate} data={sales}/>): <ActivityIndicator size="small" color={blue} /> }
          </View>
          <View style={styles.buttonContainer}>
            <HomeButton keyNumber={0} nameBtn= {i18n.t('BtnMainDoctor')} onClick={() => navigate({routeName: "listDoctors", key: 7777})} imageUri={require('../../../assets/img/btn-doc-ic.png')}/>
            <HomeButton keyNumber={1} nameBtn= {i18n.t('BtnMainService')} onClick={() => navigate("specialization")} imageUri={require('../../../assets/img/btn-serv-ic.png')}/>
            <HomeButton keyNumber={2} nameBtn= {i18n.t('BtnMainPost')} onClick={()=> navigate("recordingCreate")} imageUri={require('../../../assets/img/btn-post-ic.png')}/>
            <HomeButton keyNumber={3} nameBtn= {i18n.t('BtnMainAnalize')} onClick={()=> navigate("analizes")} imageUri={require('../../../assets/img/btn-analize-ic.png')}/>
          </View>
        </Content >
        <LinkBtn label={i18n.t('BtnLinkCallCenter')} onClick={()=>navigate('oftenQuestions')}/>
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
    profile: state.authorization.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...ContentActions, ...AuthActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
