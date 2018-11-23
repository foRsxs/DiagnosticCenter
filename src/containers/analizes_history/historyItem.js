import React, { Component } from 'react';
import { BackHandler, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Container, Content } from 'native-base';
import i18n from '../../i18n';

import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';
import variables from '../../styles/variables';

const { lightGray, mediumBlack, black } = variables.colors;
const { mainFont } = variables.fonts;
const { large, main } = variables.fSize;

class HistoryItemScreen extends Component {

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

  renderShare() {
    return (
      <View style={{paddingLeft: '15%', paddingBottom: 10}}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{paddingVertical: 5, marginTop: 10}}
        >
          <View style={{justifyContent: 'flex-start', flexDirection: 'row'}}>
            <Image
              style={{width: 20, height: 15, marginRight: 10}}
              resizeMode='cover'
              source={require('../../../assets/img/mail-icon.png')}
            />
            <Text style={{color: black, fontFamily: mainFont, fontSize: large}}>Отправить на e-mail</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{paddingVertical: 5, marginTop: 5}}
        >
          <View style={{justifyContent: 'flex-start', flexDirection: 'row'}}>
            <Image
              style={{width: 20, height: 15, marginRight: 10}}
              resizeMode='cover'
              source={require('../../../assets/img/picture-icon.png')}
            />
            <Text style={{color: black, fontFamily: mainFont, fontSize: large}}>Сохранить в галерею</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <Container contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
        <Header text="История болезни" navigation={this.props.navigation} />
        <HeaderBottom text="подробная информация" />
        <Content padder style={{ marginTop: -10, zIndex: 1, paddingTop: 10 }}>
          <View style={styles.wrapName}>
            <Text style={styles.txtName}>Терапевт</Text>
            <Text style={styles.txtSubname}>17.06.2018</Text>
          </View>
          <Text style={{padding: 15}}>
          Плановое Амбулаторный 
          Врач : Серманизова Гульжан Кипшакбаевна
          Результаты исследования :
          Шаым (Жалобы) жалоб нет. Ауру анамнезі (Анамнез заболевания) уронефрологический анамнез не отягощен, наблюдается по беременности. Anamnesis vitae (Анамнез жизни) Росла и развивалась соответственно возрасту. Наследственность не отягощена. Вирусный гепатит, туберкулез, кож-вен заболевание- отрицает. За последние 6 месяцев трансфузии крови и ее компонентов не было. Укус собак, клещей и неизвестных насекомых отрицает.. Аллергологиялық анамнез (Аллергологический анамнез) Не отягощен. 


          </Text>
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
})

export default HistoryItemScreen;
