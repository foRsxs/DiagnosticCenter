import React, {Component} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Container, Content, View} from 'native-base';
import i18n from '../../i18n';
import ServiceItem from '../../components/services/ServiceItem';


class ServicesScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
          <Content padder>
            <ServiceItem onClick={() => navigate("subservices")} headTxt='Вакцинация'/>
          </Content >
      </Container>
    )
  }
}

const styles = StyleSheet.create({
});

export default ServicesScreen;
