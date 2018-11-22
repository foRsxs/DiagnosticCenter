import React, {Component} from 'react';
import {Alert, StyleSheet, BackHandler} from 'react-native';
import {Container, Content, View} from 'native-base';
import i18n from '../../i18n';
import ServiceItem from '../../components/services/ServiceItem';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';


class ServicesScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      spec_id: (props.navigation.state.params)? props.navigation.state.params.spec_id: null,
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

  handleChange = (value) => {
    this.setState({inputValue: value})
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <View style={ styles.mainContainer }>
          <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
              <Header text="УСЛУГИ" navigation = {this.props.navigation}/>
              <HeaderBottom search={true} sortBtn={false} onChange={this.handleChange}/>
              <Content style={{marginTop: -10, zIndex: 1, paddingTop: 10}} padder>
                <ServiceItem onClick={() => navigate("subservices")} headTxt='Вакцинация'/>
              </Content >
          </Container>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    opacity: 1,
    height: '100%'
  },
});

export default ServicesScreen;
