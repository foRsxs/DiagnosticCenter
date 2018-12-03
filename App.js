import React, {Component} from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import { Root } from "native-base";
import { Provider } from 'react-redux';
import MainStackRouter from './src/routers/MainStackRouter';
import configureStore from './src/store/configureStore';
import RNLanguages from 'react-native-languages';
import i18n from './src/i18n';

const store = configureStore();

export default class App extends Component {

  componentDidMount() {
    RNLanguages.addEventListener('change', this._onLanguagesChange);
    StatusBar.setHidden(true);
  }

  componentWillUnmount() {
    RNLanguages.removeEventListener('change', this._onLanguagesChange);
  }

  _onLanguagesChange = ({ language }) => {
    i18n.locale = language;
  };

  render() {
    return (
      <Root>
        <Provider store={store}>
          <MainStackRouter />
        </Provider>
      </Root>
    );
  }
}

const styles = StyleSheet.create({});