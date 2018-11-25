import React, {Component} from 'react';
import {Alert, StyleSheet, BackHandler, TouchableOpacity, ScrollView} from 'react-native';
import {Container, Content, View, Text} from 'native-base';
import i18n from '../../i18n';
import CustomBtn from '../../components/common/CustomBtn';
import variables from '../../styles/variables';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';
import Popup from '../../components/common/Popup';
import Autocompete from '../../components/common/Autocomplete';

const { accentBlue, lightGray, mediumBlack, black } = variables.colors;
const { mainFont } = variables.fonts;
const { medium, large, main }  = variables.fSize;

class ReceptionInfoScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
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
    const { modalVisible } = this.state;

    return (
      <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
        <Header text={"ЗАПИСЬ НА ПРИЁМ"} navigation = {this.props.navigation}/>
        <HeaderBottom />
        <ScrollView style={{marginTop: -10, zIndex: 1, position: 'relative'}} contentContainerStyle={{ margin: 20, position: 'relative', flexGrow: 1, zIndex: 2}}>
          <View style={[styles.autocompleteContainer, {zIndex: 2}]}>
            <Autocompete contentContainerStyle={{marginBottom: 10}}/>
          </View>
          <View style={[styles.autocompleteContainer, {top: 60}]}>
            <Autocompete contentContainerStyle={{marginBottom: 10}}/>
          </View>
          {/* <Autocompete contentContainerStyle={{marginBottom: 10}}/> */}
        </ScrollView > 
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

export default ReceptionInfoScreen;
