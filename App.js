import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { Root } from 'native-base';
import { Alert } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import OneSignal from 'react-native-onesignal';

import { getAppParamsConfig } from './src/actions/content';
import MainStackRouter from './src/routers/MainStackRouter';
import configureStore from './src/store/configureStore';
import { APP_NAME, ONE_SIGNAL_KEY } from './src/config';

const WrappedStack = ({ t }) => <MainStackRouter screenProps={{ t }} />;

const ReloadAppOnLanguageChange = withNamespaces('common', {
	bindI18n: 'languageChanged',
	bindStore: false
})(WrappedStack);

const { store, persistor } = configureStore();

console.reportErrorsAsExceptions = false;
console.disableYellowBox = true;

export default class App extends Component {
	constructor(props) {
		super(props);
		OneSignal.init(ONE_SIGNAL_KEY, { kOSSettingsKeyAutoPrompt: true });
		OneSignal.addEventListener('opened', this._onOpened);
	}

	componentDidMount() {
		store.dispatch(getAppParamsConfig());
	}

	componentWillUnmount = () => {
		OneSignal.removeEventListener('opened', this._onOpened);
	};

	_onOpened(openResult) {
		if (!openResult.notification.isAppInFocus) {
			Alert.alert(APP_NAME, openResult.notification.payload.body);
		}
	}

	render() {
		return (
			<Root>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<ReloadAppOnLanguageChange />
					</PersistGate>
				</Provider>
			</Root>
		);
	}
}
