import React, { Component } from 'react';
import { StyleSheet, BackHandler, ActivityIndicator, View} from 'react-native';
import { Container, Content, Text } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import * as ContentActions from '../../actions/content';
import CatalogItem from '../../components/catalog/CatalogItem';
import Header from '../../components/common/Header';
//import HeaderBottom from '../../components/common/HeaderBottom';
import {APP_IMG_URL} from '../../config';

import variables from '../../styles/variables';
const { medium } = variables.fSize;

import { ACCENT_BLUE, MAIN_FONT } from '../../styles/constants';

class DoctorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spec_id: (props.navigation.state.params) ? props.navigation.state.params.spec_id : null,
      loading: true,
      sorted_list_Doctors: props.list_Doctors,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.props.getListDoctors();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.list_Doctors !== this.props.list_Doctors) {
      this.setState({
        loading: false, 
        sorted_list_Doctors: this.props.list_Doctors
      });
    }
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
    return true;
  }

  render() {
    let { listview, loading, sorted_list_Doctors } = this.state;
    const { t, recording = false } = this.props;
    const { navigate } = this.props.navigation;

    console.log('list', sorted_list_Doctors);

    return (
      <Container>
        <Header backButton={true} text={'Выберите врача'} navigation = {this.props.navigation} /> 
        <KeyboardAwareScrollView style={{marginTop: -10, zIndex: 1, paddingTop: 10}}>
          {(loading) && <ActivityIndicator size="large" color={ACCENT_BLUE} /> }
          {
            (!loading) && (
              (sorted_list_Doctors.length)? (
                sorted_list_Doctors.map((item, index)=>(
                  <CatalogItem 
                    key={index}  
                    onClick={() => navigate('recordingCreate',{docid: +item.docid, spec_id: item.specid, docdep_id: item.docdep})} 
                    imageUri={{uri: `${APP_IMG_URL}photo_doc/${item.docid}.jpg`}} 
                    name={`${item.lastname} ${item.firstname} ${item.secondname}`}
                    position={item.speciality}
                    info={item.description_short}
                  />
                ))
              ) : <Text style={{textAlign: 'center', fontSize: medium, fontFamily: MAIN_FONT}}>{ t('listdoctors:no_doctors_text') }</Text>
            )
          }
          <View style={{width: '100%', height: 10}}></View>
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    list_Doctors: state.content.listDoctors,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch)
}

export default withNamespaces('listdoctors')(connect(mapStateToProps, mapDispatchToProps)(DoctorList));