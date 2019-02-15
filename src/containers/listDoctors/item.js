import React, { Component } from 'react';
import { ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity, BackHandler, ActivityIndicator } from 'react-native';
import HTMLView from 'react-native-htmlview';
import { View, Text } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import variables from '../../styles/variables';
import CustomBtn from '../../components/common/CustomBtn';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';
import {APP_IMG_URL} from '../../config';

let { height } = Dimensions.get('window');
const { extralarge, medium } = variables.fSize;

import { WHITE, LIGHT_BLUE, ACCENT_BLUE, DARK_BLUE, DARK_GREY, MEDIUM_BLACK, MAIN_FONT  } from '../../styles/constants';

class DoctorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      docid: (props.navigation.state.params) ? props.navigation.state.params.docid : null,
      spec_id: (props.navigation.state.params) ? props.navigation.state.params.spec_id : null,
      docdep_id: (props.navigation.state.params) ? props.navigation.state.params.docdep_id : null,
      loading: true
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    // this.props.getDoctor(this.state.docid)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.doctor !== nextProps.doctor) {
      this.setState({loading: false})
    }
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }

  _openPage = (page, text_error) => {
    const {t, isGuest, navigation, doctor} = this.props;
    const {spec_id, docdep_id, docid } = this.state;
    if (isGuest) {
      this.props.setAuthMessage(t(`common:actions_text.${text_error}_text`));
      navigation.navigate('authorization');
    } else {
      (page == 'questions') ? navigation.navigate(page, {doc_id: docid, specid: spec_id, docdep: docdep_id, fio: `${doctor[0].lastname} ${doctor[0].firstname} ${doctor[0].secondname}`}): navigation.navigate(page, {spec_id, docdep_id, type: doctor[0].type[0]})
    }
  }

  render() {
    const { docid, loading} = this.state;
    const { t, doctor } = this.props;
    let description = (doctor && doctor[0].description) ? doctor[0].description.replace(new RegExp('<p>', 'g'), '<span>').replace(new RegExp('</p>', 'g'), '</span>') : '';
    
    console.log(this.props.navigation.state.params.docid)
    
    return (
      <ScrollView style={{backgroundColor: WHITE}}>
        <View style={{justifyContent: 'space-between', flexDirection: 'column', flex: 1, backgroundColor: WHITE}}>
          <Header text={ t('listdoctors:item.title') } navigation={this.props.navigation} />
          <HeaderBottom />        
          <View style={styles.imageWrap}>
            {
              (!loading) && (
                <Image
                  style={styles.docIcon}
                  resizeMode='contain'
                  source={{uri: this.props.navigation.state.params.uri}}
                />)            
            }
          </View>
          <View style={[{justifyContent: 'space-between', flexGrow: 1}, (loading) ? {justifyContent: 'center'} : {}]}>
            {
              (!loading) ? (
              <View style={styles.docInfoWrap}>
                <View style={styles.docInfo}>
                  <View style={styles.docInfoBlock}>
                    <View style={{ width: '100%', paddingRight: 115 }}>
                      <Text style={styles.headTxt}>{`${doctor[0].lastname} ${doctor[0].firstname} ${doctor[0].secondname}`}</Text>
                      <Text style={styles.subHeadTxt}>{doctor[0].speciality}</Text>
                    </View>
                    <View style={{ width: 100, position: 'absolute', right: 0, top: 0 }}>
                      <TouchableOpacity onPress={() => this._openPage('questions', 'question')} style={styles.blockQuestion}>
                        <Text 
                          uppercase={false} 
                          style={{ fontSize: 13, lineHeight: 14, fontFamily: MAIN_FONT, color: DARK_BLUE, width: 63}}
                        >{ t('common:actions.ask_question') }</Text>
                        <Image
                          style={{ width: 25, height: 25}}
                          resizeMode='cover'
                          source={require('../../../assets/img/conversation.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: 5 }}>
                    { (doctor[0].experience && doctor[0].category) && (
                      <Text style={{ fontSize: variables.fSize.main, fontFamily: MAIN_FONT, color: DARK_GREY }}>{doctor[0].category} | </Text> 
                    ) }
                    <Text style={{ fontSize: variables.fSize.main, fontFamily: MAIN_FONT, color: DARK_GREY }}>{ t('listdoctors:item.experience') }: {doctor[0].experience}</Text>
                  </View>
                </View>
                <View style={{ paddingHorizontal: 20, paddingVertical: 10}}>
                  <Text style={{ fontSize: variables.fSize.main, fontFamily: MAIN_FONT, color: MEDIUM_BLACK }}>{doctor[0].department}</Text>
                  <HTMLView
                    stylesheet={ stylesHtml }
                    value={`<p>${description}</p>`}
                  />
                </View>
              </View>
              ) : <ActivityIndicator size="large" color={ACCENT_BLUE} style={{marginTop: 10}}/>
            }
            <View style={{ paddingHorizontal: 15, paddingVertical: 20, backgroundColor: WHITE }}>
            {(!loading && +doctor[0].allow === 1) && (
              <CustomBtn label={ t('common:actions.appointment') } onClick={() =>  this._openPage('recordingCreate', 'recording')} />
            )}
            {(!loading && +doctor[0].allow === 0) && (           
              <Text style={{ textAlign: 'center' }}>{ t('listdoctors:item.no_recording_text') }</Text>            
            )}
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  imageWrap: {
    width: '100%',
    height: height*0.3,
    marginTop: -50,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  docIcon: {
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
    height: height*0.30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  docInfoWrap: {
    justifyContent: 'flex-end',
    width: '100%',
  },
  docInfo: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: LIGHT_BLUE,    
    padding: 20,
  },
  docInfoBlock: {
    width: '100%',
    position: 'relative',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headTxt: {
    fontFamily: MAIN_FONT,
    fontSize: extralarge,
    color: MEDIUM_BLACK,
    lineHeight: 24
  },
  subHeadTxt: {
    fontFamily: MAIN_FONT,
    fontSize: medium,
    color: ACCENT_BLUE,
    marginVertical: 5
  },
  ratingWrap: {
    position: 'absolute',
    width: 100,
    height: '100%',
    top: 5,
    right: 0
  },
  listIcon: {
    backgroundColor: ACCENT_BLUE,
    width: 4,
    height: 4,
    borderRadius: 3,
    position: 'absolute',
    top: 10,
    left: -10
  },
  blockQuestion: {
    position: 'relative',
    flexDirection: 'row',
    padding: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderColor: ACCENT_BLUE,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5
  }
});

const stylesHtml = StyleSheet.create({
  p: {
    margin: 0,
    fontSize: variables.fSize.main, 
    fontFamily: MAIN_FONT, 
    color: MEDIUM_BLACK
  },
  ul: {
    marginTop: 0,
    padding: 0,
  },
});

function mapStateToProps(state) {
  return {
    doctor: state.content.doctorData,
    isGuest: state.authorization.isGuest
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch)
}

export default withNamespaces(['listdoctors', 'common'])(connect(mapStateToProps, mapDispatchToProps)(DoctorScreen));
