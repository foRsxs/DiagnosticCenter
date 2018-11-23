import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, BackHandler, Text } from 'react-native';
import { Container, Content, View } from 'native-base';
import i18n from '../../i18n';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';
import variables from '../../styles/variables';

const {backgroundBlue, black} = variables.colors;
const {mainFont} = variables.fonts;
const {main} = variables.fSize;

class InfoScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
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

  render() {
    const {navigate} = this.props.navigation;

    return (
      <Container contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
        <Header text="ИНФОРМАЦИЯ" navigation={this.props.navigation} />
        <HeaderBottom text={'к сведению пациента'} />
        <Content style={{ marginTop: -10, zIndex: 1, paddingTop: 10 }} padder>
          <View style={styles.questionItem}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={()=> navigate('informationItem', {header_title: 'ИНФОРМАЦИЯ'})} >
              <Text style={styles.questionItemText}>Приказ УЗ г. Шымкент</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.questionItem}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={()=> navigate('informationItem', {header_title: 'ИНФОРМАЦИЯ'})} >
              <Text style={styles.questionItemText}>Приказ УЗ г. Шымкент</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.questionItem}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={()=> navigate('informationItem', {header_title: 'ИНФОРМАЦИЯ'})} >
              <Text style={styles.questionItemText}>Приказ УЗ г. Шымкент</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.questionItem}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={()=> navigate('informationItem', {header_title: 'ИНФОРМАЦИЯ'})} >
              <Text style={styles.questionItemText}>Приказ УЗ г. Шымкент</Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  questionItem: {
    borderRadius: 10,
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: backgroundBlue,
    marginBottom: 10,
    padding: 10,
    position: 'relative'
  },
  questionItemText: {
    fontSize: main,
    fontFamily: mainFont,
    color: black,
    textAlign: 'left',
    width: '100%'
  },
});

export default InfoScreen;
