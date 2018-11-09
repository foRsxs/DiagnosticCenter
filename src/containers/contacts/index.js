import React, {Component} from 'react';
import {Alert, StyleSheet, TouchableOpacity, Image, Linking, BackHandler} from 'react-native';
import {Container, Content, View, Text} from 'native-base';
import i18n from '../../i18n';
import variables from '../../styles/variables';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';

class ContactsScreen extends Component {

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
    return (
      <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
          <Header text="КОНТАКТЫ" navigation = {this.props.navigation}/>
          <HeaderBottom />
          <Content padder style={{marginTop: -10, zIndex: 1, paddingTop: 10}}>
            <View style={styles.contactItem}>
              <Text style={styles.headTxt}>Адрес:</Text>
              <Text style={styles.subHeadTxt}>Казахстан, 160021, г. Шымкент, ул. Байтурсынова 68а</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.headTxt}>Телефоны:</Text>
              <Text style={styles.subHeadTxt}>Call-центр</Text>
              <Text style={styles.linkTxt} onPress={()=> Linking.openURL('tel:+87252367186')}>8 (7252) 36-71-86, 36-71-32</Text>
              <Text style={styles.subHeadTxt}>Приёмная главного врача</Text>
              <Text style={styles.linkTxt} onPress={()=> Linking.openURL('tel:+87252367184')}>8 (7252) 36-71-84</Text>
              <Text style={styles.subHeadTxt}>Заместитель главного врача</Text>
              <Text style={styles.linkTxt} onPress={()=> Linking.openURL('tel:+87252367192')}>8 (7252) 36-71-92</Text>
              <Text style={styles.subHeadTxt}>Телефон доверия</Text>
              <Text style={styles.linkTxt} onPress={()=> Linking.openURL('tel:+8725395456')}>8 (7252) 39-54-56</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.headTxt}>Электронная почта:</Text>
              <Text style={styles.linkTxt} onPress={()=> Linking.openURL('mailto:mail@diagnostika.kz')}>mail@diagnostika.kz</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.headTxt}>Социальные сети:</Text>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <TouchableOpacity style={{marginRight: 15}} onPress={()=> Linking.openURL('https://www.facebook.com/')}>
                  <Image source={require('../../../assets/img/instagram.png')} style={{width: 40, height: 40}} resizeMode='contain'></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> Linking.openURL('https://www.facebook.com/')}>
                  <Image source={require('../../../assets/img/facebook.png')} style={{width: 40, height: 40}} resizeMode='contain'></Image>
                </TouchableOpacity>
              </View>
            </View>
          </Content >
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  contactItem: {
    marginBottom: 15,
  },
  headTxt: {
    fontSize: variables.fSize.large, 
    fontFamily: variables.fonts.mainFont,
    color: variables.colors.mediumBlack, 
    width: '100%', 
    textAlign: 'left',
  },
  subHeadTxt: {
    fontSize: variables.fSize.main, 
    fontFamily: variables.fonts.mainFont,
    color: variables.colors.lightBlack, 
    width: '100%', 
    textAlign: 'left',
    marginTop: 4
  },
  linkTxt: {
    fontSize: variables.fSize.main, 
    fontFamily: variables.fonts.mainFont,
    color: variables.colors.wiolet, 
    width: '100%', 
    textAlign: 'left',
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: variables.colors.wiolet,
  }
});

export default ContactsScreen;
