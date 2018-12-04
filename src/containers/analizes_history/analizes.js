import React, { Component } from 'react';
import { StyleSheet, BackHandler, ActivityIndicator } from 'react-native';
import { Container, Content } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import variables from '../../styles/variables'
import AnalizesItem from '../../components/analizes/AnalizesItem'
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';

const {blue} = variables.colors;

class AnalizesScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.props.getAnalizes({type:'_list'})
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.analizes_list !== this.props.analizes_list) this.setState({loading: false});
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }

  render() {
    const { t, analizes_list } = this.props;
    const {loading} = this.state;

    return (
      <Container contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
        <Header text={t('analizes:title')} navigation={this.props.navigation} />
        <HeaderBottom text={ (analizes_list && analizes_list.length) ? t('analizes:total_text') + ` - ${analizes_list.length}`: '' } />
        <Content padder style={{ marginTop: -10, zIndex: 1, paddingTop: 10 }}>
          {(loading) && <ActivityIndicator size="small" color={blue} /> }
            {
              (!loading) && (
                (analizes_list && analizes_list.length)? (
                  analizes_list.map((item, index) => (
                    <AnalizesItem
                      key={index}
                      headTxt={item.text} 
                      dateTxt={item.dat_string} 
                      onPress={()=> this.props.navigation.navigate({routeName: "analizesItem", key: index, params: {res_id: item.res_id}})}
                    />
                  ))
                ) : 
                ( <Text>{ t('analizes:no_analizes_text') }</Text> )
              )
            }
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

function mapStateToProps(state) {
  console.log(state.content.analizes)
  return {
    analizes_list: state.content.analizes.list,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch)
}

export default withNamespaces('analizes')(connect(mapStateToProps, mapDispatchToProps)(AnalizesScreen));
