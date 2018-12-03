import React, {Component} from 'react';
import {Alert, StyleSheet, BackHandler} from 'react-native';
import {Container, Content, View, Text} from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CustomBtn from '../../components/common/CustomBtn'
import variables from '../../styles/variables';
import ReceptionListItem from '../../components/receptions/ReceptionListItem'
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';

class ReceptionListScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }

  render() {
    const { navigate } = this.props.navigation;
    const { t } = this.props;
    const total = '5';

    return (
      <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
        <Header text={ t('recordings:title') } navigation = {this.props.navigation}/>
        <HeaderBottom text={ t('recordings:total_text') + `- ${total}` } />
        <Content style={{marginTop: -10, zIndex: 1, paddingTop: 10}} padder>
          <ReceptionListItem headTxt='Специалист МРТ' servTxt='(МРТ малого таза)' timeTxt='11 сентября, в 14:00' nameTxt='Нурумбетова Жасмин, каб. 24' onPress={()=> navigate('recordingItem', {reserved: true})}/>
          <ReceptionListItem headTxt='Специалист МРТ' servTxt='(МРТ малого таза)' timeTxt='11 сентября, в 14:00' nameTxt='Нурумбетова Жасмин, каб. 24' onPress={()=> navigate('recordingItem', {reserved: true})}/>
          <ReceptionListItem headTxt='Специалист МРТ' servTxt='(МРТ малого таза)' timeTxt='11 сентября, в 14:00' nameTxt='Нурумбетова Жасмин, каб. 24' onPress={()=> navigate('recordingItem', {reserved: true})}/>
        </Content >
        <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
          <CustomBtn label={ t('common:actions.add_recording') } onClick={()=> navigate('receptions')}/>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({

});

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch);
}

export default withNamespaces(['recordings', 'common'])(connect(mapStateToProps, mapDispatchToProps)(ReceptionListScreen));