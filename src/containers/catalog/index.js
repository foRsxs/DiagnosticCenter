import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Container, Content, View } from 'native-base';
import i18n from '../../i18n';
import CatalogListItem from '../../components/catalog/CatalogListItem';


class ServicesScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() { }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
        <Content padder style={{paddingVertical: 20 }}>
          <CatalogListItem onClick={() => Alert.alert('click')} imageUri={require('../../../assets/img/man-icon.png')} name="Пародонтозов Иван" position='Стоматолог' category='Высшая категория' experience='10'/>
          <CatalogListItem onClick={() => Alert.alert('click')} imageUri={require('../../../assets/img/man-icon.png')} name="Пародонтозов Иван" position='Стоматолог' category='Высшая категория' experience='10'/>
          <CatalogListItem onClick={() => Alert.alert('click')} imageUri={require('../../../assets/img/man-icon.png')} name="Пародонтозов Иван" position='Стоматолог' category='Высшая категория' experience='1'/>
        </Content >
      </Container>
    )
  }
}

export default ServicesScreen;
