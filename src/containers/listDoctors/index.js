import React, { Component } from 'react';
import { StyleSheet, BackHandler, ActivityIndicator} from 'react-native';
import { Container, Content, Text } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import CatalogItem from '../../components/catalog/CatalogItem';
import Header from '../../components/common/Header';
//import HeaderBottom from '../../components/common/HeaderBottom';
import {APP_IMG_URL} from '../../config';

import variables from '../../styles/variables';
const { medium } = variables.fSize;

import { ACCENT_BLUE, MAIN_FONT } from '../../styles/constants';

class ServicesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spec_id: (props.navigation.state.params) ? props.navigation.state.params.spec_id : null,
      listview: true,
      loading: true,
      sorted_list_Doctors: props.list_Doctors,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.props.getListDoctors(this.state.spec_id);
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

  toggle = (value) => {
    this.setState({listview: value});
  }

  render() {
    let { listview, loading, sorted_list_Doctors } = this.state;
    const { t } = this.props;
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <Header search={true} onChangeSearch={this.handleChange} navigation = {this.props.navigation} />
        {/* <HeaderBottom katalogDoctor={true}  onClick={this.change} togleClick={this.toggle} onChangeSearch={this.handleChange}/> */}
        <Content style={{marginTop: -10, zIndex: 1, paddingTop: 10}} contentContainerStyle={ [(listview)? {} : styles.containerStyle, (loading) ? {flex: 1, justifyContent: 'center'}: 0] } padder>
          {(loading) && <ActivityIndicator size="large" color={ACCENT_BLUE} /> }
          {
            (!loading) && (
              (sorted_list_Doctors.length)? (
                sorted_list_Doctors.map((item, index)=>(
                  <CatalogItem 
                    key={index} 
                    listview={listview} 
                    onClick={() => navigate('doctor',{docid: +item.docid, spec_id: item.specid, docdep_id: item.docdep})} 
                    imageUri={{uri: `${APP_IMG_URL}photo_doc/${item.docid}.jpg`}} 
                    name={`${item.lastname} ${item.firstname} ${item.secondname}`}
                  />
                ))
              ) : <Text style={{textAlign: 'center', fontSize: medium, fontFamily: MAIN_FONT}}>{ t('listdoctors:no_doctors_text') }</Text>
            )
          }
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%', 
    flexWrap: 'wrap', 
    flexDirection: 'row', 
    paddingHorizontal: 5
  },
  wrapPopup: {
    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 3
  }
});

function mapStateToProps(state) {
  return {
    list_Doctors: state.content.listDoctors,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch)
}

export default withNamespaces('listdoctors')(connect(mapStateToProps, mapDispatchToProps)(ServicesScreen));