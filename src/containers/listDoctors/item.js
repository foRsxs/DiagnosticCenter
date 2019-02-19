import React, { Component } from 'react';
import { ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity, BackHandler, ActivityIndicator } from 'react-native';
import HTMLView from 'react-native-htmlview';
import { View, Text, Container } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import * as ContentActions from '../../actions/content';
import variables from '../../styles/variables';
import { ICON_FOR_QUESTION, ICON_BLUE_ARROW } from '../../styles/images';
import CustomBtn from '../../components/common/CustomBtn';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';
import {APP_IMG_URL} from '../../config';
import { styles, stylesHtml } from './style/itemStyle'

let { height } = Dimensions.get('window');
const { extralarge, medium } = variables.fSize;

import { WHITE, LIGHT_BLUE, ACCENT_BLUE, DARK_BLUE, DARK_GREY, MEDIUM_BLACK, MAIN_FONT } from '../../styles/constants';

class DoctorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      docid: (props.navigation.state.params) ? props.navigation.state.params.docid : null,
      spec_id: (props.navigation.state.params) ? props.navigation.state.params.spec_id : null,
      docdep_id: (props.navigation.state.params) ? props.navigation.state.params.docdep_id : null,
      loading: true,
      tabProfile: true,
      moreInfo: false
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    // this.props.getDoctor(this.state.docid)
    this.props.getQuestions(this.state.docid)
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

  // fff(){
  //   return(
  //     <ScrollView style={{backgroundColor: WHITE}}>
  //     <View style={{justifyContent: 'space-between', flexDirection: 'column', flex: 1, backgroundColor: WHITE}}>
  //       <Header text={ t('listdoctors:item.title') } navigation={this.props.navigation} />
  //       <HeaderBottom />        
  //       <View style={styles.imageWrap}>
  //         {
  //           (!loading) && (
  //             <Image
  //               style={styles.docIcon}
  //               resizeMode='contain'
  //               source={{uri: this.props.navigation.state.params.uri}}
  //             />)            
  //         }
  //       </View>
  //       <View style={[{justifyContent: 'space-between', flexGrow: 1}, (loading) ? {justifyContent: 'center'} : {}]}>
  //         {
  //           (!loading) ? (
  //           <View style={styles.docInfoWrap}>
  //             <View style={styles.docInfo}>
  //               <View style={styles.docInfoBlock}>
  //                 <View style={{ width: '100%', paddingRight: 115 }}>
  //                   <Text style={styles.headTxt}>{`${doctor[0].lastname} ${doctor[0].firstname} ${doctor[0].secondname}`}</Text>
  //                   <Text style={styles.subHeadTxt}>{doctor[0].speciality}</Text>
  //                 </View>
  //                 <View style={{ width: 100, position: 'absolute', right: 0, top: 0 }}>
  //                   <TouchableOpacity onPress={() => this._openPage('questions', 'question')} style={styles.blockQuestion}>
  //                     <Text 
  //                       uppercase={false} 
  //                       style={{ fontSize: 13, lineHeight: 14, fontFamily: MAIN_FONT, color: DARK_BLUE, width: 63}}
  //                     >{ t('common:actions.ask_question') }</Text>
  //                     <Image
  //                       style={{ width: 25, height: 25}}
  //                       resizeMode='cover'
  //                       source={require('../../../assets/img/conversation.png')}
  //                     />
  //                   </TouchableOpacity>
  //                 </View>
  //               </View>
  //               <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: 5 }}>
  //                 { (doctor[0].experience && doctor[0].category) && (
  //                   <Text style={{ fontSize: variables.fSize.main, fontFamily: MAIN_FONT, color: DARK_GREY }}>{doctor[0].category} | </Text> 
  //                 ) }
  //                 <Text style={{ fontSize: variables.fSize.main, fontFamily: MAIN_FONT, color: DARK_GREY }}>{ t('listdoctors:item.experience') }: {doctor[0].experience}</Text>
  //               </View>
  //             </View>
  //             <View style={{ paddingHorizontal: 20, paddingVertical: 10}}>
  //               <Text style={{ fontSize: variables.fSize.main, fontFamily: MAIN_FONT, color: MEDIUM_BLACK }}>{doctor[0].department}</Text>
  //               <HTMLView
  //                 stylesheet={ stylesHtml }
  //                 value={`<p>${description}</p>`}
  //               />
  //             </View>
  //           </View>
  //           ) : <ActivityIndicator size="large" color={ACCENT_BLUE} style={{marginTop: 10}}/>
  //         }
  //         <View style={{ paddingHorizontal: 15, paddingVertical: 20, backgroundColor: WHITE }}>
  //         {(!loading && +doctor[0].allow === 1) && (
  //           <CustomBtn label={ t('common:actions.appointment') } onClick={() =>  this._openPage('recordingCreate', 'recording')} />
  //         )}
  //         {(!loading && +doctor[0].allow === 0) && (           
  //           <Text style={{ textAlign: 'center' }}>{ t('listdoctors:item.no_recording_text') }</Text>            
  //         )}
  //         </View>
  //       </View>
  //     </View>
  //   </ScrollView>
  //   )
  // }

  renderProfile(){
    const { doctor } = this.props;
    let description = (doctor && doctor[0].description) ? doctor[0].description.replace(new RegExp('<p>', 'g'), '<span>').replace(new RegExp('</p>', 'g'), '</span>') : '';

    return(
      <View style={styles.bottomContainer}>
        <KeyboardAwareScrollView>
          <View style={styles.mainInfo}>
            <Text style={styles.name}>{`${doctor[0].lastname} ${doctor[0].firstname} ${doctor[0].secondname}`}</Text>
            <Text style={styles.speciality}>{doctor[0].speciality}</Text>
            <Text style={styles.category}>{doctor[0].category}</Text>
          </View>
          <View style={styles.blockInfo}>
          <HTMLView
            stylesheet={ stylesHtml }
            value={`<p>${description}</p>`}
          />
          <View style={styles.emptyBlock}/>
          </View>
        </KeyboardAwareScrollView>
      </View>
    )
  }

  renderQuestions(){
    const { moreInfo, docid } = this.state;
    const { questions, t, navigation } = this.props;

    return(
      <View style={styles.bottomContainer}>
        <View style={styles.wrapBtnQuest}>
          <TouchableOpacity activeOpacity={0.9} style={styles.btnQuest} onPress={() => navigation.navigate("questionForm", {doc_id: docid})}>
            <Image style={styles.iconQuest} source={ICON_FOR_QUESTION}/>
            <Text style={styles.textBtn}>{ t('common:actions.ask_question_doctor') }</Text>
          </TouchableOpacity>
        </View>
        <KeyboardAwareScrollView>
          {
            (questions.length>= 1) ?
            questions.map((item)=>(
              <View style={styles.mainInfo}>
                <Text style={styles.textQuestion}>{item.question}</Text>
                {
                  (moreInfo) && (<Text style={styles.textQuestion}>{item.answer}</Text>) 
                }
                <TouchableOpacity activeOpacity={0.9} onPress={() => this.setState({moreInfo: !moreInfo})} style={styles.more}>
                  <Text style={styles.openInfo}>{(moreInfo) ? 'скрить ответ' : 'посмотреть ответ'}</Text><Image source={ICON_BLUE_ARROW} style={(moreInfo) ? styles.arrowActive : styles.arrow}/>
                </TouchableOpacity>
              </View> 
            )) : <Text style={styles.emptyData}>Данных нет</Text>
          }
        </KeyboardAwareScrollView>
      </View>
    )
  }

  render() {
    const { docid, loading, tabProfile} = this.state;
    const { t, doctor, navigation, questions } = this.props;
    
    return (
      <Container>
        <View style={styles.imgWrap}>
          <Image
            style={styles.avatar}
            resizeMode='cover'
            source={{uri: this.props.navigation.state.params.uri}}
          />    
        </View>
        {
          (tabProfile) &&
          <View style={styles.btnWrap}>
          {
            (!loading && +doctor[0].allow === 1) && (
            <CustomBtn contentContainerStyle={styles.redBtn} label={ t('common:actions.appointment') } onClick={() =>  this._openPage('recordingCreate', 'recording')} />
          )}
          {
            (!loading && +doctor[0].allow === 0) && (           
            <Text style={{ textAlign: 'center' }}>{ t('listdoctors:item.no_recording_text') }</Text>            
          )} 
          </View> 
        }
        <View style={{flex: 1}}>
          <Header backButton={true} navigation = {this.props.navigation}/>
          <View style={styles.topContent}>
            <View style={styles.tabs}>
              <TouchableOpacity 
                style={[styles.tab, {backgroundColor: (tabProfile) ? WHITE : ACCENT_BLUE}]} 
                activeOpacity={0.9} 
                onPress={()=>{this.setState({tabProfile: true})}}
              >
                <Text style={[styles.textTab, {color: (tabProfile? ACCENT_BLUE : WHITE )}]}>{t('footer_menu:profile').toUpperCase()}</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.tab, {backgroundColor: (tabProfile) ? ACCENT_BLUE : WHITE}]} 
                activeOpacity={0.9} 
                onPress={()=>{this.setState({tabProfile: false})}}
              >
                <Text style={[styles.textTab, {color: (tabProfile? WHITE : ACCENT_BLUE )}]}>{t('common:actions.questions').toUpperCase()}</Text>
              </TouchableOpacity>
            </View>
          </View>
          {
            (tabProfile) ? this.renderProfile() : this.renderQuestions()
          }
        </View>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    doctor: state.content.doctorData,
    questions: state.content.questions.doctors,
    isGuest: state.authorization.isGuest
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch)
}

export default withNamespaces(['listdoctors', 'common', 'footer_menu'])(connect(mapStateToProps, mapDispatchToProps)(DoctorScreen));
