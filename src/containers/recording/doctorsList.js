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
    console.log(props)
    this.state = {
      spec_id: (props.navigation.state.params) ? props.navigation.state.params.spec_id : null,
      isOrder: (props.navigation.state.params && props.navigation.state.params.isOrder) ? props.navigation.state.params.isOrder : false,
      loading: (props.orderDatas.services) ? false : true,
    };
  }

  componentDidMount() {

    //this.props.getListDoctors();
  }

  componentDidUpdate(prevProps) {
    // if (prevProps.list_Doctors !== this.props.list_Doctors) {
    //   this.setState({
    //     loading: false, 
    //     sorted_list_Doctors: this.props.list_Doctors
    //   });
    // }
  }

  render() {
    let { isOrder, loading } = this.state;
    const { t, recording = false, orderDatas, setOrderValue, setOrder, navigation } = this.props;
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <Header backButton={true} text={'Выберите врача'} navigation = {this.props.navigation} /> 
        <KeyboardAwareScrollView style={{marginTop: -10, zIndex: 1, paddingTop: 10}}>
          {(loading) && <ActivityIndicator size="large" color={ACCENT_BLUE} /> }
          {
            (!loading) && (
              (isOrder) ? (
                (orderDatas.doctors.length) ? (
                  orderDatas.doctors.map((item, index)=>(
                    <CatalogItem 
                      key={index}  
                      onClick={() => {
                        setOrderValue({docdep: `${item.lastname} ${item.firstname} ${item.secondname}`});
                        setOrder({docdep_id: item.docdep}, 'docdep_id');
                        navigation.goBack()
                      }}
                      imageUri={{uri: `${APP_IMG_URL}photo_doc/${item.docid}.jpg`}} 
                      name={`${item.lastname} ${item.firstname} ${item.secondname}`}
                      position={item.speciality}
                      info={item.description_short}
                    />
                  ))
                ) : <Text style={{textAlign: 'center', fontSize: medium, fontFamily: MAIN_FONT}}>{ t('listdoctors:no_doctors_text') }</Text>
              ): (
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
              ): <Text style={{textAlign: 'center', fontSize: medium, fontFamily: MAIN_FONT}}>{ t('listdoctors:no_doctors_text') }</Text>
            ))
          }
          <View style={{width: '100%', height: 10}}/>
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    list_Doctors: state.content.listDoctors,
    orderDatas: state.content.orderDatas,
    orderValues: state.content.orderValues
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch)
}

export default withNamespaces('listdoctors')(connect(mapStateToProps, mapDispatchToProps)(DoctorList));