import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Container, Text } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import * as ContentActions from '../../actions/content';
import CatalogItem from '../../components/CatalogItem';
import Header from '../../components/common/Header';
import {APP_IMG_URL} from '../../config';
import variables from '../../styles/variables';
import { ACCENT_BLUE, MAIN_FONT } from '../../styles/constants';

const { medium } = variables.fSize;

class DoctorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spec_id: (props.navigation.state.params) ? props.navigation.state.params.spec_id : null,
      isOrder: (props.navigation.state.params && props.navigation.state.params.isOrder) ? props.navigation.state.params.isOrder : false
    };
  }

  render() {
    let { isOrder } = this.state;
    const { t, isRequest, orderDatas, setOrderValue, setOrder, navigation } = this.props;
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <Header backButton={true} text={t('createrecord:form.select_doctor')} navigation = {this.props.navigation} /> 
        <KeyboardAwareScrollView contentContainerStyle={(isRequest) ? { flex: 1, justifyContent: 'center' } : {marginTop: -10, zIndex: 1, paddingTop: 10}}>
          {(!!isRequest) ? (<ActivityIndicator size="large" color={ACCENT_BLUE} />) : 
          (<View>
          {
            (!!isOrder) ? (
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
              ) : (<Text style={{textAlign: 'center', fontSize: medium, fontFamily: MAIN_FONT, margin: 15}}>{ t('listdoctors:no_doctors_text') }</Text>)
            ) : (
              (!!sorted_list_Doctors && sorted_list_Doctors.length) ? (
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
              ) : (<Text style={{textAlign: 'center', fontSize: medium, fontFamily: MAIN_FONT, margin: 15}}>{ t('listdoctors:no_doctors_text') }</Text>)
            )
          }
          </View>)}
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    list_Doctors: state.content.listDoctors,
    orderDatas: state.content.orderDatas,
    orderValues: state.content.orderValues,
    isRequest: state.content.isRequest
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch)
}

export default withNamespaces(['listdoctors', 'createrecord'])(connect(mapStateToProps, mapDispatchToProps)(DoctorList));