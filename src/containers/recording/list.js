import React, { Component } from 'react';
import { BackHandler, ActivityIndicator, StyleSheet, View } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import CustomBtn from '../../components/common/CustomBtn'
import ReceptionListItem from '../../components/receptions/ReceptionListItem'
import Header from '../../components/common/Header';

import variables from '../../styles/variables';
const { medium } = variables.fSize;

import { ACCENT_BLUE, MAIN_FONT } from '../../styles/constants';

class ReceptionListScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      shareLoading: false
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
    if (prevProps.listTalons !== this.props.listTalons) this.setState({ loading: false });
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
    return true;
  }

  render() {
    const { loading, shareLoading } = this.state;
    const { navigate } = this.props.navigation;
    const { t, listTalons } = this.props;

    return (
      <Container contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
        <Header backButton={true} plusButton={true} text={t('recordings:title')} navigation={this.props.navigation} />
        {(shareLoading) && (<View style={styles.loaderWrap}>
          <ActivityIndicator size="large" color={ACCENT_BLUE} />
        </View>)}
        <Content style={{ marginTop: -10, zIndex: 1, paddingTop: 10 }} contentContainerStyle={(loading) ? { flex: 1, justifyContent: 'center' } : {}} padder>
          {(loading) && <ActivityIndicator size="large" color={ACCENT_BLUE} />}
          {
            (!loading) && (
              (listTalons && listTalons.length) ? (
                listTalons.map((item, index) => (
                  <ReceptionListItem
                    key={index}
                    headTxt={item.spec}
                    servTxt={item.serv}
                    docTxt={item.doc}
                    pdf={item.pdf}
                    timeTxt={`${item.dd}, ${t('recordings:in_text')} ${item.time}`}
                    nameTxt={`${item.doc}, ${t('recordings:short_room_text')} ${item.room}`}
                    isLoading={(value) => this.setState({ shareLoading: value })}
                    onPress={() => navigate('recordingItem', {
                      rnumb_id: item.rnumb_id,
                      dd: item.dd,
                      room: item.room,
                      time: item.time,
                      doctor: item.doc,
                      spec: item.spec,
                      reserved: true,
                      serv: item.serv,
                      pdf: item.pdf,
                      price: item.price,
                    })
                    } />
                ))
              ) : (<Text style={{ textAlign: 'center', fontSize: medium, fontFamily: MAIN_FONT }}>{t('recordings:no_recordings_text')}</Text>)
            )
          }
        </Content >
        <View style={{ paddingHorizontal: 15, paddingVertical: 20 }}>
          <CustomBtn label={t('common:actions.add_recording')} onClick={() => navigate('recordingCreate')} />
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  loaderWrap: {
    zIndex: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

function mapStateToProps(state) {
  return {
    listTalons: state.content.listTalons,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch)
}

export default withNamespaces(['recordings', 'common'])(connect(mapStateToProps, mapDispatchToProps)(ReceptionListScreen));