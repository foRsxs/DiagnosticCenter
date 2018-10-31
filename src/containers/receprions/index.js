import React, {Component} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Container, Content, View, Text} from 'native-base';
import i18n from '../../i18n';
import variables from '../../styles/variables'
import ReceptionsItem from '../../components/receptions/ReceptionsItem'
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';
import CustomBtn from '../../components/common/CustomBtn';

class ReceptionsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
          <Header text="ЗАПИСЬ НА ПРИЁМ" navigation = {this.props.navigation}/>
          <HeaderBottom text="выберите услугу" />
          <Content padder style={{marginTop: -10, zIndex: 1, paddingTop: 10}}>
            <ReceptionsItem headTxt='Первичный приём' dateTxt='(консультация)'/>
            <ReceptionsItem headTxt='Первичный приём' dateTxt='(консультация)'/>
          </Content >
          <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
            <CustomBtn label='ВЫБРАТЬ ДАТУ' onClick={()=> navigate("calendarDate")}/>
          </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
});

export default ReceptionsScreen;
