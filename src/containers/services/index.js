import React, {Component} from 'react';
import {Alert, StyleSheet, BackHandler} from 'react-native';
import {Container, Content, View} from 'native-base';
import i18n from '../../i18n';
import ServiceItem from '../../components/services/ServiceItem';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';
import SortList from '../../components/common/sortList/SortList';


class ServicesScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSortList: false
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

  change = (value) => {
    console.log('text', value)
    this.setState(state => ({showSortList: !state.showSortList}))
  }

  handleChange = (value) => {
    console.log('event', value)
    this.setState({inputValue: value})
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <View style={ this.state.showSortList? styles.opacityContainer :styles.mainContainer }>
          <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
              <Header text="КАТЕГОРИИ УСЛУГ" navigation = {this.props.navigation}/>
              <HeaderBottom search={true} sortBtn={true} onClick={this.change} onChange={this.handleChange}/>
              <Content style={{marginTop: -10, zIndex: 1, paddingTop: 10}} padder>
                <ServiceItem onClick={() => navigate("subservices")} headTxt='Вакцинация'/>
              </Content >
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
