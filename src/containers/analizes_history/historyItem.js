import React, { Component } from 'react';
import { BackHandler, View } from 'react-native';
import { Container, Content } from 'native-base';
import HTMLView from 'react-native-htmlview';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import Header from '../../components/common/Header';
import ShareLinks from '../../components/common/ShareLinks';

class HistoryItemScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      p_type: (props.navigation.state.params) ? props.navigation.state.params.p_type : null,
      headTxt: (props.navigation.state.params) ? props.navigation.state.params.headTxt : null,
      dateTxt: (props.navigation.state.params) ? props.navigation.state.params.dateTxt : null,
      keyid: (props.navigation.state.params) ? props.navigation.state.params.keyid : null,
      pdf: (props.navigation.state.params) ? props.navigation.state.params.pdf : null,
    };
  }

  componentDidMount() {
    const {p_type, keyid} = this.state;

    this.props.getHistory({type:'html', p_type, vis_id: keyid});
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
    return true;
  }

  staticContent = () => {
    const {history} = this.props;

    return (
      <View style={{ backgroundColor: 'white', padding: 15, marginTop: 10 }}>
        <HTMLView value={history.data} />
      </View>
    )
  }

  render() {
    const { t, history } = this.props;
    const { pdf, headTxt, dateTxt } = this.state;

    return (
      <Container contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
        <Header text={t('history:title')} navigation={this.props.navigation} />
        <Content padder style={{ marginTop: -10, zIndex: 1, paddingTop: 10 }}>
          {history && this.staticContent()}
        </Content>
        <ShareLinks url={pdf} title={headTxt} text={dateTxt} />
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    history: state.content.history.current,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch);
}

export default withNamespaces(['history', 'common'])(connect(mapStateToProps, mapDispatchToProps)(HistoryItemScreen));
