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
import {APP_IMG_URL} from '../../config';

const {black, blue} = variebles.colors;

class SpecializationScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
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
    if (!this.props.list_specialization) this.props.getListSpecialization(1);
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

  call = () => {
    this.setState({modalVisible: false});
  }

  render() {
    const {modalVisible} = this.state;
    const {list_specialization} = this.props;

    return (
      <View>
        <View style={ styles.mainContainer }>
          <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
            <Header text="КАТЕГОРИИ УСЛУГ" navigation = {this.props.navigation}/>
            <HeaderBottom search={true} onChange={this.handleChange}/>
            <Content style={{marginTop: -10, zIndex: 1, paddingTop: 10}} padder>
              {(list_specialization && list_specialization.length)? (
                list_specialization.map((item) => (
                  <SpecializationItem 
                    key={item.spec_id} 
                    onClick={() => this.props.navigation.navigate({routeName:'listDoctors', params: {spec_id: item.spec_id}, key: item.spec_id })} 
                    headTxt={item.spec_name} 
                    imageUri={`${APP_IMG_URL}/icons/${item.spec_id}.png`}/>
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