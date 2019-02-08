import React, { Component } from 'react';
import { BackHandler, StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Container, Content } from 'native-base';
import { Table, Row } from 'react-native-table-component';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';
import ShareLinks from '../../components/common/ShareLinks';

import { LIGHT_GRAY, ACCENT_BLUE, MAIN_FONT } from '../../styles/constants';

class AnalizesItemScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      res_id: (props.navigation.state.params) ? props.navigation.state.params.res_id : null,
      headTxt: (props.navigation.state.params) ? props.navigation.state.params.headTxt : null, 
      dateTxt: (props.navigation.state.params) ? props.navigation.state.params.dateTxt : null,
      pdf: (props.navigation.state.params) ? props.navigation.state.params.pdf : null,
      date: (props.navigation.state.params) ? props.navigation.state.params.date : '',
      tableHead: [
        props.t('analizes:table_text_first'), 
        props.t('analizes:table_text_second'), 
        props.t('analizes:table_text_third'), 
        props.t('analizes:table_text_fourth')
      ],
      widthArr: [50, 300, 150, 150],
      loading: true
    };
  }

  componentDidMount() {
    const { res_id } = this.state;

    this.props.getAnalizes({res_id});
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.analizes !== this.props.analizes) this.setState({loading: false});
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
    return true;
  }

  renderTable() {
    const {analizes, t} = this.props;
    const state = this.state;
    const tableData = [];

    for (let i = 0; i < analizes.length; i += 1) {
      const rowData = [];

      for (let j = 0; j < 4; j += 1) {
        (j === 0) ? rowData.push(`${(analizes[i].DIST) ? analizes[i].DIST: ''}`) 
        : (j === 1) ? rowData.push(`${analizes[i].MEASUR}`) 
        : (j === 2) ? rowData.push(`${analizes[i].TEXT} ${(analizes[i].UNIT)? analizes[i].UNIT: ''}`) 
        : rowData.push(`${analizes[i].NORM}`);
      }

      tableData.push(rowData);
    }

    return (
      <View style={styles.container}>
        <View style={{width: '100%', flexDirection: 'row', marginBottom: 20}}>
          <View style={{width: '50%'}}>
            <Text style={[styles.textTop, {color: ACCENT_BLUE}]}>{`${t('analizes:text_material')}: ${(analizes[0])? analizes[0].MATERIALID: ''}`}</Text>
            <Text style={styles.textTop}>{t('analizes:text_date_start')}:</Text>
          </View>
          <View style={{width: '50%'}}>
            <Text style={[styles.textTop, {color: ACCENT_BLUE}]}>{`IDS: ${(analizes[0])? analizes[0].IDS: ''}`}</Text>
            <Text style={styles.textTop}>{state.date}</Text>
          </View>
        </View>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderColor: '#C1C0B9'}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={[styles.text, {fontWeight: 'bold'}]}/>
            </Table>
            <Table borderStyle={{borderColor: '#C1C0B9'}}>
              {
                tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={state.widthArr}
                    style={styles.row}
                    textStyle={styles.text}
                  />
                ))
              }
            </Table>
          </View>
        </ScrollView>
      </View>
    )
  }
  render() {
    const { t } = this.props;
    const { loading, pdf, headTxt, dateTxt } = this.state;
    
    return (
      <Container contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
        <Header text={t('analizes:title')} navigation={this.props.navigation} />
        <HeaderBottom text={t('analizes:sub_title')} />
        <Content padder style={{ marginTop: -10, zIndex: 1, paddingTop: 10 }} contentContainerStyle={(loading) ? {flex: 1, justifyContent: 'center'} : {}}>
          {loading ? <ActivityIndicator size="large" color={ACCENT_BLUE} /> : this.renderTable()}
        </Content>
        <ShareLinks url={pdf} title={headTxt} text={dateTxt} />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 30, 
    backgroundColor: '#fff' 
  },
  header: { 
    height: 50, 
    backgroundColor: LIGHT_GRAY
  },
  text: { 
    textAlign: 'center', 
    fontWeight: '100', 
    fontFamily: MAIN_FONT 
  },
  dataWrapper: { 
    marginTop: -1 
  },
  row: { 
    height: 40, 
    backgroundColor: '#fff' 
  }
});

function mapStateToProps(state) {
  return {
    analizes: state.content.analizes.current,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch);
}

export default withNamespaces(['analizes', 'common'])(connect(mapStateToProps, mapDispatchToProps)(AnalizesItemScreen));
