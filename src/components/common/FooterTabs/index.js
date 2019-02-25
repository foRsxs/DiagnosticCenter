import React, { Component } from 'react';
import { Image } from 'react-native';
import { Footer, FooterTab, Button, Text } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { withNavigation } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AuthActions from '../../../actions/auth';
import * as ContentActions from '../../../actions/content';
import { authAlert } from '../../../utils/helpers';

import styles from './styles';
import {
	ICON_MAIN,
	ICON_MAIN_ACTIVE,
	ICON_DOCTORS,
	ICON_DOCTORS_ACTIVE,
	ICON_POST,
	ICON_POST_ACTIVE,
	ICON_SERVICE,
	ICON_SERVICE_ACTIVE,
	ICON_PROFILE,
	ICON_PROFILE_ACTIVE
} from '../../../styles/images';

class FooterTabs extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
		const { t, navigation, isGuest } = this.props;
		const { routeName } = navigation.state.routes[navigation.state.index];

		return (
			<Footer style={styles.container}>
				<FooterTab style={[{ backgroundColor: 'white' }]}>
					<Button 
						transparent
						style={styles.button}
						onPress={() => navigation.navigate('home')}>
						<Image
							style={styles.icon}
							resizeMode='contain'
							source={(routeName === 'Main') ? ICON_MAIN_ACTIVE : ICON_MAIN}
						/>
						<Text uppercase={false} style={(routeName === 'Main') ? styles.buttonActiveText : styles.buttonText}>{t('footer_menu:home')}</Text>
					</Button>
					<Button 
						transparent
						style={styles.button}
						onPress={() => navigation.navigate('listDoctors')}>
						<Image
							style={styles.icon}
							resizeMode='contain'
							source={(routeName === 'Doctor') ? ICON_DOCTORS_ACTIVE : ICON_DOCTORS}
						/>
						<Text uppercase={false} style={(routeName === 'Doctor') ? styles.buttonActiveText : styles.buttonText}>{t('footer_menu:doctors')}</Text>
					</Button>
					<Button 
						transparent
						style={styles.button}
						onPress={() => { 
							if (isGuest) { 
								this.props.setAuthMessage(t(`common:actions_text.record_text`));
								authAlert(t, navigation);
							} else {
								navigation.navigate('recordingCreate');
							}
						}}
					>
						<Image
							style={styles.icon}
							resizeMode='contain'
							source={(routeName === 'Record') ? ICON_POST_ACTIVE : ICON_POST}
						/>
						<Text uppercase={false} style={(routeName === 'Record') ? styles.buttonActiveText : styles.buttonText}>{t('footer_menu:records')}</Text>
					</Button>
					<Button 
						transparent
						style={styles.button}
						onPress={() => navigation.navigate('services')}>
						<Image
							style={styles.icon}
							resizeMode='contain'
							source={(routeName === 'Service') ? ICON_SERVICE_ACTIVE : ICON_SERVICE}
						/>
						<Text uppercase={false} style={(routeName === 'Service') ? styles.buttonActiveText : styles.buttonText}>{t('footer_menu:services')}</Text>
					</Button>
					<Button 
						transparent
						style={styles.button}
						onPress={() => { 
							if (isGuest) { 
								this.props.setAuthMessage(t(`common:actions_text.profile_text`));
								authAlert(t, navigation);
							} else {
								navigation.navigate('profile');
							}
						}}
					>
						<Image
							style={styles.icon}
							resizeMode='contain'
							source={(routeName === 'Profile') ? ICON_PROFILE_ACTIVE : ICON_PROFILE}
						/>
						<Text uppercase={false} style={(routeName === 'Profile') ? styles.buttonActiveText : styles.buttonText}>{t('footer_menu:profile')}</Text>
					</Button>
				</FooterTab>
			</Footer>
		);
	}
}

function mapStateToProps(state) {
  return {
    isGuest: state.authorization.isGuest,
    user: state.authorization.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...AuthActions, ...ContentActions}, dispatch)
}

export default withNamespaces(['footer_menu', 'common'])(connect(mapStateToProps, mapDispatchToProps)(withNavigation(FooterTabs)));
