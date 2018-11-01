import React, { Component } from 'react';
import { Alert, StyleSheet, BackHandler, ScrollView } from 'react-native';
import { Container, Content, View } from 'native-base';
import i18n from '../../i18n';
import CatalogItem from '../../components/catalog/CatalogItem';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';
import SortList from '../../components/common/sortList/SortList';


class ServicesScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSortList: false,
      horizontalView: true
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

  togle = (value) => {
    console.log('togle', value)
    this.setState({horizontalView: value})
  }

  change = (value) => {
    console.log('text', value)
    this.setState(state => ({showSortList: !state.showSortList}))
  }

  handleChange = (value) => {
    console.log('event', value)
    this.setState({inputValue: value})
}

  render() {
    let {horizontalView} = this.state;
    const { navigate } = this.props.navigation;
    return (
      <View>
        <View style={ this.state.showSortList? styles.opacityContainer :styles.mainContainer }>
          <Container style={horizontalView?styles.horizontalWrap:styles.verticalWrap}>
            <Header text="КАТАЛОГ ВРАЧЕЙ" navigation = {this.props.navigation}/>
            <HeaderBottom katalogDoctor={true} search={true} onClick={this.change} togleClick={this.togle} onChange={this.handleChange}/>
            {
              horizontalView? (
                <Content style={{marginTop: -10, zIndex: 1, paddingTop: 10}} padder>
                  <CatalogItem horizontalView={horizontalView} onClick={() => navigate('cardDoc')} imageUri={require('../../../assets/img/man-icon.png')} name="Пародонтозов Иван" position='Стоматолог' category='Высшая категория' experience='10'/>
                  <CatalogItem horizontalView={horizontalView} onClick={() => navigate('cardDoc')} imageUri={require('../../../assets/img/man-icon.png')} name="Пародонтозов Иван" position='Стоматолог' category='Высшая категория' experience='1'/>
                  <CatalogItem horizontalView={horizontalView} onClick={() => navigate('cardDoc')} imageUri={require('../../../assets/img/man-icon.png')} name="Пародонтозов Иван" position='Стоматолог' category='Высшая категория' experience='10'/>
                  <CatalogItem horizontalView={horizontalView} onClick={() => navigate('cardDoc')} imageUri={require('../../../assets/img/man-icon.png')} name="Пародонтозов Иван" position='Стоматолог' category='Высшая категория' experience='1'/>
                  <CatalogItem horizontalView={horizontalView} onClick={() => navigate('cardDoc')} imageUri={require('../../../assets/img/man-icon.png')} name="Пародонтозов Иван" position='Стоматолог' category='Высшая категория' experience='10'/>
                  <CatalogItem horizontalView={horizontalView} onClick={() => navigate('cardDoc')} imageUri={require('../../../assets/img/man-icon.png')} name="Пародонтозов Иван" position='Стоматолог' category='Высшая категория' experience='1'/>
                  <CatalogItem horizontalView={horizontalView} onClick={() => navigate('cardDoc')} imageUri={require('../../../assets/img/man-icon.png')} name="Пародонтозов Иван" position='Стоматолог' category='Высшая категория' experience='10'/>
                </Content>
              ) : (
                <ScrollView>
                  <View style={{width: '100%', flexWrap: 'wrap', flexDirection: 'row', paddingVertical: 10}}>
                    <View style={styles.wrap}>
                      <CatalogItem horizontalView={horizontalView} onClick={() => navigate('cardDoc')} imageUri={require('../../../assets/img/man-icon.png')} name="Пародонтозов Иван" position='Стоматолог' category='Высшая категория' experience='10'/>
                    </View>
                    <View style={styles.wrap}>
                      <CatalogItem horizontalView={horizontalView} onClick={() => navigate('cardDoc')} imageUri={require('../../../assets/img/man-icon.png')} name="Пародонтозов Иван" position='Стоматолог' category='Высшая категория' experience='10'/>
                    </View>
                    <View style={styles.wrap}>
                      <CatalogItem horizontalView={horizontalView} onClick={() => navigate('cardDoc')} imageUri={require('../../../assets/img/man-icon.png')} name="Пародонтозов Иван" position='Стоматолог' category='Высшая категория' experience='10'/>
                    </View>
                    <View style={styles.wrap}>
                      <CatalogItem horizontalView={horizontalView} onClick={() => navigate('cardDoc')} imageUri={require('../../../assets/img/man-icon.png')} name="Пародонтозов Иван" position='Стоматолог' category='Высшая категория' experience='10'/>
                    </View>
                    <View style={styles.wrap}>
                      <CatalogItem horizontalView={horizontalView} onClick={() => navigate('cardDoc')} imageUri={require('../../../assets/img/man-icon.png')} name="Пародонтозов Иван" position='Стоматолог' category='Высшая категория' experience='10'/>
                    </View>
                    <View style={styles.wrap}>
                      <CatalogItem horizontalView={horizontalView} onClick={() => navigate('cardDoc')} imageUri={require('../../../assets/img/man-icon.png')} name="Пародонтозов Иван" position='Стоматолог' category='Высшая категория' experience='10'/>
                    </View>
                    <View style={styles.wrap}>
                      <CatalogItem horizontalView={horizontalView} onClick={() => navigate('cardDoc')} imageUri={require('../../../assets/img/man-icon.png')} name="Пародонтозов Иван" position='Стоматолог' category='Высшая категория' experience='10'/>
                    </View>
                  </View>
                </ScrollView>
              )
            }
          </Container>
        </View>
          {
              (this.state.showSortList)?
              <SortList onClick={this.change}/>: null
          }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    width: '50%', 
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  horizontalWrap: {
    //paddingHorizontal: 10,
    //paddingVertical: 20,
  },
  verticalWrap: {
    // paddingHorizontal: 5,
    //paddingVertical: 20,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // height: '100%'
  },
  mainContainer: {
    opacity: 1,
    height: '100%'
  },
  opacityContainer: {
    opacity: 0.1,
    height: '100%'
  }
});

export default ServicesScreen;
