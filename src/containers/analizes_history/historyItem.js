import React, { Component } from 'react';
import { BackHandler, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Container, Content } from 'native-base';
import HTMLView from 'react-native-htmlview';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';
import variables from '../../styles/variables';

const { lightGray, mediumBlack, black } = variables.colors;
const { mainFont } = variables.fonts;
const { large, main } = variables.fSize;

class HistoryItemScreen extends Component {

  constructor(props) {
    super(props);
    console.log(props.navigation.state)
    this.state = {
      p_type: (props.navigation.state.params) ? props.navigation.state.params.p_type : null,
      keyid: (props.navigation.state.params) ? props.navigation.state.params.keyid : null,
    };
  }

  componentDidMount() {
    const {p_type, keyid} = this.state;

    this.props.getHistory({type:'html', p_type, vis_id: keyid});
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }

  renderShare() {
    const { t } = this.props;

    return (
      <View style={{paddingLeft: '15%', paddingBottom: 10}}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{paddingVertical: 5, marginTop: 10}}
        >
          <View style={ styles.actionsWrap }>
            <Image
              style={ styles.actionsImg }
              resizeMode='contain'
              source={require('../../../assets/img/mail-icon.png')}
            />
            <Text style={{color: black, fontFamily: mainFont, fontSize: large}}>{ t('common:actions.send_to_mail') }</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{paddingVertical: 5, marginTop: 5}}
        >
          <View style={ styles.actionsWrap }>
            <Image
              style={ styles.actionsImg }
              resizeMode='contain'
              source={require('../../../assets/img/picture-icon.png')}
            />
            <Text style={{color: black, fontFamily: mainFont, fontSize: large}}>{ t('common:actions.save_to_gallery') }</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  staticContent = () => {
    const {history} = this.props;

    return (
      <View style={styles.textWrap}>
        <HTMLView
          value={history.data}
        />
      </View>
    )
  }

  render() {
    const { t, history } = this.props;

    return (
      <Container contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
        <Header text={t('history:title')} navigation={this.props.navigation} />
        <HeaderBottom text={t('history:sub_title')} />
        <Content padder style={{ marginTop: -10, zIndex: 1, paddingTop: 10 }}>
          {/* <View style={styles.wrapName}>
            <Text style={styles.txtName}>Терапевт</Text>
            <Text style={styles.txtSubname}>17.06.2018</Text>
          </View> */}
          {history && this.staticContent()}
        </Content>
        {this.renderShare()}
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  wrapName: {
    backgroundColor: lightGray, 
    textAlign: 'center', 
    borderRadius: 10, 
    paddingHorizontal: 0, 
    paddingVertical: 10,
    marginHorizontal: 15
  },
  txtName: {
    color: black, 
    fontFamily: mainFont,
    fontSize: large, 
    width: '100%', 
    textAlign: 'center',
  },
  txtSubname: {
    color: mediumBlack, 
    fontFamily: mainFont,
    marginTop: 5,
    fontSize: main, 
    width: '100%', 
    textAlign: 'center'
  },
  actionsWrap: {
    justifyContent: 'flex-start', 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  actionsImg: {
    width: 20, 
    height: 15, 
    marginRight: 10
  },
  textWrap: {
    backgroundColor: 'white', padding: 15, marginTop: 10
  },
})

function mapStateToProps(state) {
  return {
    history: state.content.history.current,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch)
}

export default withNamespaces(['history', 'common'])(connect(mapStateToProps, mapDispatchToProps)(HistoryItemScreen));
