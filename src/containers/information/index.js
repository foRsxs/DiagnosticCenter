import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, BackHandler, Text, ActivityIndicator } from 'react-native';
import { Container, Content, View } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';
import variables from '../../styles/variables';

const {main} = variables.fSize;

import { BACKGROUND_BLUE, ACCENT_BLUE, BLACK, MAIN_FONT } from '../../styles/constants';

class InfoScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.getListInformation();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.listInformation !== this.props.listInformation) this.setState({loading: false});
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }

  render() {
    const {navigate} = this.props.navigation;
    const { t, listInformation} = this.props;
    const {loading} = this.state;

    return (
      <Container contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
        <Header text={ t('information:title') } navigation={this.props.navigation} />
        <HeaderBottom text={ t('information:sub_title') } />
        <Content style={{ marginTop: -10, zIndex: 1, paddingTop: 10 }} padder contentContainerStyle={(loading)? {flex: 1, justifyContent: 'center'}:{}}>
          {(loading) && <ActivityIndicator size="large" color={ACCENT_BLUE} /> }
          {
            (!loading) && (
              (listInformation && listInformation.length) ? (
                listInformation.map((item)=>(
                  <View style={styles.questionItem} key={item.id}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={()=> navigate({routeName:'informationItem', params: {header_title: item.title, post_id: item.id }, key: item.id})} >
                      <Text style={styles.questionItemText}>{item.title}</Text>
                    </TouchableOpacity>
                  </View>
                ))
              ) : ( <Text>{ t('information:no_information_text') }</Text> )
            )
            
          }
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  questionItem: {
    borderRadius: 10,
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: BACKGROUND_BLUE,
    marginBottom: 10,
    padding: 10,
    position: 'relative'
  },
  questionItemText: {
    fontSize: main,
    fontFamily: MAIN_FONT,
    color: BLACK,
    textAlign: 'left',
    width: '100%'
  },
});

function mapStateToProps(state) {
  return {
    listInformation: state.content.listInformation.list,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch);
}

export default withNamespaces('information')(connect(mapStateToProps, mapDispatchToProps)(InfoScreen));
