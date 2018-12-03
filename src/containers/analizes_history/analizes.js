import React, { Component } from 'react';
import { StyleSheet, BackHandler } from 'react-native';
import { Container, Content } from 'native-base';
import { withNamespaces } from 'react-i18next';

import variables from '../../styles/variables'
import AnalizesItem from '../../components/analizes/AnalizesItem'
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';

class AnalizesScreen extends Component {

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
    const { t } = this.props;
    const total = '7';

    return (
      <Container contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
        <Header text={t('analizes:title')} navigation={this.props.navigation} />
        <HeaderBottom text={ t('analizes:total_text') + `- ${total}` } />
        <Content padder style={{ marginTop: -10, zIndex: 1, paddingTop: 10 }}>
          <AnalizesItem headTxt='Клинический анализ крови' dateTxt='17.06.2018' />
          <AnalizesItem headTxt='Клинический анализ крови' dateTxt='17.06.2018' />
          <AnalizesItem headTxt='Клинический анализ крови' dateTxt='17.06.2018' />
          <AnalizesItem headTxt='Клинический анализ крови' dateTxt='17.06.2018' />
          <AnalizesItem headTxt='Клинический анализ крови' dateTxt='17.06.2018' />
          <AnalizesItem headTxt='Клинический анализ крови' dateTxt='17.06.2018' />
          <AnalizesItem headTxt='Клинический анализ крови' dateTxt='17.06.2018' />
          <AnalizesItem headTxt='Клинический анализ крови' dateTxt='17.06.2018' />
          <AnalizesItem headTxt='Клинический анализ крови' dateTxt='17.06.2018' />
          <AnalizesItem headTxt='Клинический анализ крови' dateTxt='17.06.2018' />
          <AnalizesItem headTxt='Клинический анализ крови' dateTxt='17.06.2018' />
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  analizeTitle: {
    color: variables.colors.wiolet,
    fontSize: variables.fSize.medium,
    fontFamily: variables.fonts.mainFont,
    width: '100%',
    textAlign: 'center',
    marginBottom: 10
  }
});

export default withNamespaces('analizes', { wait: true })(AnalizesScreen);
