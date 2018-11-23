import React, { Component } from 'react';
import { ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity, BackHandler } from 'react-native';
import { Container, Content, View, Text } from 'native-base';
import i18n from '../../i18n';
import * as ContentActions from '../../actions/content';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import variables from '../../styles/variables';
import CustomBtn from '../../components/common/CustomBtn';
import Rating from '../../components/common/Rating';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';

let { width, height } = Dimensions.get('window');
const { accentBlue, darkBlue, darkGray, backgroundBlue } = variables.colors;

class DoctorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyid: (props.navigation.state.params) ? props.navigation.state.params.keyid : null,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.props.getDoctor(this.state.keyid)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ justifyContent: 'space-between', flexDirection: 'column', height: '100%', backgroundColor: 'white'}}>
        <Header text="КАРТОЧКА ВРАЧА" navigation={this.props.navigation} />
        <HeaderBottom />
        <View style={styles.imageWrap}>
          <Image
            style={styles.docIcon}
            resizeMode='cover'
            source={require('../../../assets/img/man-icon.png')}
          />
        </View>
        <ScrollView  contentContainerStyle={{justifyContent: 'space-between', flexGrow: 1}}>
          <View style={styles.docInfoWrap}>
            <View style={styles.docInfo}>
              <View style={styles.docInfoBlock}>
                <View style={{ width: '100%', paddingRight: 115 }}>
                  <Text style={styles.headTxt}>Пародонтозов Иван</Text>
                  <Text style={styles.subHeadTxt}>стоматолог</Text>
                </View>
                <View style={{ width: 100, position: 'absolute', right: 0, top: 0 }}>
                  <TouchableOpacity onPress={() => navigate('questions')} style={styles.blockQuestion}>
                    <Text uppercase={false} style={{ fontSize: 13, fontFamily: variables.fonts.mainFont, color: darkBlue, }}>ЗАДАТЬ ВОПРОС</Text>
                    <Image
                      style={{ width: 25, height: 25 }}
                      resizeMode='cover'
                      source={require('../../../assets/img/conversation.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: 5, }}>
                <Text style={{ fontSize: variables.fSize.main, fontFamily: variables.fonts.mainFont, color: darkGray }}>Высшая категория |</Text>
                <Text style={{ fontSize: variables.fSize.main, fontFamily: variables.fonts.mainFont, color: darkGray }}> Общий стаж: 7 лет</Text>
              </View>
            </View>
            <View style={{ paddingTop: 10, backgroundColor: 'white'  }}>
              <View style={{ position: 'relative', marginBottom: 10 }}>
                <View style={styles.listIcon}></View>
                <Text style={{ fontSize: variables.fSize.main, fontFamily: variables.fonts.mainFont, color: variables.colors.mediumBlack }}>имплантация зубов: (более 1600 успешных имплантаций)</Text>
              </View>
              <View style={{ position: 'relative', marginBottom: 10 }}>
                <View style={styles.listIcon}></View>
                <Text style={{ fontSize: variables.fSize.main, fontFamily: variables.fonts.mainFont, color: variables.colors.mediumBlack }}>имплантация зубов: (более 1600 успешных имплантаций)</Text>
              </View>
              <View style={{ position: 'relative', marginBottom: 10 }}>
                <View style={styles.listIcon}></View>
                <Text style={{ fontSize: variables.fSize.main, fontFamily: variables.fonts.mainFont, color: variables.colors.mediumBlack }}>имплантация зубов: (более 1600 успешных имплантаций)</Text>
              </View>
              <View style={{ position: 'relative', marginBottom: 10 }}>
                <View style={styles.listIcon}></View>
                <Text style={{ fontSize: variables.fSize.main, fontFamily: variables.fonts.mainFont, color: variables.colors.mediumBlack }}>имплантация зубов: (более 1600 успешных имплантаций)</Text>
              </View>
              <View style={{ position: 'relative', marginBottom: 10 }}>
                <View style={styles.listIcon}></View>
                <Text style={{ fontSize: variables.fSize.main, fontFamily: variables.fonts.mainFont, color: variables.colors.mediumBlack }}>имплантация зубов: (более 1600 успешных имплантаций)</Text>
              </View>
            </View>
          </View>
          <View style={{ paddingHorizontal: 15, paddingVertical: 20, backgroundColor: 'white' }}>
            <CustomBtn label='ЗАПИСЬ НА ПРИЁМ' onClick={() => navigate('receptions')} />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imageWrap: {
    width: width - 80,
    marginHorizontal: 40,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    left: 0,
    zIndex: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  docIcon: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  docInfoWrap: {
    width: '100%',
    paddingTop: 130,
    paddingHorizontal: 20,
    paddingBottom: 10,
    justifyContent: 'flex-end',
    marginTop: -20,
    width: '100%',
  },
  docInfo: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    
  },
  docInfoBlock: {
    width: '100%',
    position: 'relative',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headTxt: {
    fontFamily: variables.fonts.mainFont,
    fontSize: variables.fSize.extralarge,
    color: variables.colors.mediumBlack,
    lineHeight: 24
  },
  subHeadTxt: {
    fontFamily: variables.fonts.mainFont,
    fontSize: variables.fSize.medium,
    color: variables.colors.blue,
    marginVertical: 5
  },
  ratingWrap: {
    position: 'absolute',
    width: 100,
    height: '100%',
    top: 5,
    right: 0
  },
  listIcon: {
    backgroundColor: variables.colors.blue,
    width: 4,
    height: 4,
    borderRadius: 3,
    position: 'absolute',
    top: 10,
    left: -10
  },
  blockQuestion: {
    flexDirection: 'row',
    padding: 7,
    paddingBottom: 5,
    justifyContent: 'space-between',
    borderColor: accentBlue,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 3
  }
});

function mapStateToProps(state) {
  return {
    doctor: state.content.doctorData,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorScreen)
