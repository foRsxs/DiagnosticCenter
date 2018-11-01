import React, {Component} from 'react';
import {Alert, StyleSheet, Image, Dimensions, TouchableOpacity, BackHandler} from 'react-native';
import {Container, Content, View, Text} from 'native-base';
import i18n from '../../i18n';
import variables from '../../styles/variables';
import CustomBtn from '../../components/common/CustomBtn';
import Rating from '../../components/common/Rating';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';

let {width, height} = Dimensions.get('window')

class DoctorScreen extends Component {

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
    const { navigate } = this.props.navigation;
    return (
      <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
        <Header text="КАРТОЧКА ВРАЧА" navigation = {this.props.navigation}/>
        <HeaderBottom />
        <View style={styles.imageWrap}>
          <Image
            style={styles.docIcon}
            resizeMode='cover'
            source={require('../../../assets/img/man-icon.png')}
          />
        </View>
        <View style={styles.docInfoWrap}>
          <View style={styles.docInfo}>
            <View style={styles.docInfoBlock}>
                <Text style={styles.headTxt}>Пародонтозов Иван</Text>
                <Text style={styles.subHeadTxt}>стоматолог</Text>
                <View style={styles.ratingWrap}>
                  <Rating rating={3.5} ratingMinimal={false} ratingDetail={true} like={140} unlike={3}/>
                </View>
            </View>
            <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{fontSize: variables.fSize.main, color: variables.colors.lightBlack}}>Высшая категория {"\n"}Общий стаж: 7 лет</Text>
              <TouchableOpacity onPress={() => navigate('questions')} style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text uppercase={false} style={{fontSize: 12, color: variables.colors.wiolet, width:50, lineHeight: 10}}>задать вопрос врачу</Text>
                <Image
                  style={{width: 25, height: 25}}
                  resizeMode='cover'
                  source={require('../../../assets/img/fuq.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Content style={{}}>
          <View style={{paddingLeft: 30, paddingRight: 20, paddingTop: 10, backgroundColor: 'white'}}>
            <View style={{position: 'relative', marginBottom: 10}}>
              <View style={styles.listIcon}></View>
              <Text style={{fontSize: variables.fSize.main, color: variables.colors.lightBlack}}>имплантация зубов: (более 1600 успешных имплантаций)</Text>
            </View>
            <View style={{position: 'relative', marginBottom: 10}}>
              <View style={styles.listIcon}></View>
              <Text style={{fontSize: variables.fSize.main, color: variables.colors.lightBlack}}>имплантация зубов: (более 1600 успешных имплантаций)</Text>
            </View>
            <View style={{position: 'relative', marginBottom: 10}}>
              <View style={styles.listIcon}></View>
              <Text style={{fontSize: variables.fSize.main, color: variables.colors.lightBlack}}>имплантация зубов: (более 1600 успешных имплантаций)</Text>
            </View>
          </View>
          <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
            <CustomBtn label='ЗАПИСЬ НА ПРИЁМ' onClick={()=>navigate('receptions')}/>
          </View>
        </Content >
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  imageWrap: {
    width: '100%',
    paddingHorizontal: 20,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    left: 0,
    zIndex: 10
  },
  docIcon: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  docInfoWrap: {
    width: '100%',
    paddingTop: 160,
    paddingHorizontal: 20,
    backgroundColor: variables.colors.backgroundBlue,
    paddingBottom: 10,
    justifyContent: 'flex-end',
    marginTop: -10
  },
  docInfo: {
    flexDirection: 'column'
  },
  docInfoBlock: { 
    width: '100%', 
    position: 'relative',
    paddingRight: 100, 
    marginTop: 10
  },
  headTxt: {
    fontSize: variables.fSize.extralarge,
    color: variables.colors.mediumBlack,
    lineHeight: 24
  },
  subHeadTxt: {
    fontSize: variables.fSize.medium,
    color: variables.colors.blue
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
  }
});

export default DoctorScreen;
