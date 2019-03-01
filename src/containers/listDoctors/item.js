import React, { Component } from 'react';
import { Image, TouchableOpacity, BackHandler, ActivityIndicator } from 'react-native';
import HTMLView from 'react-native-htmlview';
import { View, Text, Container } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import * as AuthActions from '../../actions/auth';
import * as ContentActions from '../../actions/content';
import { authAlert } from '../../utils/helpers';
import { ICON_FOR_QUESTION, ICON_BLUE_ARROW } from '../../styles/images';
import CustomBtn from '../../components/common/CustomBtn';
import Header from '../../components/common/Header';
import { styles, stylesHtml } from './style'

import { WHITE, ACCENT_BLUE } from '../../styles/constants';

class DoctorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      docid: (props.navigation.state.params) ? props.navigation.state.params.doc_id : null,
      spec_id: (props.navigation.state.params) ? props.navigation.state.params.spec_id : null,
      docdep_id: (props.navigation.state.params) ? props.navigation.state.params.docdep_id : null,
      tabProfile: true,
      moreInfo: false
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }

  _openPage = (page, text_error) => {
    const { t, isGuest, navigation, doctor } = this.props;
    const { spec_id, docdep_id, docid } = this.state;

    if (isGuest) {
      this.props.setAuthMessage(t(`common:actions_text.${text_error}_text`));
      authAlert(t, navigation);
    } else {
      (page == 'questions') ? 
        navigation.navigate(page, { doc_id: docid, specid: spec_id, docdep: docdep_id, fio: `${doctor.lastname} ${doctor.firstname} ${doctor.secondname}` }) 
      :
        navigation.navigate({
          key: docdep_id,
          routeName: page,
          params: { spec_id, docdep_id, type: doctor.type[0]},
        });
    }
  }

  renderProfile() {
    const { isRequest, doctor } = this.props;
    let description = (doctor && doctor.description) ? doctor.description.replace(new RegExp('<p', 'g'), '<span').replace(new RegExp('</p>', 'g'), '</span>') : '';
    
    return (
      <View style={styles.bottomContainer}>
        {
          (isRequest) ? 
          (<ActivityIndicator style={(isRequest) ? { marginTop: 100 } : {}} size="large" color={ACCENT_BLUE} />)
          : 
          (<KeyboardAwareScrollView>
            <View style={styles.mainInfo}>
              <Text style={styles.name}>{`${doctor.lastname} ${doctor.firstname} ${doctor.secondname}`}</Text>
              <Text style={styles.speciality}>{doctor.speciality}</Text>
              <Text style={styles.category}>{doctor.category}</Text>
            </View> 
            <View style={styles.blockInfo}>
              <HTMLView
                stylesheet={stylesHtml}
                value={`<p>${description}</p>`}
              />
            </View>
          </KeyboardAwareScrollView>)
        } 
      </View>
    )
  }

  renderQuestions() {
    const { moreInfo, docid } = this.state;
    const { questions, t, isRequest, navigation, isGuest, setActiveTab } = this.props;

    return (
      <View style={styles.bottomContainer}>
        <View style={styles.wrapBtnQuest}>
          <TouchableOpacity 
            activeOpacity={0.9} 
            style={styles.btnQuest} 
            onPress={() => {
              if (isGuest) {
                this.props.setAuthMessage(t(`common:actions_text.question_text`));
                authAlert(t, navigation);
              } else {
                setActiveTab(0);
                navigation.navigate("questionForm", { doc_id: docid })
              }
            }}
          >
            <Image style={styles.iconQuest} source={ICON_FOR_QUESTION} />
            <Text style={styles.textBtn}>{t('common:actions.ask_question_doctor')}</Text>
          </TouchableOpacity>
        </View>
        <KeyboardAwareScrollView contentContainerStyle={(isRequest) ? { flex: 1, justifyContent: 'center' } : {paddingBottom: 80}}>
          {
            (isRequest) ? (<ActivityIndicator size="large" color={ACCENT_BLUE} />) :
            (questions && questions.length >= 1) ?
              questions.map((item)=>(
                <View style={styles.mainInfo} key={item.id}>
                  <Text style={styles.textQuestion}>{item.question}</Text>
                  {
                    (moreInfo) && (<Text style={[styles.textQuestion, { color: ACCENT_BLUE }]}>{item.answer}</Text>) 
                  }
                  <TouchableOpacity activeOpacity={0.9} onPress={() => this.setState({moreInfo: !moreInfo})} style={styles.more}>
                    <Text style={styles.openInfo}>{(moreInfo) ? t('faq:hide_answer') : t('faq:show_answer')}</Text>
                    <Image source={ICON_BLUE_ARROW} style={(moreInfo) ? styles.arrowActive : styles.arrow}/>
                  </TouchableOpacity>
                </View> 
              )
            ) : <Text style={styles.emptyData}>{t('faq:no_often_questions_text')}</Text>
          }
        </KeyboardAwareScrollView>
      </View>
    )
  }

  render() {
    const { tabProfile } = this.state;
    const { t, doctor } = this.props;

    return (
      <Container>
        <View style={styles.imgWrap}>
          <Image
            style={styles.avatar}
            resizeMode='cover'
            source={{ uri: this.props.navigation.state.params.uri }}
          />
        </View>
        {
          (tabProfile) &&
          <View style={styles.btnWrap}>
            {
              (+doctor.allow === 1) && (
                <CustomBtn 
                  contentContainerStyle={styles.redBtn} 
                  label={t('common:actions.appointment')} 
                  onClick={() => this._openPage('recordingCreate', 'record')} 
                />
              )}
            {
              (+doctor.allow === 0) && (
                <Text style={{ textAlign: 'center' }}>{t('listdoctors:item.no_recording_text')}</Text>
              )}
          </View>
        }
        <View style={{ flex: 1 }}>
          <Header backButton={true} navigation={this.props.navigation} />
          <View style={styles.topContent}>
            <View style={styles.tabs}>
              <TouchableOpacity
                style={[styles.tab, { backgroundColor: (tabProfile) ? WHITE : ACCENT_BLUE }]}
                activeOpacity={0.9}
                onPress={() => { this.setState({ tabProfile: true }) }}
              >
                <Text style={[styles.textTab, { color: (tabProfile ? ACCENT_BLUE : WHITE) }]}>{t('listdoctors:item.profile').toUpperCase()}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, { backgroundColor: (tabProfile) ? ACCENT_BLUE : WHITE }]}
                activeOpacity={0.9}
                onPress={() => { this.setState({ tabProfile: false }) }}
              >
                <Text style={[styles.textTab, { color: (tabProfile ? WHITE : ACCENT_BLUE) }]}>{t('listdoctors:item.questions').toUpperCase()}</Text>
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
    user: state.authorization.user,
    doctor: state.content.doctorData,
    questions: state.content.questions.doctors,
    isGuest: state.authorization.isGuest,
    isRequest: state.content.isRequest
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...AuthActions, ...ContentActions}, dispatch)
}

export default withNamespaces(['listdoctors', 'common', 'faq'])(connect(mapStateToProps, mapDispatchToProps)(DoctorScreen));
