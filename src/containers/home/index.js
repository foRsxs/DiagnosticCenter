import React, {Component} from 'react';
import { View, Alert, StyleSheet, ScrollView } from 'react-native';
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
      <ScrollView>
        <View>
          <HomeCarousel />
        </View>  
        <View style={styles.buttonContainer}>
          <HomeButton nameBtn= {i18n.t('BtnMainDoctor')} onClick={()=>{Alert.alert('ok')}} imageUri={require('../../../assets/img/btn-doc-ic.png')}/>
          <HomeButton nameBtn= {i18n.t('BtnMainService')} onClick={()=>{Alert.alert('ok')}} imageUri={require('../../../assets/img/btn-serv-ic.png')}/>
          <HomeButton nameBtn= {i18n.t('BtnMainPost')} onClick={()=>{Alert.alert('ok')}} imageUri={require('../../../assets/img/btn-post-ic.png')}/>
          <HomeButton nameBtn= {i18n.t('BtnMainAnalize')} onClick={()=>{Alert.alert('ok')}} imageUri={require('../../../assets/img/btn-analize-ic.png')}/>
        </View>
        <LinkBtn label={i18n.t('BtnLinkCallCenter')} onClick={()=>{Alert.alert('ok')}}/>
      </ScrollView>
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
