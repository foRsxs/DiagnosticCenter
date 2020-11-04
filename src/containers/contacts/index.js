import React, { Component } from 'react';
import { TouchableOpacity, Image, Linking } from 'react-native';
import { Container, Content, View, Text } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import Header from '../../components/common/Header';
import styles from './styles';
import { ICON_INSTAGRAM, ICON_FACEBOOK, MARK_ICON } from '../../styles/images';

class ContactsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  _sendQuestion = () => {
    const { navigation } = this.props;

    navigation.navigate('faq');
  }

  render() {
    const { t, appParamsConfig } = this.props;

    return (
      <Container contentContainerStyle={styles.mainContainer}>
        <Header backButton={true} text={t('contacts:title')} navigation={this.props.navigation} />
        <Content padder style={styles.mainContent} contentContainerStyle={{ paddingBottom: 20 }}>
          <View style={styles.contactItem}>
            <Text style={styles.headTxt}>{t('contacts:address')}:</Text>
            <Text style={styles.subHeadTxt}>{appParamsConfig?.address}</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.headTxt}>{t('contacts:phones')}:</Text>
            <Text style={styles.subHeadTxt}>{t('contacts:call_centre')}</Text>
            <Text style={styles.linkTxt} onPress={() => Linking.openURL(`tel:${appParamsConfig?.callcenter}`)}>{appParamsConfig?.callcenter}</Text>
            <Text style={styles.linkTxt} onPress={() => Linking.openURL(`tel:${appParamsConfig?.callcenter_mobile}`)}>{appParamsConfig?.callcenter_mobile}</Text>
            <Text style={styles.subHeadTxt}>{t('contacts:main_doc_office')}</Text>
            <Text style={styles.linkTxt} onPress={() => Linking.openURL(`tel:${appParamsConfig?.phone_glav_doctor}`)}>{appParamsConfig?.phone_glav_doctor}</Text>
            <Text style={styles.subHeadTxt}>{t('contacts:main_doc_deputy')}</Text>
            <Text style={styles.linkTxt} onPress={() => Linking.openURL(`tel:${appParamsConfig?.phone_zam_doctor}`)}>{appParamsConfig?.phone_zam_doctor}</Text>
            <Text style={styles.subHeadTxt}>{t('contacts:phone_of_trust')}</Text>
            <Text style={styles.linkTxt} onPress={() => Linking.openURL(`tel:${appParamsConfig?.phone_trust}`)}>{appParamsConfig?.phone_trust}</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.headTxt}>{t('contacts:email_text')}:</Text>
            <Text style={styles.linkTxt} onPress={() => Linking.openURL(`mailto:${appParamsConfig?.email}`)}>{appParamsConfig?.email}</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.headTxt}>{t('contacts:social_text')}:</Text>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <TouchableOpacity style={{ marginRight: 15 }} onPress={() => Linking.openURL(appParamsConfig?.instagram)}>
                <Image source={ICON_INSTAGRAM} style={{ width: 40, height: 40 }} resizeMode='contain' />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL(appParamsConfig?.facebook)}>
                <Image source={ICON_FACEBOOK} style={{ width: 40, height: 40 }} resizeMode='contain' />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contactItem}>
            <Text style={[styles.headTxt, { marginBottom: 5 }]}>{t('contacts:feedback_text')}:</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}
            >
              <Image source={MARK_ICON} style={{ width: 20, height: 20 }} resizeMode='contain' />
              <Text style={[styles.linkTxt, { marginLeft: 5 }]} onPress={() => this._sendQuestion()}>{t('common:actions.send_msg')}</Text>
            </TouchableOpacity>
          </View>
        </Content >
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    isGuest: state.authorization.isGuest,
    appParamsConfig: state.deviceInfo.appParamsConfig
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch);
}

export default withNamespaces(['contacts', 'common'])(connect(mapStateToProps, mapDispatchToProps)(ContactsScreen));
