import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import { Provider } from 'react-redux';
import MainStackRouter from './src/routers/MainStackRouter';
import configureStore from './src/store/configureStore';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainStackRouter />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({});