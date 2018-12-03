import React, { Component } from 'react';
import { StyleSheet, BackHandler, ScrollView, ActivityIndicator } from 'react-native';
import { Container, Content, View } from 'native-base';
import i18n from '../../i18n';
import * as ContentActions from '../../actions/content';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CatalogItem from '../../components/catalog/CatalogItem';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';
import variebles from '../../styles/variables';
import {APP_IMG_URL} from '../../config';

const {blue} = variebles.colors;

class ServicesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spec_id: (props.navigation.state.params)? props.navigation.state.params.spec_id: null,
      listview: true,
      loading: true,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.props.getListDoctors(this.state.spec_id);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.list_Doctors !== nextProps.list_Doctors) this.setState({loading: false})
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
    return true;
  }

  togle = (value) => {
    this.setState({listview: value});
  }

  handleChange = (value) => {
    this.setState({inputValue: value});
  }

  render() {
    let { listview, loading } = this.state;
    const { list_Doctors } = this.props;
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header text="КАТАЛОГ ВРАЧЕЙ" navigation = {this.props.navigation}/>
        <HeaderBottom katalogDoctor={true} search={true} onClick={this.change} togleClick={this.togle} onChange={this.handleChange}/>
        <Content style={{marginTop: -10, zIndex: 1, paddingTop: 10}} contentContainerStyle={ (listview)? {} : styles.containerStyle } padder>
          {(loading) && <ActivityIndicator size="small" color={blue} /> }
          {
            (!loading) && (
              (list_Doctors.length)? (
                list_Doctors.map((item)=>(
                  <CatalogItem key={item.docid} listview={listview} onClick={() => navigate('doctor',{docid: +item.docid})} imageUri={{uri: `${APP_IMG_URL}photo_doc/${item.docid}.jpg`}} name={`${item.lastname} ${item.firstname} ${item.secondname}`}/>
                ))
              ) : <Text>Нет подходящих врачей</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ServicesScreen)
