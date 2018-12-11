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
const { white, lightBlue, accentBlue, darkBlue, darkGray, mediumBlack } = variables.colors;
const { extralarge, medium } = variables.fSize;
const { mainFont } = variables.fonts;

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
    this.props.getDoctor(this.state.docid)
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
      (page == 'questions') ? navigation.navigate(page, {doc_id: docid, specid: spec_id, docdep: docdep_id, fio: `${doctor[0].lastname} ${doctor[0].firstname} ${doctor[0].secondname}`}): navigation.navigate(page, {spec_id, docdep_id})
    }
  }

  render() {
    const { docid, loading} = this.state;
    const { t, doctor } = this.props;
    let description = (doctor && doctor[0].description) ? doctor[0].description.replace(new RegExp('<p>', 'g'), '<span>').replace(new RegExp('</p>', 'g'), '</span>') : '';

    return (
      <ScrollView>
        <View style={{justifyContent: 'space-between', flexDirection: 'column', flex: 1, backgroundColor: 'white'}}>
          <Header text={ t('listdoctors:item.title') } navigation={this.props.navigation} />
          <HeaderBottom />        
          <View style={styles.imageWrap}>
            {
              (!loading) && (
                <Image
                  style={styles.docIcon}
                  resizeMode='contain'
                  source={{uri: `${APP_IMG_URL}photo_doc/${docid}.jpg`}}
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
                        <Text uppercase={false} style={{ fontSize: 13, lineHeight: 14, fontFamily: variables.fonts.mainFont, color: darkBlue }}>{ t('common:actions.ask_question') }</Text>
                        <Image
                          style={{ width: 25, height: 25, position: 'absolute', right: 6, top: 6 }}
                          resizeMode='cover'
                          source={require('../../../assets/img/conversation.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: 5 }}>
                    { (doctor[0].experience && doctor[0].category) && (
                      <Text style={{ fontSize: variables.fSize.main, fontFamily: variables.fonts.mainFont, color: darkGray }}>{doctor[0].category} | </Text> 
                    ) }
                    <Text style={{ fontSize: variables.fSize.main, fontFamily: variables.fonts.mainFont, color: darkGray }}>{ t('listdoctors:item.experience') }: {doctor[0].experience}</Text>
                  </View>
                </View>
                <View style={{ paddingHorizontal: 20, paddingVertical: 10}}>
                  <Text style={{ fontSize: variables.fSize.main, fontFamily: variables.fonts.mainFont, color: variables.colors.mediumBlack }}>{doctor[0].department}</Text>
                  <HTMLView
                    stylesheet={ stylesHtml }
                    value={`<p>${description}</p>`}
                  />
                </View>
              </View>
              ) : <ActivityIndicator size="large" color={accentBlue} style={{marginTop: 10}}/>
            }
            {(!loading && +doctor[0].allow === 1) && (
            <View style={{ paddingHorizontal: 15, paddingVertical: 20, backgroundColor: 'white' }}>
              <CustomBtn label={ t('common:actions.appointment') } onClick={() =>  this._openPage('recordingCreate', 'recording')} />
            </View>
            )}
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
    backgroundColor: lightBlue,    
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
    fontFamily: mainFont,
    fontSize: extralarge,
    color: mediumBlack,
    lineHeight: 24
  },
  subHeadTxt: {
    fontFamily: mainFont,
    fontSize: medium,
    color: accentBlue,
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
    backgroundColor: accentBlue,
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
    padding: 7,
    paddingBottom: 5,
    justifyContent: 'space-between',
    backgroundColor: white,
    borderColor: accentBlue,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5
  }
});

const stylesHtml = StyleSheet.create({
  p: {
    margin: 0,
    fontSize: variables.fSize.main, 
    fontFamily: variables.fonts.mainFont, 
    color: variables.colors.mediumBlack
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
