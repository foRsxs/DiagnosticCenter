import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { Container, Content } from 'native-base';
import i18n from '../../i18n';

import AnalizesItem from '../../components/analizes/AnalizesItem'
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';

class HistoryScreen extends Component {

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
    return (
      <Container contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
        <Header text="История болезни" navigation={this.props.navigation} />
        <HeaderBottom text="Всего записей - 8" />
        <Content padder style={{ marginTop: -10, zIndex: 1, paddingTop: 10 }}>
          <AnalizesItem headTxt='Терапевт' dateTxt='17.06.2018' onPress={()=> this.props.navigation.navigate('historyItem')}/>
          <AnalizesItem headTxt='Терапевт' dateTxt='17.06.2018' onPress={()=> this.props.navigation.navigate('historyItem')}/>
          <AnalizesItem headTxt='Терапевт' dateTxt='17.06.2018' onPress={()=> this.props.navigation.navigate('historyItem')}/>
          <AnalizesItem headTxt='Терапевт' dateTxt='17.06.2018' onPress={()=> this.props.navigation.navigate('historyItem')}/>
        </Content >
      </Container>
    )
  }
}

export default HistoryScreen;
