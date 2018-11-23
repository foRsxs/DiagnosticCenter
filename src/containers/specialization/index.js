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
import variebles from '../../styles/variables';

const {black, blue} = variebles.colors;

class SpecializationScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      showSpecType: true,
      arrayIcons: [
        {
          uri: require('../../../assets/img/specialization/allergist-icon.png'),
          key: 1
        },
        {
          uri: require('../../../assets/img/specialization/anesthetist-icon.png'),
          key: 2
        },
        {
          uri: require('../../../assets/img/specialization/angiograph_surgeon-icon.png'),
          key: 3
        },
        {
          uri: require('../../../assets/img/specialization/cardiologist-icon.png'),
          key: 4
        },
        {
          uri: require('../../../assets/img/specialization/child_cardiorheumatologist-icon.png'),
          key: 5
        },
        {
          uri: require('../../../assets/img/specialization/child_neurologist-icon.png'),
          key: 6
        },
        {
          uri: require('../../../assets/img/specialization/dentist-icon.png'),
          key: 6
        },
        {
          uri: require('../../../assets/img/specialization/dermatologist-icon.png'),
          ky: 7
        },
        {
          uri: require('../../../assets/img/specialization/dermatovenereologist-icon.png'),
          key: 8
        },
        {
          uri: require('../../../assets/img/specialization/doctor_of_ultrasound_diagnostics-icon.png'),
          key: 9
        },
        {
          uri: require('../../../assets/img/specialization/endocrinologist-icon.png'),
          key: 10
        },
        {
          uri: require('../../../assets/img/specialization/endoscopist-icon.png'),
          key: 11
        },
        {
          uri: require('../../../assets/img/specialization/gastroenterologist-icon.png'),
          key: 12
        },
        {
          uri: require('../../../assets/img/specialization/gynecologist-icon.png'),
          key: 13
        },
        {
          uri: require('../../../assets/img/specialization/hematologist-icon.png'),
          key: 14
        },
        {
          uri: require('../../../assets/img/specialization/kt-icon.png'),
          key: 15
        },
        {
          uri: require('../../../assets/img/specialization/laboratory_doctor-icon.png'),
          key: 16
        },
        {
          uri: require('../../../assets/img/specialization/mammalian-icon.png'),
          key: 17
        },
        {
          uri: require('../../../assets/img/specialization/manager_oed-icon.png'),
          key: 18
        },
        {
          uri: require('../../../assets/img/specialization/mrt-icon.png'),
          key: 19
        },
        {
          uri: require('../../../assets/img/specialization/neurologist-icon.png'),
          key: 20
        },
        {
          uri: require('../../../assets/img/specialization/neuropathist-icon.png'),
          key: 21
        },
        {
          uri: require('../../../assets/img/specialization/ophthalmologist-icon.png'),
          key: 22
        },
        {
          uri: require('../../../assets/img/specialization/otolaryngologist-icon.png'),
          key: 23
        },
        {
          uri: require('../../../assets/img/specialization/pediatrician-icon.png'),
          key: 24
        },
        {
          uri: require('../../../assets/img/specialization/physician_of_functional_diagnostics-icon.png'),
          key: 25
        },
        {
          uri: require('../../../assets/img/specialization/physiotherapist-icon.png'),
          key: 26
        },
        {
          uri: require('../../../assets/img/specialization/proctologist-icon.png'),
          key: 27
        },
        {
          uri: require('../../../assets/img/specialization/pulmonologist-icon.png'),
          key: 28
        },
        {
          uri: require('../../../assets/img/specialization/radiologist-icon.png'),
          key: 29
        },
        {
          uri: require('../../../assets/img/specialization/rheumatologist-icon.png'),
          key: 30
        },
        {
          uri: require('../../../assets/img/specialization/surgeon-icon.png'),
          key: 31
        },
        {
          uri: require('../../../assets/img/specialization/therapist-icon.png'),
          key: 32
        },
        {
          uri: require('../../../assets/img/specialization/traumatologist-icon.png'),
          key: 33
        },
        {
          uri: require('../../../assets/img/specialization/traumatologist-orthopedist-icon.png'),
          key: 34
        },
        {
          uri: require('../../../assets/img/specialization/urologist-icon.png'),
          key: 35
        }
      ]
    };
  }

  change = (value) => {
    this.setState(state => ({modalVisible: false}))
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
    if(this.state.modalVisible){
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

  call = () => {
    this.setState({modalVisible: false});
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
    const {showSpecType, modalVisible} = this.state;
    const {list_specialization} = this.props;

    return (
      <View>
        <View style={ styles.mainContainer }>
          <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
            <Header text="КАТЕГОРИИ УСЛУГ" navigation = {this.props.navigation}/>
            <HeaderBottom search={true} onChange={this.handleChange}/>
            <Content style={{marginTop: -10, zIndex: 1, paddingTop: 10}} padder>
              {(list_specialization.length)? (
                list_specialization.map((item) => (
                  <SpecializationItem key={item.res_id} onClick={() => this.props.navigation.navigate('home',{spec_id: item.res_id})} headTxt={item.res_text} subTxt={i18n.t('SpecSubTerapevt')} imageUri={require('../../../assets/img/specialization/urologist-icon.png')}/>
                ))
              ): <ActivityIndicator size="small" color={blue} /> } 
            </Content >
            <LinkBtn label={i18n.t('BtnLinkDontKnowDoc')} onClick={()=> this.setState({modalVisible: true})}/>
            <Popup 
              show={modalVisible}
              firstText={'Вы не знаете к какому врачу обратиться?'}
              secondText={'Позвоните в call center вас обязательно проконсультируют'}
              laberButton={'Позвонить'}
              actionButton={this.call}
              labelLink={'закрыть'}
              actionLink={()=> this.setState({modalVisible: false})}
              />
          </Container>
        </View>
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