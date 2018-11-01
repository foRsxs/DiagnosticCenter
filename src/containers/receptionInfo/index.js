import React, {Component} from 'react';
import {Alert, StyleSheet, BackHandler} from 'react-native';
import {Container, Content, View, Text} from 'native-base';
import i18n from '../../i18n';
import CustomBtn from '../../components/common/CustomBtn';
import variables from '../../styles/variables';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';


class ReceptionInfoScreen extends Component {

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
          <Header text="ЗАПИСЬ НА ПРИЁМ" navigation = {this.props.navigation}/>
          <HeaderBottom text="проверьте информацию" />
          <Content style={{marginTop: -10, zIndex: 1, paddingTop: 10}} padder>
            <View style={styles.itemWrap}>
              <Text style={styles.txtHead}>вы записываетесь на прием:</Text>
              <View style={styles.wrapName}>
                <Text style={styles.txtName}>Пародонтозов Иван</Text>
                <Text style={styles.txtSubname}>стоматолог</Text>
              </View>
            </View>
            <View style={styles.itemWrap}>
              <Text style={styles.txtHead}>вы записываетесь на прием:</Text>
              <View style={styles.wrapName}>
                <Text style={styles.txtName}>Пародонтозов Иван</Text>
                <Text style={styles.txtSubname}>стоматолог</Text>
              </View>
            </View>
            <View style={styles.itemWrap}>
              <Text style={styles.txtHead}>вы записываетесь на прием:</Text>
              <View style={styles.wrapName}>
                <Text style={styles.txtName}>Пародонтозов Иван</Text>
                <Text style={styles.txtSubname}>стоматолог</Text>
              </View>
            </View>
            <View style={styles.itemWrap}>
              <Text style={styles.txtHead}>вы записываетесь на прием:</Text>
              <View style={styles.wrapName}>
                <Text style={styles.txtName}>Пародонтозов Иван</Text>
                <Text style={styles.txtSubname}>стоматолог</Text>
              </View>
            </View>
            <Text style={styles.nameCab}>кабинет № 307</Text>
          </Content >
          <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
            <CustomBtn label='ПОДТВЕРДИТЬ' onClick={()=>navigate('receptionList')}/>
          </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  itemWrap: {
    paddingHorizontal: 40,
    marginBottom: 10
  },
  txtHead: {
    color: variables.colors.wiolet, 
    fontSize: variables.fSize.medium, 
    width: '100%', 
    textAlign: 'center'
  },
  wrapName: {
    backgroundColor: variables.colors.gray, 
    width: '100%', 
    textAlign: 'center', 
    borderRadius: 10, 
    paddingHorizontal: 20, 
    paddingVertical: 5
  },
  txtName: {
    color: variables.colors.mediumBlack, 
    fontSize: variables.fSize.large, 
    width: '100%', 
    textAlign: 'center'
  },
  txtSubname: {
    color: variables.colors.lightBlack, 
    fontSize: variables.fSize.main, 
    width: '100%', 
    textAlign: 'center'
  },
  nameCab: {
    color: variables.colors.mediumBlack, 
    fontSize: variables.fSize.large, 
    width: '100%', 
    textAlign: 'center'
  }
});

export default ReceptionInfoScreen;
