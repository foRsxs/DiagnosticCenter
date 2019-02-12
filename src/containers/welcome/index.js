import React, { Component } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { Text } from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import { withNamespaces } from 'react-i18next';

import CustomBtn from '../../components/common/CustomBtn';
import styles from './styles';

import { IMAGE_WELCOME_1, IMAGE_WELCOME_2, IMAGE_WELCOME_3 } from '../../styles/images';
import { RED } from '../../styles/constants';

class WelcomeScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		SplashScreen.hide();
	}

	render() {
		const { navigate } = this.props.navigation;
		const { t } = this.props;

		return (
			<ScrollView contentContainerStyle={styles.wrapContainer}>
				<Text style={styles.title}>{t('welcome:enter_app')}</Text>
				<Text style={styles.blueText}>{t('welcome:enter_text')}</Text>
				<Text style={styles.darkText}>1. {t('welcome:enter_text1')} <Text style={styles.textBold}>{t('welcome:enter_text2')}</Text></Text>
				<Image
					style={styles.image1}
					resizeMode='contain'
					source={IMAGE_WELCOME_1}
				/>
				<Text style={styles.darkText}>2. {t('welcome:enter_text3')}  <Text style={styles.textBold}>{t('welcome:enter_text4')}</Text> {t('welcome:enter_text5')} <Text style={styles.textBold}>{t('welcome:enter_text6')}</Text>, {t('welcome:enter_text7')}</Text>
				<Image
					style={styles.image2}
					resizeMode='contain'
					source={IMAGE_WELCOME_2}
				/>
				<Text style={styles.darkText}>{t('welcome:enter_text8')} <Text style={styles.textBold}>"{t('welcome:enter_text9')}"</Text> {t('welcome:enter_text10')}{"\n"}</Text>
				<Text style={styles.darkText}>3. {t('welcome:enter_text11')}</Text>
				<Image
					style={styles.image3}
					resizeMode='contain'
					source={IMAGE_WELCOME_3}
				/>
				<Text style={styles.darkText}>{t('welcome:enter_text12')} <Text style={styles.textBold}>"{t('welcome:enter_text13')}"</Text> {t('welcome:enter_text14')}</Text>
				<Text style={styles.blueText}>{t('welcome:enter_text15')}</Text>
				<View style={styles.button}>
					<CustomBtn label={t('common:actions.continue')} onClick={() => navigate('authorization')} />
				</View>
			</ScrollView>
		)
	}
}

export default withNamespaces(['welcome', 'common'])(WelcomeScreen);
