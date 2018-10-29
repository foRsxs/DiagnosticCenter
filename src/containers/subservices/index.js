import React, {Component} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Container, Content, View} from 'native-base';
import i18n from '../../i18n';
import SubServiceItem from '../../components/subservices/SubServiceItem';
import CustomBtn from '../../components/common/CustomBtn'


class SubServicesScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
          <Content padder>
            <SubServiceItem headTxt='Вакцинация'/>
            <SubServiceItem headTxt='Вакцинация'/>
          </Content >
          <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
            <CustomBtn label='ВЫБРАТЬ ВРАЧА' onClick={()=>{Alert.alert('ok')}}/>
          </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
});

export default SubServicesScreen;