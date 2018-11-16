import React, {Component} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Container, Content, View} from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import i18n from '../../i18n';
import HomeCarousel from '../../components/home/HomeCarousel';
import HomeButton from '../../components/home/HomeButton';
import LinkBtn from '../../components/common/LinkBtn';
import Header from '../../components/common/Header';

class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
        <Header text="НАШИ АКЦИИ" navigation = {this.props.navigation} backDisabled={true} inversion={true}/>
        <Content style={{marginTop: -10, zIndex: 1}}>
          <View>
            <HomeCarousel />
          </View>  
          <View style={styles.buttonContainer}>
            <HomeButton nameBtn= {i18n.t('BtnMainDoctor')} onClick={() => navigate("listDoctors")} imageUri={require('../../../assets/img/btn-doc-ic.png')}/>
            <HomeButton nameBtn= {i18n.t('BtnMainService')} onClick={() => navigate("specialization")} imageUri={require('../../../assets/img/btn-serv-ic.png')}/>
            <HomeButton nameBtn= {i18n.t('BtnMainPost')} onClick={()=> navigate("receptionList")} imageUri={require('../../../assets/img/btn-post-ic.png')}/>
            <HomeButton nameBtn= {i18n.t('BtnMainAnalize')} onClick={()=> navigate("analizes")} imageUri={require('../../../assets/img/btn-analize-ic.png')}/>
          </View>
        </Content >
        <LinkBtn label={i18n.t('BtnLinkCallCenter')} onClick={()=>Alert.alert('click')}/>
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

export default HomeScreen;
