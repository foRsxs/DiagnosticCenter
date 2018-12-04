import React, {Component} from 'react';
import {Alert, StyleSheet, BackHandler, ActivityIndicator} from 'react-native';
import {Container, Content, View, Text} from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import CustomBtn from '../../components/common/CustomBtn'
import variables from '../../styles/variables';
import ReceptionListItem from '../../components/receptions/ReceptionListItem'
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';

const {blue} = variables.colors;

class ReceptionListScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.props.getListTalons();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.listTalons !== this.props.listTalons) this.setState({loading: false});
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }

  render() {
    const {loading} = this.state;
    const { navigate } = this.props.navigation;
    const { t, listTalons } = this.props;

    return (
      <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
        <Header text={ t('recordings:title') } navigation = {this.props.navigation}/>
        <HeaderBottom text={ t('recordings:total_text') + ` - ${listTalons.length}` } />
        <Content style={{marginTop: -10, zIndex: 1, paddingTop: 10}} padder>
          {(loading) && <ActivityIndicator size="small" color={blue} /> }
          {
            (!loading) && (
              (listTalons.length)? (
                listTalons.map((item, index)=> (
                  <ReceptionListItem 
                    key={index} 
                    headTxt={item.spec} 
                    servTxt='' 
                    timeTxt={`${item.dd}, ${t('recordings:in_text')} ${item.time}`} 
                    nameTxt={`${item.doc}, ${t('recordings:short_room_text')} ${item.room}`} 
                    onPress={()=> navigate('recordingItem', {
                      rnumb_id: item.rnumb_id,
                      dd: item.dd,
                      room: item.room,
                      time: item.time,
                      doctor: item.doc,
                      spec: item.spec,
                      reserved: true
                    })
                  }/>
                ))
              ) :
              ( <Text>{ t('recordings:no_recordings_text') }</Text> )
            )
          }
        </Content >
        <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
          <CustomBtn label={ t('common:actions.add_recording') } onClick={()=> navigate('recordingCreate')}/>
        </View>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    listTalons: state.content.listTalons,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch)
}

export default withNamespaces(['recordings', 'common'])(connect(mapStateToProps, mapDispatchToProps)(ReceptionListScreen));