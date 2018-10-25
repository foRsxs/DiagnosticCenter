import React, {Component} from 'react';
import { View, Alert } from 'react-native';
import {Text, Button} from 'native-base';
import styles from './styles';
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
      <View>
        <View>
          <HomeCarousel />
        </View>  
        <View style={{flexWrap:'wrap', width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20}}>
          <HomeButton nameBtn= {i18n.t('BtnMainDoctor')} onClick={()=>{Alert.alert('ok')}}/>
          <HomeButton nameBtn= {i18n.t('BtnMainService')} onClick={()=>{Alert.alert('ok')}}/>
          <HomeButton nameBtn= {i18n.t('BtnMainPost')} onClick={()=>{Alert.alert('ok')}}/>
          <HomeButton nameBtn= {i18n.t('BtnMainAnalize')} onClick={()=>{Alert.alert('ok')}}/>
        </View>
        <LinkBtn label='звонок в call-центр' onClick={()=>{Alert.alert('ok')}}/>
      </View>
    )
  }
}


export default HomeScreen;
