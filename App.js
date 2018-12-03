import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { withNamespaces } from 'react-i18next';
import { Root } from "native-base";
import { Provider } from 'react-redux';
import MainStackRouter from './src/routers/MainStackRouter';
import configureStore from './src/store/configureStore';

const store = configureStore();

const WrappedStack = ({ t }) => <MainStackRouter screenProps={{ t }} />;

const ReloadAppOnLanguageChange = withNamespaces('common', {
  bindI18n: 'languageChanged',
  bindStore: false,
})(WrappedStack);

export default class App extends Component {

  componentDidMount() {
    StatusBar.setHidden(true);
  }

  render() {
    return (
      <Root>
        <Provider store={store}>
          <ReloadAppOnLanguageChange />
        </Provider>
      </Root>
    );
  }
}