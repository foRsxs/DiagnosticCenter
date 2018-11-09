import React, { Component } from 'react';
import { Alert, StyleSheet, BackHandler } from 'react-native';
import { Container, Content, View, Text } from 'native-base';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';
import variables from '../../styles/variables';
import CustomBtn from '../../components/common/CustomBtn';


class TimeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      times: [
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00',
        '17:30'
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

  render() {
    let {times} = this.state;
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header text="ЗАПИСЬ НА ПРИЁМ" navigation = {this.props.navigation}/>
        <HeaderBottom text="выберите время визита" />
        <Content style={{marginTop: -10, zIndex: 1}}>
          <View style={styles.timeContainer}>
        
          { times.map((item, key)=>(
            <View key={key} style={styles.timeItemWrap}><Text style={styles.timeItemAvaliable}> { item } </Text></View>
            )
          )}

          </View>
          <View style={{paddingVertical: 10, backgroundColor: 'white'}}>
            <View style={styles.itemsWrap}>
              <View style={styles.unSelectedItem}></View>
              <Text style={styles.itemsTxt}>запись доступна</Text>
            </View>
            <View style={styles.itemsWrap}>
              <View style={styles.selectedItem}></View>
              <Text style={styles.itemsTxt}>выбранное время</Text>
            </View>
          </View>
        </Content>
        <View style={{paddingHorizontal: 15, paddingVertical: 20, backgroundColor: 'white'}}>
          <CustomBtn label='ПРОВЕРИТЬ ДАННЫЕ' onClick={()=> navigate('receptionInfo')}/>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  timeContainer: {
    paddingHorizontal: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#eaf3fd',
    paddingTop: 10
  },
  timeItemWrap: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  timeItem: {
    width: 70,
    paddingVertical: 5,
    borderRadius: 10,
    textAlign: 'center',
    marginVertical: 10,
    justifyContent: 'center',
    fontSize: variables.fSize.large,
    fontFamily: variables.fonts.mainFont,
    color: variables.colors.mediumBlack
  },
  timeItemAvaliable: {
    width: 70,
    paddingVertical: 5,
    backgroundColor: variables.colors.backgroundBlue,
    borderColor: variables.colors.wiolet,
    borderRadius: 10,
    borderWidth: 1,
    textAlign: 'center',
    marginVertical: 10,
    justifyContent: 'center',
    fontSize: variables.fSize.large,
    fontFamily: variables.fonts.mainFont,
    color: variables.colors.mediumBlack
  },
  timeItemSelected: {
    width: 70,
    paddingVertical: 5,
    backgroundColor: variables.colors.wiolet,
    borderRadius: 10,
    textAlign: 'center',
    marginVertical: 10,
    justifyContent: 'center',
    fontSize: variables.fSize.large,
    fontFamily: variables.fonts.mainFont,
    color: variables.colors.mediumBlack
  },
  unSelectedItem: {
    marginRight: 10, 
    backgroundColor: variables.colors.backgroundBlue, 
    borderColor: variables.colors.wiolet, 
    width: 10, 
    height: 10, 
    borderRadius: 15, 
    borderWidth: 1
  },
  selectedItem: {
    marginRight: 10, 
    backgroundColor: variables.colors.wiolet, 
    width: 10, 
    height: 10, 
    borderRadius: 15
  },
  itemsWrap: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  itemsTxt: {
    color: variables.colors.lightBlack,
    fontFamily: variables.fonts.mainFont,
    fontSize: variables.fSize.medium
  }
});

export default TimeScreen;
