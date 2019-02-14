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

class ListDoctors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spec_id: (props.navigation.state.params) ? props.navigation.state.params.spec_id : null,
      // listview: true,
      loading: true,
      sorted_list_Doctors: props.list_Doctors,
      logoKey: '1'
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

  handleChange = (value) => {
    const {list_Doctors} = this.props;
    
    function findElements(item) {
      return `${item.lastname} ${item.firstname} ${item.secondname}`.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    }
    this.setState({ sorted_list_Doctors: list_Doctors.filter(findElements)});
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
    return true;
  }

  funLogo = (id) =>{
    const { logoKey } = this.state
    this.setState({logoKey: id})
    // return <Text>{(id !== logoKey)?value:''}</Text>
  }

  render() {
    let { listview, loading, sorted_list_Doctors, logoKey } = this.state;
    const { t, recording = false } = this.props;
    const { navigate } = this.props.navigation;

    // (sorted_list_Doctors)&&sorted_list_Doctors.sort((a, b) => { return a.specid - b.specid})
    console.log('list', this.props.sortedListDoctor);

    return (
      <Container>
        <Header search={true} onChangeSearch={this.handleChange}/>
        <KeyboardAwareScrollView style={{marginTop: -10, zIndex: 1, paddingTop: 10}}>
          {(loading) && <ActivityIndicator size="large" color={ACCENT_BLUE} /> }
          {
            (!loading) && (
              (sorted_list_Doctors.length)? (
                sorted_list_Doctors.map((item, index)=>(
                  <View  key={index}  >
                   
                  <CatalogItem 
                   
                    onClick={() => navigate('doctor',{docid: +item.docid, spec_id: item.specid, docdep_id: item.docdep})} 
                    imageUri={{uri: `${APP_IMG_URL}photo_doc/${item.docid}.jpg`}} 
                    name={`${item.lastname} ${item.firstname} ${item.secondname}`}
                    position={item.speciality}
                    info={item.description_short}
                  />
                  </View>
                ))
              ) : <Text style={{textAlign: 'center', fontSize: medium, fontFamily: MAIN_FONT}}>{ t('listdoctors:no_doctors_text') }</Text>
            )
          }
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    list_Doctors: state.content.listDoctors,
    sortedListDoctor: state.content.sortedListDoctor
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch)
}

export default withNamespaces('listdoctors')(connect(mapStateToProps, mapDispatchToProps)(ListDoctors));