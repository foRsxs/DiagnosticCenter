import React, {Component} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Container, Content, View} from 'native-base';
import i18n from '../../i18n';
import HomeCarousel from '../../components/home/HomeCarousel';
import HomeButton from '../../components/home/HomeButton';
import LinkBtn from '../../components/common/LinkBtn';


class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
          <Content>
            <View>
              <HomeCarousel />
            </View>  
            <View style={styles.buttonContainer}>
              <HomeButton nameBtn= {i18n.t('BtnMainDoctor')} onClick={()=>{Alert.alert('ok')}} imageUri={require('../../../assets/img/btn-doc-ic.png')}/>
              <HomeButton nameBtn= {i18n.t('BtnMainService')} onClick={()=>{Alert.alert('ok')}} imageUri={require('../../../assets/img/btn-serv-ic.png')}/>
              <HomeButton nameBtn= {i18n.t('BtnMainPost')} onClick={()=>{Alert.alert('ok')}} imageUri={require('../../../assets/img/btn-post-ic.png')}/>
              <HomeButton nameBtn= {i18n.t('BtnMainAnalize')} onClick={()=>{Alert.alert('ok')}} imageUri={require('../../../assets/img/btn-analize-ic.png')}/>
            </View>
          </Content >
          <LinkBtn label={i18n.t('BtnLinkCallCenter')} onClick={()=>{Alert.alert('ok')}}/>
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
