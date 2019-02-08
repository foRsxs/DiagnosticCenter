import React, { Component } from 'react';
import { BackHandler, ActivityIndicator, Text, StyleSheet, View } from 'react-native';
import { Container, Content } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import AnalizesItem from '../../components/analizes/AnalizesItem'
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';

import { ACCENT_BLUE } from '../../styles/constants';

class HistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      shareLoading: false
    };
  }

  componentDidMount() {
    this.props.getHistory({type:'list'});
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.history_list !== this.props.history_list) this.setState({loading: false});
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
    return true;
  }

  render() {
    const { t, history_list } = this.props;
    const {loading, shareLoading} = this.state;

    return (
      <Container contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
        <Header text={t('history:title')} navigation={this.props.navigation} />
        <HeaderBottom text={ (history_list && history_list.length) ? t('history:total_text') + ` - ${history_list.length}`: '' } />
        {(shareLoading) && (<View style={styles.loaderWrap}>
          <ActivityIndicator size="large" color={ACCENT_BLUE} />
        </View>)}
        <Content padder style={{ marginTop: -10, zIndex: 1, paddingTop: 10 }} contentContainerStyle={(loading)? {flex: 1, justifyContent: 'center'}:{}}>
          {(loading) && <ActivityIndicator size="large" color={ACCENT_BLUE} /> }
          {
            (!loading) && (
              (history_list && history_list.length)? (
                history_list.map((item, index) => (
                  <AnalizesItem
                    key={index}
                    headTxt={item.text} 
                    dateTxt={item.dat}
                    pdf={item.pdf}
                    isLoading={(value)=> this.setState({shareLoading: value})}
                    onPress={() => {
                      this.props.navigation.navigate({
                        routeName: "historyItem", 
                        key: index, 
                        params: {
                          keyid: item.keyid, 
                          p_type: item.p_type, 
                          pdf: item.pdf,
                          headTxt: item.text,
                          dateTxt: item.dat
                        }
                      });
                    }}
                  />
                ))
              ) : 
              ( <Text>{ t('history:no_histories_text') }</Text> )
            )
          }
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  loaderWrap: {
    zIndex: 10,
    position: 'absolute', 
    top: 0, 
    left: 0, 
    width: '100%', 
    height: '100%', 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})

function mapStateToProps(state) {
  return {
    history_list: state.content.history.list,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch);
}

export default withNamespaces('history')(connect(mapStateToProps, mapDispatchToProps)(HistoryScreen));
