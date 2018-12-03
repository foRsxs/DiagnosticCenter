import React, {Component} from 'react';
import {StyleSheet, BackHandler, ActivityIndicator, Linking} from 'react-native';
import {Container, Content, View} from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import LinkBtn from '../../components/common/LinkBtn';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';
import SpecializationItem from '../../components/specialization/SpecializationItem';
import Popup from '../../components/common/Popup';
import variebles from '../../styles/variables';
import {APP_IMG_URL} from '../../config';

const {black, blue} = variebles.colors;

class SpecializationScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  change = (value) => {
    this.setState(state => ({modalVisible: false}))
  }

  handleChange = (value) => {
    this.setState({inputValue: value})
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    if (!this.props.list_specialization) this.props.getListSpecialization(1);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    if(this.state.modalVisible){
      this.setState({modalVisible: false})
    } else {
      this.props.navigation.goBack();
    }
    return true;
  }

  call = () => {
    Linking.openURL('tel:+87252367132');

    this.setState({modalVisible: false});
  }

  render() {
    const {modalVisible} = this.state;
    const { t, list_specialization } = this.props;

    return (
      <View>
        <View style={ styles.mainContainer }>
          <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
            <Header text={ t('specialization:title') } navigation = {this.props.navigation}/>
            <HeaderBottom search={true} onChange={this.handleChange}/>
            <Content style={{marginTop: -10, zIndex: 1, paddingTop: 10}} padder>
              {(list_specialization && list_specialization.length)? (
                list_specialization.map((item, index) => (
                  <SpecializationItem 
                    key={index} 
                    onClick={() => this.props.navigation.navigate({routeName:'listDoctors', params: {spec_id: item.spec_id}, key: item.spec_id })} 
                    headTxt={item.spec_name} 
                    imageUri={`${APP_IMG_URL}/icons/${item.spec_id}.png`}
                  />
                ))
              ): <ActivityIndicator size="small" color={blue} /> } 
            </Content >
            <LinkBtn label={ t('specialization:no_doctor_choose_link_text') } onClick={()=> this.setState({modalVisible: true})}/>
            <Popup 
              show={modalVisible}
              firstText={ t('specialization:form.fisrt_text') }
              secondText={ t('specialization:form.last_text') }
              laberButton={ t('common:actions.call') }
              actionButton={this.call}
              labelLink={ t('common:actions.close') }
              actionLink={ ()=> this.setState({modalVisible: false}) }
            />
          </Container>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    opacity: 1,
    height: '100%'
  },
  opacityContainer: {
    opacity: 0.1,
    height: '100%'
  },
  chooseWrap: {
    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)'
  },
  chooseContent: {
    position: 'absolute', bottom: 0, zIndex: 3, backgroundColor: 'white', width: '100%', borderRadius: 5
  },
  chooseText: {
    textAlign: 'center', color: black
  }
});

function mapStateToProps(state) {
  return {
    list_specialization: state.content.ListSpecialization,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch)
}

export default withNamespaces(['faq', 'common'])(connect(mapStateToProps, mapDispatchToProps)(SpecializationScreen));