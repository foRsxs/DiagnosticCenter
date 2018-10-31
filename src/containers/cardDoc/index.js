import React, {Component} from 'react';
import {Alert, StyleSheet, Image, Dimensions} from 'react-native';
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

  componentDidMount() {}

  render() {
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
            <Text style={{fontSize: variables.fSize.main}}>Высшая категория | Общий стаж: 7 лет</Text>
          </View>
        </View>
        <Content style={{marginTop: height/3.3+80}}>
          <View style={{paddingHorizontal: 30, backgroundColor: 'white'}}>
            <View style={{position: 'relative', marginBottom: 10}}>
              <View style={styles.listIcon}></View>
              <Text>имплантация зубов: (более 1600 успешных имплантаций)</Text>
            </View>
            <View style={{position: 'relative', marginBottom: 10}}>
              <View style={styles.listIcon}></View>
              <Text>имплантация зубов: (более 1600 успешных имплантаций)</Text>
            </View>
            <View style={{position: 'relative', marginBottom: 10}}>
              <View style={styles.listIcon}></View>
              <Text>имплантация зубов: (более 1600 успешных имплантаций)</Text>
            </View>
          </View>
        </Content >
        <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
          <CustomBtn label='ЗАПИСЬ НА ПРИЁМ' onClick={()=>{Alert.alert('ok')}}/>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  imageWrap: {
    width: width,
    height: height/3.3,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: height/9,
    left: 0,
    zIndex: 10
  },
  docIcon: {
    width: width/1.2,
    height: height/3.5,
  },
  docInfoWrap: {
    position: 'absolute',
    top: height/9,
    left: 0,
    width: width,
    height: height/3.3+120,
    paddingTop: height/4,
    paddingHorizontal: 30,
    backgroundColor: variables.colors.backgroundBlue,
    paddingBottom: 10,
    justifyContent: 'flex-end'
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
    color: variables.colors.mediumBlack
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
