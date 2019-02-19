import React, { Component } from 'react';
import { Image, TouchableOpacity, BackHandler } from 'react-native';
import HTMLView from 'react-native-htmlview';
import { View, Text, Container } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import * as ContentActions from '../../actions/content';
import { ICON_FOR_QUESTION, ICON_BLUE_ARROW } from '../../styles/images';
import CustomBtn from '../../components/common/CustomBtn';
import Header from '../../components/common/Header';
import { styles, stylesHtml } from './style/itemStyle'

import { WHITE, ACCENT_BLUE } from '../../styles/constants';

class DoctorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      docid: (props.navigation.state.params) ? props.navigation.state.params.doc_id : null,
      spec_id: (props.navigation.state.params) ? props.navigation.state.params.spec_id : null,
      docdep_id: (props.navigation.state.params) ? props.navigation.state.params.docdep_id : null,
      loading: true,
      tabProfile: true,
      moreInfo: false
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.props.getQuestions(this.state.docid)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.doctor !== nextProps.doctor) {
      this.setState({ loading: false })
    }
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
      navigation.navigate('authorization');
    } else {
      (page == 'questions') ? navigation.navigate(page, { doc_id: docid, specid: spec_id, docdep: docdep_id, fio: `${doctor.lastname} ${doctor.firstname} ${doctor.secondname}` }) : navigation.navigate(page, { spec_id, docdep_id, type: doctor.type[0] })
    }
  }

  renderProfile() {
    const { doctor } = this.props;
    let description = (doctor && doctor.description) ? doctor.description.replace(new RegExp('<p>', 'g'), '<span>').replace(new RegExp('</p>', 'g'), '</span>') : '';

    return (
      <View style={styles.bottomContainer}>
        <KeyboardAwareScrollView>
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
            <View style={styles.emptyBlock} />
          </View>
        </KeyboardAwareScrollView>
      </View>
    )
  }

  renderQuestions() {
    const { moreInfo, docid } = this.state;
    const { questions, t, navigation } = this.props;

    return (
      <View style={styles.bottomContainer}>
        <View style={styles.wrapBtnQuest}>
          <TouchableOpacity activeOpacity={0.9} style={styles.btnQuest} onPress={() => navigation.navigate("questionForm", { doc_id: docid })}>
            <Image style={styles.iconQuest} source={ICON_FOR_QUESTION} />
            <Text style={styles.textBtn}>{t('common:actions.ask_question_doctor')}</Text>
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
            )) : <Text style={styles.emptyData}>{t('faq:no_often_questions_text')}</Text>
          }
        </KeyboardAwareScrollView>
      </View>
    )
  }

  render() {
    const { docid, loading, tabProfile } = this.state;
    const { t, doctor, navigation, questions } = this.props;

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
              (!loading && +doctor.allow === 1) && (
                <CustomBtn contentContainerStyle={styles.redBtn} label={t('common:actions.appointment')} onClick={() => this._openPage('recordingCreate', 'recording')} />
              )}
            {
              (!loading && +doctor.allow === 0) && (
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
                <Text style={[styles.textTab, { color: (tabProfile ? ACCENT_BLUE : WHITE) }]}>{t('footer_menu:profile').toUpperCase()}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, { backgroundColor: (tabProfile) ? ACCENT_BLUE : WHITE }]}
                activeOpacity={0.9}
                onPress={() => { this.setState({ tabProfile: false }) }}
              >
                <Text style={[styles.textTab, { color: (tabProfile ? WHITE : ACCENT_BLUE) }]}>{t('common:actions.questions').toUpperCase()}</Text>
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

export default withNamespaces(['listdoctors', 'common', 'footer_menu', 'faq'])(connect(mapStateToProps, mapDispatchToProps)(DoctorScreen));
