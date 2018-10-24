import React, {Component} from 'react';
import { View, Alert } from 'react-native';
import {Text, Button} from 'native-base';
import styles from './styles';
import HomeCarousel from '../../components/HomeCarousel';
import HomeButton from '../../components/HomeButton';
import i18n from '../../i18n';

class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <HomeCarousel />
        </View>  
        <View style={{flex: 2, flexWrap:'wrap', width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20}}>
          <HomeButton nameBtn= {i18n.t('BtnMainDoctor')} />
          <HomeButton nameBtn= {i18n.t('BtnMainService')} />
          <HomeButton nameBtn= {i18n.t('BtnMainPost')} />
          <HomeButton nameBtn= {i18n.t('BtnMainAnalize')} />
        </View>
      </View>
    )
  }
}


export default HomeScreen;
