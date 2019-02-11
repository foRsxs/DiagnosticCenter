import React, { Component } from 'react';
import { Image } from 'react-native';
import { Footer, FooterTab, Button, Text } from 'native-base';
import { withNamespaces } from 'react-i18next';
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
		const { t } = this.props;

		return (
			<Footer style={styles.container}>
				<FooterTab style={[{ backgroundColor: 'white' }]}>
					<Button transparent
						style={styles.button}
						onPress={() => alert('press')}>
						<Image
							style={styles.icon}
							resizeMode='contain'
							source={ICON_MAIN}
						/>
						<Text uppercase={false} style={styles.buttonText}>{t('footer_menu:home')}</Text>
					</Button>
					<Button transparent
						style={styles.button}
						onPress={() => alert('press')}>
						<Image
							style={styles.icon}
							resizeMode='contain'
							source={ICON_DOCTORS}
						/>
						<Text uppercase={false} style={styles.buttonText}>{t('footer_menu:doctors')}</Text>
					</Button>
					<Button transparent
						style={styles.button}
						onPress={() => alert('press')}>
						<Image
							style={styles.icon}
							resizeMode='contain'
							source={ICON_POST}
						/>
						<Text uppercase={false} style={styles.buttonText}>{t('footer_menu:records')}</Text>
					</Button>
					<Button transparent
						style={styles.button}
						onPress={() => alert('press')}>
						<Image
							style={styles.icon}
							resizeMode='contain'
							source={ICON_SERVICE}
						/>
						<Text uppercase={false} style={styles.buttonText}>{t('footer_menu:services')}</Text>
					</Button>
					<Button transparent
						style={styles.button}
						onPress={() => alert('press')}>
						<Image
							style={styles.icon}
							resizeMode='contain'
							source={ICON_PROFILE}
						/>
						<Text uppercase={false} style={styles.buttonText}>{t('footer_menu:profile')}</Text>
					</Button>
				</FooterTab>
			</Footer>
		);
	}
}

export default withNamespaces('footer_menu')(FooterTabs);
