import React, { Component } from 'react';
import { ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity, BackHandler, ActivityIndicator } from 'react-native';
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

let { width, height } = Dimensions.get('window');
const { accentBlue, darkBlue, darkGray, blue, mediumBlack } = variables.colors;
const { extralarge, medium } = variables.fSize;
const { mainFont } = variables.fonts;

class DoctorScreen extends Component {
  constructor(props) {
    console.log(props)
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

  _openQuestion = () => {
    const {isGuest, navigation, doctor} = this.props;
    if (isGuest) {
      this.props.setAuthMessage(t('common:actions.question_text'));
      navigation.navigate('authorization');
    } else { 
      navigation.navigate('questions', {doc_id: this.state.docid, fio: `${doctor[0].lastname} ${doctor[0].firstname} ${doctor[0].secondname}`});
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { docid, loading, spec_id, docdep_id } = this.state;
    const { t, doctor } = this.props;

    return (
      <View style={{ justifyContent: 'space-between', flexDirection: 'column', height: '100%', backgroundColor: 'white'}}>
        <Header text={ t('listdoctors:item.title') } navigation={this.props.navigation} />
        <HeaderBottom />
        <View style={styles.imageWrap}>
          {
            (!loading) && (
              <Image
                style={styles.docIcon}
                resizeMode='cover'
                source={{uri: `${APP_IMG_URL}photo_doc/${docid}.jpg`}}
              />
            )
          }
        </View>
        <ScrollView  contentContainerStyle={{justifyContent: 'space-between', flexGrow: 1}}>
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
                    <TouchableOpacity onPress={() => this._openQuestion()} style={styles.blockQuestion}>
                      <Text uppercase={false} style={{ fontSize: 13, lineHeight: 14, fontFamily: variables.fonts.mainFont, color: darkBlue, }}>{ t('common:actions.ask_question') }</Text>
                      <Image
                        style={{ width: 25, height: 25, position: 'absolute', right: 6, top: 6 }}
                        resizeMode='cover'
                        source={require('../../../assets/img/conversation.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: 5, }}>
                  <Text style={{ fontSize: variables.fSize.main, fontFamily: variables.fonts.mainFont, color: darkGray }}>{doctor[0].category} </Text>
                  <Text style={{ fontSize: variables.fSize.main, fontFamily: variables.fonts.mainFont, color: darkGray }}>| {doctor[0].department}</Text>
                </View>
              </View>
              <View style={{ paddingTop: 10, backgroundColor: 'white', paddingLeft: 10  }}>
                <Text style={{ fontSize: variables.fSize.main, fontFamily: variables.fonts.mainFont, color: variables.colors.mediumBlack }}>{doctor[0].description}</Text>
                {/* <View style={{ position: 'relative', marginBottom: 10 }}>
                  <View style={styles.listIcon}></View>
                  <Text style={{ fontSize: variables.fSize.main, fontFamily: variables.fonts.mainFont, color: variables.colors.mediumBlack }}>имплантация зубов: (более 1600 успешных имплантаций)</Text>
                </View>
                <View style={{ position: 'relative', marginBottom: 10 }}>
                  <View style={styles.listIcon}></View>
                  <Text style={{ fontSize: variables.fSize.main, fontFamily: variables.fonts.mainFont, color: variables.colors.mediumBlack }}>имплантация зубов: (более 1600 успешных имплантаций)</Text>
                </View> */}
              </View>
            </View>
            ) : <ActivityIndicator size="small" color={blue} style={{marginTop: 10}}/>
          }
          {(!loading) && (
          <View style={{ paddingHorizontal: 15, paddingVertical: 20, backgroundColor: 'white' }}>
            <CustomBtn label='ЗАПИСЬ НА ПРИЁМ' onClick={() => navigate('receptions')} />
          </View>
          )}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imageWrap: {
    width: width - 80,
    marginHorizontal: 40,
    height: height*0.3,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    left: 0,
    zIndex: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  docIcon: {
    width: '100%',
    height: height*0.30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  docInfoWrap: {
    width: '100%',
    paddingTop: height*0.27,
    paddingHorizontal: 20,
    paddingBottom: 10,
    justifyContent: 'flex-end',
    marginTop: -20,
    width: '100%',
  },
  docInfo: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    
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
    borderColor: accentBlue,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 3
  }
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
