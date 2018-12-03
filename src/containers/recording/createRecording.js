import React, {Component} from 'react';
import {Alert, StyleSheet, BackHandler, TouchableOpacity, ScrollView} from 'react-native';
import {Container, Content, View, Text} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import i18n from '../../i18n';
import * as ContentActions from '../../actions/content';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CustomBtn from '../../components/common/CustomBtn';
import variables from '../../styles/variables';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';
import Popup from '../../components/common/Popup';
import Autocompete from '../../components/common/Autocomplete';
import ButtonDates from '../../components/common/ButtonDates';

const { accentBlue, lightGray, mediumBlack, black } = variables.colors;
const { mainFont } = variables.fonts;
const { medium, large, main }  = variables.fSize;

class ReceptionInfoScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      typeExperiments: [
        {
          id: 1,
          value: 'Консультация',
        },
        {
          id: 2,
          value: 'Исследования'
        }
      ]
    };
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

  _onClick = () => {
  }

  _save = () => {
    this.setState({modalVisible: false});
    this.props.navigation.navigate('recordingList');
  }

  render() {
    const { navigate } = this.props.navigation;
    const { order, orderDatas } = this.props;
    const { modalVisible, typeExperiments} = this.state;
    console.log(order)

    return (
      <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
        <Header text={"ЗАПИСЬ НА ПРИЁМ"} navigation = {this.props.navigation}/>
        <HeaderBottom />
        <KeyboardAwareScrollView style={{marginTop: -10, zIndex: 1, position: 'relative', flex: 1}} contentContainerStyle={{ margin: 20, position: 'relative', flex: 1, zIndex: 2}}>
          <View style={[styles.autocompleteContainer, {zIndex: 6}]}>
            <Autocompete 
              contentContainerStyle={{marginBottom: 10}}
              label="Исследования" 
              data={typeExperiments} 
              onSelect={(value) => this.props.setOrder({type: value}, 'type', 'spec')} 
              selected={order.type} 
              disabled={false}/>
          </View>
          <View style={[styles.autocompleteContainer, {top: 60, zIndex: 5}]}>
            <Autocompete 
              contentContainerStyle={{marginBottom: 10}} 
              label="Выберите специальность" 
              data={orderDatas.specialities} 
              onSelect={(value) => 
                (order.type == 1) ? this.props.setOrder({spec_id: value}, 'spec_id', 'doc') : this.props.setOrder({spec_id: value}, 'spec_id', 'serv')
              } 
              selected={order.spec_id}
              disabled={(order.type && orderDatas.specialities)?false: true}
            />
          </View>
          <View style={[styles.autocompleteContainer, {top: 120, zIndex: 4}]}>
            <Autocompete 
              contentContainerStyle={{marginBottom: 10}} 
              label="Выберите услугу" 
              data={orderDatas.services} 
              onSelect={(value) => this.props.setOrder({servid: value}, 'servid', 'doc')} 
              selected={order.servid}
              disabled={(order.spec_id && order.type == 2 && orderDatas.services)?false: true}/>
          </View>
          <View style={[styles.autocompleteContainer, {top: 180, zIndex: 3}]}>
            <Autocompete 
              contentContainerStyle={{marginBottom: 10}} 
              label="Выберите врача" 
              data={orderDatas.doctors}
              onSelect={(value) => this.props.setOrder({docdep_id: value}, 'docdep_id')}
              selected={order.docdep_id} 
              disabled={((order.type == 1 && order.spec_id && orderDatas.doctors) || (order.type == 2 && order.spec_id && order.servid && orderDatas.doctors))?false: true}/>
          </View>
          <View style={[styles.autocompleteContainer, {top: 240, zIndex: 2}]}>
            <ButtonDates 
              contentContainerStyle={{marginBottom: 10}}
              label="Выберите дату" 
              data={orderDatas.dates} 
              onPress={() => console.log(1)} 
              selected={order.data} 
              disabled={(order.docdep_id)? false: true}/>
          </View>
          <View style={[styles.autocompleteContainer, {top: 300, zIndex: 2}]}>
            <ButtonDates 
              contentContainerStyle={{marginBottom: 10}}
              label="Выберите время" 
              data={orderDatas.times} 
              onPress={() => console.log(1)} 
              selected={order.data} 
              disabled={(order.docdep_id && order.data)? false: true}/>
          </View>
        </KeyboardAwareScrollView > 
        <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
          <CustomBtn label={'ПРОВЕРИТЬ ДАННЫЕ'} onClick={()=> this._onClick()}/>
        </View>
        <Popup 
          show={modalVisible} 
          firstText={'запись к врачу успешно создана!'.toUpperCase()}
          laberButton={'ок'} 
          actionButton={this._save}
        />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  }
});


function mapStateToProps(state) {
  return {
    order: state.content.order,
    orderDatas: state.content.orderDatas
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceptionInfoScreen)
