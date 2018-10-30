import React, { Component } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Container, Content, View } from 'native-base';
import i18n from '../../i18n';
import CatalogItem from '../../components/catalog/CatalogItem';


class ServicesScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() { }

  render() {
    let horizontalView = true;
    const { navigate } = this.props.navigation;
    return (
      <Container style={horizontalView?styles.horizontalWrap:styles.verticalWrap}>
        {
          horizontalView? (
            <Content>
              <CatalogItem horizontalView={horizontalView} onClick={() => navigate('cardDoc')} imageUri={require('../../../assets/img/man-icon.png')} name="Пародонтозов Иван" position='Стоматолог' category='Высшая категория' experience='10'/>
              <CatalogItem horizontalView={horizontalView} onClick={() => Alert.alert('click')} imageUri={require('../../../assets/img/man-icon.png')} name="Пародонтозов Пародонтозов Иван" position='Стоматолог' category='Высшая категория' experience='1'/>
            </Content>
          ) : (
            <View style={styles.wrap}>
              <CatalogItem horizontalView={horizontalView} onClick={() => Alert.alert('click')} imageUri={require('../../../assets/img/man-icon.png')} name="Пародонтозов Иван" position='Стоматолог' category='Высшая категория' experience='10'/>
            </View>
          )
        }
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    width: '50%', 
    paddingHorizontal: 5,
  },
  horizontalWrap: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  verticalWrap: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '100%'
  }
});

export default ServicesScreen;
