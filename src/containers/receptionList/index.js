import React, {Component} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Container, Content, View, Text} from 'native-base';
import i18n from '../../i18n';
import CustomBtn from '../../components/common/CustomBtn'
import variables from '../../styles/variables'
import ReceptionListItem from '../../components/receptionList/ReceptionListItem'
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';

class ReceptionListScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
          <Header text="ЖУРНАЛ ЗАПИСЕЙ" navigation = {this.props.navigation}/>
          <HeaderBottom text="у вас 3 записи" />
          <Content style={{marginTop: -10, zIndex: 1, paddingTop: 10}} padder>
            <ReceptionListItem headTxt='Специалист МРТ' servTxt='(МРТ малого таза)' timeTxt='11 сентября, в 14:00' nameTxt='Нурумбетова Жасмин, каб. 24'/>
            <ReceptionListItem headTxt='Специалист МРТ' servTxt='(МРТ малого таза)' timeTxt='11 сентября, в 14:00' nameTxt='Нурумбетова Жасмин, каб. 24'/>
            <ReceptionListItem headTxt='Специалист МРТ' servTxt='(МРТ малого таза)' timeTxt='11 сентября, в 14:00' nameTxt='Нурумбетова Жасмин, каб. 24'/>
          </Content >
          <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
            <CustomBtn label='ДОБАВИТЬ ЗАПИСЬ' onClick={()=> navigate('receptions')}/>
          </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({

});

export default ReceptionListScreen;
