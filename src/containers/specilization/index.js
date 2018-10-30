import React, {Component} from 'react';
import {Alert, StyleSheet, Modal, TouchableOpacity, Dimensions} from 'react-native';
import {Container, Content, View, Text} from 'native-base';
import i18n from '../../i18n';
import LinkBtn from '../../components/common/LinkBtn';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';
import SpecilizationItem from '../../components/specilization/SpecilizationItem';
import Popup from '../../components/common/Popup';

let {width, height} = Dimensions.get('window')

class SpecilizationScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentDidMount() {}

  render() {
    return (
      <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
          <Header text="СПЕЦИАЛИЗАЦИЯ" navigation = {this.props.navigation}/>
          <HeaderBottom search={true} />
          <Content padder>
            <SpecilizationItem onClick={() => navigate("authorization")} headTxt={i18n.t('SpecHeadTerapevt')} subTxt={i18n.t('SpecSubTerapevt')} imageUri={require('../../../assets/img/spec-terapevt.png')}/>
            <SpecilizationItem onClick={() => navigate("authorization")} headTxt={i18n.t('SpecHeadPediatr')} subTxt={i18n.t('SpecSubPediatr')} imageUri={require('../../../assets/img/spec-pediatr.png')}/>
            <SpecilizationItem onClick={() => navigate("authorization")} headTxt={i18n.t('SpecHeadDentist')} subTxt={i18n.t('SpecSubDentist')} imageUri={require('../../../assets/img/spec-dentist.png')}/>
            <SpecilizationItem onClick={() => navigate("authorization")} headTxt={i18n.t('SpecHeadDermatolog')} subTxt={i18n.t('SpecSubDermatolog')} imageUri={require('../../../assets/img/spec-derm.png')}/>
            <SpecilizationItem onClick={() => navigate("authorization")} headTxt={i18n.t('SpecHeadKardiolog')} subTxt={i18n.t('SpecSubKardiolog')} imageUri={require('../../../assets/img/spec-kardi.png')}/>
            <SpecilizationItem onClick={() => navigate("authorization")} headTxt={i18n.t('SpecHeadUrolog')} subTxt={i18n.t('SpecSubUrolog')} imageUri={require('../../../assets/img/spec-urolog.png')}/>
            <SpecilizationItem onClick={() => navigate("authorization")} headTxt={i18n.t('SpecHeadGynekolog')} subTxt={i18n.t('SpecSubGynekolog')} imageUri={require('../../../assets/img/spec-ginec.png')}/>
            <SpecilizationItem onClick={() => navigate("authorization")} headTxt={i18n.t('SpecHeadUrolog')} subTxt={i18n.t('SpecSubUrolog')} imageUri={require('../../../assets/img/spec-urolog.png')}/>
            <SpecilizationItem onClick={() => navigate("authorization")} headTxt={i18n.t('SpecHeadGynekolog')} subTxt={i18n.t('SpecSubGynekolog')} imageUri={require('../../../assets/img/spec-ginec.png')}/>
          </Content >
          <LinkBtn label={i18n.t('BtnLinkDontKnowDoc')} onClick={()=> {this.setModalVisible(true)}}/>
          <Popup show={this.state.modalVisible}/>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
});

export default SpecilizationScreen;
