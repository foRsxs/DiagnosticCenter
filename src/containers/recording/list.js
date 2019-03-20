import React, { Component } from 'react';
import { BackHandler, ActivityIndicator, View } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import ReceptionListItem from '../../components/ReceptionListItem'
import Header from '../../components/common/Header';

import styles from './styles';
import variables from '../../styles/variables';
const { medium } = variables.fSize;

import { ACCENT_BLUE, MAIN_FONT } from '../../styles/constants';

class ReceptionListScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
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

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
    return true;
  }

  render() {
    const { shareLoading } = this.state;
    const { navigate } = this.props.navigation;
    const { t, listTalons, isRequest } = this.props;

    return (
      <Container contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
        <Header backButton={true} plusButton={true} text={t('recordings:title')} navigation={this.props.navigation} />
        {(shareLoading) && (<View style={styles.loaderWrap}>
          <ActivityIndicator size="large" color={ACCENT_BLUE} />
        </View>)}
        <Content style={ styles.mainContent } contentContainerStyle={(isRequest) ? { flex: 1, justifyContent: 'center' } : {}} padder>
          {(isRequest) ? (<ActivityIndicator size="large" color={ACCENT_BLUE} />) : (
          <View>
          {
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
                  } 
                />
              ))
            ) : (<Text style={{ textAlign: 'center', fontSize: medium, fontFamily: MAIN_FONT }}>{t('recordings:no_recordings_text')}</Text>)
          }
          </View>)}        
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    listTalons: state.content.listTalons,
    isRequest: state.content.isRequest
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch)
}

export default withNamespaces(['recordings', 'common'])(connect(mapStateToProps, mapDispatchToProps)(ReceptionListScreen));