import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Image, Linking, BackHandler} from 'react-native';
import {Container, Content, View, Text} from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import variables from '../../styles/variables';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';

class ContactsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
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

  _sendQuestion = () => {
    const {navigation} = this.props;

    navigation.navigate('faq');
  }

  render() {
    const { t } = this.props;

    return (
      <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
        <Header text={ t('contacts:title') } navigation = {this.props.navigation} />
        <HeaderBottom />
        <Content padder style={{marginTop: -10, zIndex: 1, paddingTop: 10, paddingHorizontal: 20}} contentContainerStyle={{paddingBottom: 20}}>
          <View style={styles.contactItem}>
            <Text style={styles.headTxt}>{ t('contacts:address') }:</Text>
            <Text style={styles.subHeadTxt}>{ t('contacts:address_text') }</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.headTxt}>{ t('contacts:phones') }:</Text>
            <Text style={styles.subHeadTxt}>{ t('contacts:call_centre') }</Text>
            <Text style={styles.linkTxt} onPress={()=> Linking.openURL('tel:+87252367186')}>8 (7252) 36-71-86</Text>
            <Text style={styles.linkTxt} onPress={()=> Linking.openURL('tel:367132')}>36-71-32</Text>
            <Text style={styles.subHeadTxt}>{ t('contacts:main_doc_office') }</Text>
            <Text style={styles.linkTxt} onPress={()=> Linking.openURL('tel:+87252367184')}>8 (7252) 36-71-84</Text>
            <Text style={styles.subHeadTxt}>{ t('contacts:main_doc_deputy') }</Text>
            <Text style={styles.linkTxt} onPress={()=> Linking.openURL('tel:+87252367192')}>8 (7252) 36-71-92</Text>
            <Text style={styles.subHeadTxt}>{ t('contacts:phone_of_trust') }</Text>
            <Text style={styles.linkTxt} onPress={()=> Linking.openURL('tel:+8725395456')}>8 (7252) 39-54-56</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.headTxt}>{ t('contacts:email_text') }:</Text>
            <Text style={styles.linkTxt} onPress={()=> Linking.openURL('mailto:admin@diagnostika.kz')}>admin@diagnostika.kz</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.headTxt}>{ t('contacts:social_text') }:</Text>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <TouchableOpacity style={{marginRight: 15}} onPress={()=> Linking.openURL('https://www.instagram.com/diagnostik.center/')}>
                <Image source={require('../../../assets/img/instagram-icon.png')} style={{width: 40, height: 40}} resizeMode='contain'></Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> Linking.openURL('https://www.facebook.com/diagnostika.shymkent/')}>
                <Image source={require('../../../assets/img/facebook-icon.png')} style={{width: 40, height: 40}} resizeMode='contain'></Image>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contactItem}>
            <Text style={[styles.headTxt, {marginBottom: 5}]}>{ t('contacts:feedback_text') }:</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{flexDirection: 'row', justifyContent: 'flex-start'}}
            >
              <Image source={require('../../../assets/img/mark-icon.png')} style={{width: 20, height: 20}} resizeMode='contain'></Image>
              <Text style={[styles.linkTxt, {paddingTop: 5, marginLeft: 5}]} onPress={()=> this._sendQuestion()}>{t('common:actions.send_msg')}</Text>
            </TouchableOpacity>
          </View>
        </Content >
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  contactItem: {
    marginBottom: 15,
  },
  headTxt: {
    fontSize: variables.fSize.large, 
    fontFamily: variables.fonts.mainFont,
    color: variables.colors.black, 
    width: '100%', 
    textAlign: 'left',
  },
  subHeadTxt: {
    fontSize: variables.fSize.main, 
    fontFamily: variables.fonts.mainFont,
    color: variables.colors.darkGray, 
    width: '100%', 
    textAlign: 'left',
    marginVertical: 5
  },
  linkTxt: {
    fontSize: variables.fSize.main, 
    fontFamily: variables.fonts.mainFont,
    color: variables.colors.accentBlue, 
    width: '100%', 
    textAlign: 'left',
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: variables.colors.accentBlue,
  }
});

function mapStateToProps(state) {
  return {
    isGuest: state.authorization.isGuest
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch);
}

export default withNamespaces(['contacts', 'common'])(connect(mapStateToProps, mapDispatchToProps)(ContactsScreen));
