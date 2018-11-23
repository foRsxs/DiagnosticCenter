import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, BackHandler, Image } from 'react-native';
import { Container, Content, View, Text} from 'native-base';
import i18n from '../../i18n';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';
import LinkBtn from '../../components/common/LinkBtn';
import variables from '../../styles/variables';

const {black} = variables.colors;
const {mainFont} = variables.fonts;
const {main} = variables.fSize;

class InfoScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      call: (props.navigation.state.params) ? props.navigation.state.params.call : false,
      image: (props.navigation.state.params) ? props.navigation.state.params.image : false,
      header_title: (props.navigation.state.params) ? props.navigation.state.params.header_title : '',
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

  renderImage = () => {
    return (
      <View style={{paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          resizeMode='contain'
          style={styles.iconList}
          source={require('../../../assets/img/slide1.png')}
        />
      </View>
      
    )
  }

  render() {
    const {call, image, header_title} = this.state;
    return (
      <Container contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
        <Header text={header_title} navigation={this.props.navigation} />
        <HeaderBottom/>
        <Content style={(image) ? {marginTop: -50, zIndex: 2}: {marginTop: -10, zIndex: 1}} padder>
          {(image) && this.renderImage()}
          <View >
            <Text style={styles.title}>Приказ Министерства РК</Text>
            <Text style={styles.text}>Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Вдали от всех живут они в буквенных домах на берегу Семантика большого языкового океана. Маленький ручеек ал за пояс и пустился в дорогу. Взобравшись на первую вершину курсивных гор, бросил он последний взгляд назад, на силуэт своего родного города Буквоград,  </Text>
          </View>
        </Content>
        { (call) && <LinkBtn label={'Позвонить в call-центр'} onClick={()=>{}}/>}
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: main,
    fontFamily: mainFont,
    color: black,
    textAlign: 'left',
    width: '100%',
    textAlign: 'justify'
  },
  title: {
    fontSize: main,
    fontFamily: mainFont,
    color: black,
    textAlign: 'center',
    width: '100%',
    marginVertical: 10,
    fontWeight: '600'
  },
  iconList: {
    width: '100%',
    height: 200,
    borderRadius: 8
  },
});

export default InfoScreen;
