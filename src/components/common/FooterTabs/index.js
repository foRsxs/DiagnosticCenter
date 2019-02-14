import React, { Component } from 'react';
import { Image } from 'react-native';
import { Footer, FooterTab, Button, Text } from 'native-base';
import { withNamespaces } from 'react-i18next';
import styles from './styles';
import { withNavigation } from 'react-navigation';

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
		const { t, navigation } = this.props;
		const { key } = navigation.state;

		return (
			<Footer style={styles.container}>
				<FooterTab style={[{ backgroundColor: 'white' }]}>
					<Button transparent
						style={styles.button}
						onPress={() => navigation.navigate('home')}>
						<Image
							style={styles.icon}
							resizeMode='contain'
							source={(key === 'Main') ? ICON_MAIN_ACTIVE : ICON_MAIN}
						/>
						<Text uppercase={false} style={(key === 'Main') ? styles.buttonActiveText : styles.buttonText}>{t('footer_menu:home')}</Text>
					</Button>
					<Button transparent
						style={styles.button}
						onPress={() => navigation.navigate('listDoctors')}>
						<Image
							style={styles.icon}
							resizeMode='contain'
							source={(key === 'Doctor') ? ICON_DOCTORS_ACTIVE : ICON_DOCTORS}
						/>
						<Text uppercase={false} style={(key === 'Doctor') ? styles.buttonActiveText : styles.buttonText}>{t('footer_menu:doctors')}</Text>
					</Button>
					<Button transparent
						style={styles.button}
						onPress={() => navigation.navigate('doctorsList')}>
						<Image
							style={styles.icon}
							resizeMode='contain'
							source={(key === 'Record') ? ICON_POST_ACTIVE : ICON_POST}
						/>
						<Text uppercase={false} style={(key === 'Record') ? styles.buttonActiveText : styles.buttonText}>{t('footer_menu:records')}</Text>
					</Button>
					<Button transparent
						style={styles.button}
						onPress={() => navigation.navigate('specialization')}>
						<Image
							style={styles.icon}
							resizeMode='contain'
							source={(key === 'Service') ? ICON_SERVICE_ACTIVE : ICON_SERVICE}
						/>
						<Text uppercase={false} style={(key === 'Service') ? styles.buttonActiveText : styles.buttonText}>{t('footer_menu:services')}</Text>
					</Button>
					<Button transparent
						style={styles.button}
						onPress={() => navigation.navigate('profile')}>
						<Image
							style={styles.icon}
							resizeMode='contain'
							source={(key === 'Profile') ? ICON_PROFILE_ACTIVE : ICON_PROFILE}
						/>
						<Text uppercase={false} style={(key === 'Profile') ? styles.buttonActiveText : styles.buttonText}>{t('footer_menu:profile')}</Text>
					</Button>
				</FooterTab>
			</Footer>
		);
	}
}

export default withNamespaces('footer_menu')(withNavigation(FooterTabs));
