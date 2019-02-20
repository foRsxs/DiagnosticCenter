import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { Root } from 'native-base';
import { NetInfo, } from 'react-native';
import { Provider } from 'react-redux';
import { offlineActionTypes } from 'react-native-offline';
import OneSignal from 'react-native-onesignal';

import MainStackRouter from './src/routers/MainStackRouter';
import configureStore from './src/store/configureStore';
import { ONE_SIGNAL_KEY } from './src/config';

const WrappedStack = ({ t }) => <MainStackRouter screenProps={{ t }} />;

const ReloadAppOnLanguageChange = withNamespaces('common', {
  bindI18n: 'languageChanged',
  bindStore: false,
})(WrappedStack);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({ isLoading: false })),
    };
    OneSignal.init(ONE_SIGNAL_KEY);
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionChange);
  }

  componentWillUnmount = () => {
    NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionChange);

  };


  _handleConnectionChange = (isConnected) => {
    this.state.store.dispatch({
      type: offlineActionTypes.CONNECTION_CHANGE,
      payload: isConnected,
    });
  }

  render() {
    if (this.state.isLoading) return null;

    return (
      <Root>
        <Provider store={this.state.store}>
          <ReloadAppOnLanguageChange/>
        </Provider>
      </Root>
    );
  }
}