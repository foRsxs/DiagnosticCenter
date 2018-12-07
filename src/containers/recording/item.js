import React, {Component} from 'react';
import {StyleSheet, BackHandler, TouchableOpacity, Image} from 'react-native';
import {Container, Content, View, Text} from 'native-base';
import Share from 'react-native-share';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import CustomBtn from '../../components/common/CustomBtn';
import variables from '../../styles/variables';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';
import Popup from '../../components/common/Popup';

const { accentBlue, lightGray, mediumBlack, black } = variables.colors;
const { mainFont } = variables.fonts;
const { medium, large, main }  = variables.fSize;

class ReceptionInfoItemScreen extends Component {

  constructor(props) {
    super(props);
    console.log(props.navigation.state.params)
    this.state = {
      date: (props.navigation.state.params) ? props.navigation.state.params.dd: null,
      rnumb_id: (props.navigation.state.params) ? props.navigation.state.params.rnumb_id: null,
      room: (props.navigation.state.params) ? props.navigation.state.params.room: null,
      serv_id: (props.navigation.state.params) ? props.navigation.state.params.serv_id: null,
      time: (props.navigation.state.params) ? props.navigation.state.params.time: null,
      reserved: (props.navigation.state.params) ? props.navigation.state.params.reserved: false,
      doctor: (props.navigation.state.params) ? props.navigation.state.params.doctor: null,
      spec: (props.navigation.state.params) ? props.navigation.state.params.spec: null,
      serv: (props.navigation.state.params) ? props.navigation.state.params.serv: null,
      price: (props.navigation.state.params) ? props.navigation.state.params.price: null,
      modalVisible: false,
      hideButton: false,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.orderCreated !== this.props.orderCreated && this.props.orderCreated) this.setState({modalVisible: true});
    if (prevProps.orderCreated !== this.props.orderCreated && !this.props.orderCreated) this.setState({modalVisible: false});
    if (prevProps.orderDeleted !== this.props.orderDeleted && this.props.orderDeleted) this.props.navigation.navigate('recordingList');
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
    return true;
  }

  _onClick = () => {
    const {reserved, rnumb_id, date, serv_id} = this.state;
    if (!reserved) {
      this.props.saveOrder({rnumb_id, date, serv_id});
    } else {
      this.props.deleteOrder({rnumb_id});
    }
  }

  _save = () => {
    this.setState({modalVisible: false, hideButton: true});
    this.props.navigation.navigate('recordingList');
  }

  shareLink = () => {
    const {doc, date, pdf} = this.state;

    const shareOptions = {
      title: doc,
      subject: date,
      url: pdf,
      social: Share.Social.EMAIL
    };
    Share.shareSingle(shareOptions);
  }

  renderShare() {
    const { t } = this.props;

    return (
      <View style={{paddingLeft: '15%'}}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{paddingVertical: 5, marginTop: 10}}
          onPress={()=>this.shareLink()}
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

  render() {
    const { t } = this.props;
    const { reserved, modalVisible, hideButton, date, time, room, doctor, spec, serv, price } = this.state;

    return (
      <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
        <Header text={ t('recordings:item.title') } navigation = {this.props.navigation}/>
        <HeaderBottom text={(reserved) ? "" : t('recordings:item.check_info')} />
        <Content style={{marginTop: -10, zIndex: 1, paddingTop: 10}} padder>
          <View style={styles.itemWrap}>
            <Text style={styles.txtHead}>{ t('recordings:item.make_appointment')}:</Text>
            <View style={styles.wrapName}>
              <Text style={styles.txtName}>{doctor}</Text>
              <Text style={styles.txtSubname}>{spec}</Text>
            </View>
          </View>
          <View style={styles.itemWrap}>
            <Text style={styles.txtHead}>{ t('recordings:item.selected_service')}:</Text>
            <View style={styles.wrapName}>
              <Text style={styles.txtName}>{serv}</Text>
              <Text style={styles.txtSubname}>{price}</Text>
            </View>
          </View>
          <View style={styles.itemWrap}>
            <Text style={styles.txtHead}>{ t('recordings:item.date_time') }:</Text>
            <View style={styles.wrapName}>
              <Text style={styles.txtName}>{date}</Text>
              <Text style={styles.txtSubname}>{time}</Text>
            </View>
          </View>
          <View style={styles.itemWrap}>
            <Text style={styles.txtHead}>{ t('recordings:item.room') }:</Text>
            <View style={styles.wrapName}>
              <Text style={styles.txtName}>№ {room}</Text>
            </View>
          </View>
          {
            (reserved) && this.renderShare()
          }
        </Content >
        {
          (!hideButton) && (
            <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
              <CustomBtn label={(reserved) ? t('common:actions.cancel_recording') :  t('common:actions.confirm')} onClick={()=> this._onClick()}/>
            </View>
          )
        }
        <Popup 
          show={modalVisible} 
          firstText={ t('recordings:item.success').toUpperCase() }
          laberButton={ t('common:actions.ok') } 
          actionButton={this._save}
        />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  itemWrap: {
    paddingHorizontal: 20,
    margin: 5,
  },
  txtHead: {
    color: accentBlue, 
    fontFamily: mainFont,
    fontSize: medium, 
    width: '100%', 
    textAlign: 'center',
    marginBottom: 5
  },
  wrapName: {
    backgroundColor: lightGray, 
    width: '100%', 
    textAlign: 'center', 
    borderRadius: 10, 
    paddingHorizontal: 0, 
    paddingVertical: 10
  },
  txtName: {
    color: black, 
    fontFamily: mainFont,
    fontSize: large, 
    width: '100%', 
    textAlign: 'center'
  },
  txtSubname: {
    color: mediumBlack, 
    fontFamily: mainFont,
    fontSize: main, 
    marginTop: 5,
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
  }
});

function mapStateToProps(state) {
  return {
    orderCreated: state.content.orderCreated,
    orderDeleted: state.content.orderDeleted
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch)
}

export default withNamespaces(['recordings', 'common'])(connect(mapStateToProps, mapDispatchToProps)(ReceptionInfoItemScreen));