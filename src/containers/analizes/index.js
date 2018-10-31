import React, {Component} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Container, Content, View, Text} from 'native-base';
import i18n from '../../i18n';
import variables from '../../styles/variables'
import AnalizesItem from '../../components/analizes/AnalizesItem'
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';

class AnalizesScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
          <Header text="МОИ АНАЛИЗЫ" navigation = {this.props.navigation}/>
          <HeaderBottom text="у вас 2 новых отчета" />
          <Content padder>
            <Text style={styles.analizeTitle}>новые результаты анализов</Text>
            <AnalizesItem headTxt='Клинический анализ крови' dateTxt='17.06.2018'/>
            <AnalizesItem headTxt='Клинический анализ крови' dateTxt='17.06.2018'/>
            <Text style={styles.analizeTitle}>архивные результаты анализов</Text>
            <AnalizesItem headTxt='Клинический анализ крови' dateTxt='17.06.2018'/>
            <AnalizesItem headTxt='Клинический анализ крови' dateTxt='17.06.2018'/>
            <AnalizesItem headTxt='Клинический анализ крови' dateTxt='17.06.2018'/>
          </Content >
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  analizeTitle: {
    color: variables.colors.blue, 
    fontSize: variables.fSize.medium, 
    width: '100%', 
    textAlign: 'center', 
    marginBottom: 10
  }
});

export default AnalizesScreen;
