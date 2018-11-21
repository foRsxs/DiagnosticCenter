import React, {Component} from 'react';
import {Alert, StyleSheet, BackHandler, ActivityIndicator} from 'react-native';
import {Container, Content, View, Text, List, ListItem} from 'native-base';
import * as ContentActions from '../../actions/content';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import i18n from '../../i18n';
import LinkBtn from '../../components/common/LinkBtn';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';
import SpecializationItem from '../../components/specialization/SpecializationItem';
import Popup from '../../components/common/Popup';
import SortList from '../../components/common/sortList/SortList';
import variebles from '../../styles/variables';

const {black, blue} = variebles.colors;

class SpecializationScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      showSortList: false,
      showSpecType: true
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible, showSortList: false});
  }

  change = (value) => {
    this.setState(state => ({showSortList: !state.showSortList, modalVisible: false}))
  }

  handleChange = (value) => {
    this.setState({inputValue: value})
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    if(this.state.showSortList){
      this.setState({showSortList: false})
    } else if(this.state.modalVisible){
      this.setState({modalVisible: false})
    } else {
      this.props.navigation.goBack();
    }
    return true;
  }

  _saveType = (type) => {
    if (type === 1) {
      this.props.navigation.navigate('listDoctors');
    } else {
      this.props.getListSpecialization(type);
      this.setState({showSpecType: false})
    }
    
  }

  renderChooseBlock() {
    return (
      <View style={styles.chooseWrap}>
        <Content style={styles.chooseContent}>
          <List>
            <ListItem style={{marginLeft: 0, justifyContent: 'center'}} onPress={()=>this._saveType(1)}>
              <Text style={styles.chooseText}>КОНСУЛЬТАЦИЯ</Text>
            </ListItem>
            <ListItem style={{marginLeft: 0, justifyContent: 'center'}} onPress={()=>this._saveType(2)}>
              <Text style={styles.chooseText}>ИССЛЕДОВАНИЯ</Text>
            </ListItem>
          </List>
        </Content>
      </View>
    )
  }

  render() {
    const {showSpecType, showSortList, modalVisible} = this.state;
    const {list_specialization} = this.props;

    return (
      <View>
        <View style={ showSortList? styles.opacityContainer :styles.mainContainer }>
          <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
            <Header text="КАТЕГОРИИ УСЛУГ" navigation = {this.props.navigation}/>
            <HeaderBottom search={true} onChange={this.handleChange}/>
            <Content style={{marginTop: -10, zIndex: 1, paddingTop: 10}} padder>
              {(list_specialization.length)? (
                list_specialization.map((item) => (
                  <SpecializationItem key={item.res_id} onClick={() => this.props.navigation.navigate('services',{spec_id: item.res_id})} headTxt={item.res_text} subTxt={i18n.t('SpecSubTerapevt')} imageUri={require('../../../assets/img/spec-terapevt.png')}/>
                ))
              ): <ActivityIndicator size="small" color={blue} /> } 
            </Content >
            <LinkBtn label={i18n.t('BtnLinkDontKnowDoc')} onClick={()=> {this.setModalVisible(true)}}/>
            <Popup show={modalVisible}/>
          </Container>
        </View>
          {(showSortList) && <SortList onClick={this.change}/>}
          {(showSpecType) && this.renderChooseBlock()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    opacity: 1,
    height: '100%'
  },
  opacityContainer: {
    opacity: 0.1,
    height: '100%'
  },
  chooseWrap: {
    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)'
  },
  chooseContent: {
    position: 'absolute', bottom: 0, zIndex: 3, backgroundColor: 'white', width: '100%', borderRadius: 5
  },
  chooseText: {
    textAlign: 'center', color: black
  }
});

function mapStateToProps(state) {
  return {
    list_specialization: state.content.ListSpecialization,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecializationScreen)

// <SpecializationItem
//               lizationItem onClick={() => Alert.alert('go')} headTxt={i18n.t('SpecHeadTerapevt')} subTxt={i18n.t('SpecSubTerapevt')} imageUri={require('../../../assets/img/spec-terapevt.png')}/>
//               <SpecializationItem
//               lizationItem onClick={() => Alert.alert('go')} headTxt={i18n.t('SpecHeadPediatr')} subTxt={i18n.t('SpecSubPediatr')} imageUri={require('../../../assets/img/spec-pediatr.png')}/>
//               <SpecializationItem
//               lizationItem onClick={() => Alert.alert('go')} headTxt={i18n.t('SpecHeadDentist')} subTxt={i18n.t('SpecSubDentist')} imageUri={require('../../../assets/img/spec-dentist.png')}/>
//               <SpecializationItem
//               lizationItem onClick={() => Alert.alert('go')} headTxt={i18n.t('SpecHeadDermatolog')} subTxt={i18n.t('SpecSubDermatolog')} imageUri={require('../../../assets/img/spec-derm.png')}/>
//               <SpecializationItem
//               lizationItem onClick={() => Alert.alert('go')} headTxt={i18n.t('SpecHeadKardiolog')} subTxt={i18n.t('SpecSubKardiolog')} imageUri={require('../../../assets/img/spec-kardi.png')}/>
//               <SpecializationItem
//               lizationItem onClick={() => Alert.alert('go')} headTxt={i18n.t('SpecHeadUrolog')} subTxt={i18n.t('SpecSubUrolog')} imageUri={require('../../../assets/img/spec-urolog.png')}/>
//               <SpecializationItem
//               lizationItem onClick={() => Alert.alert('go')} headTxt={i18n.t('SpecHeadGynekolog')} subTxt={i18n.t('SpecSubGynekolog')} imageUri={require('../../../assets/img/spec-ginec.png')}/>
//               <SpecializationItem
//               lizationItem onClick={() => Alert.alert('go')} headTxt={i18n.t('SpecHeadUrolog')} subTxt={i18n.t('SpecSubUrolog')} imageUri={require('../../../assets/img/spec-urolog.png')}/>
//               <SpecializationItem
//               lizationItem onClick={() => Alert.alert('go')} headTxt={i18n.t('SpecHeadGynekolog')} subTxt={i18n.t('SpecSubGynekolog')} imageUri={require('../../../assets/img/spec-ginec.png')}/>
