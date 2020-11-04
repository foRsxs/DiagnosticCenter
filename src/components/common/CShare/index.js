import React, { Component } from 'react';
import { Platform, TouchableOpacity, Image, PermissionsAndroid } from 'react-native';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import { withNamespaces } from 'react-i18next';

import styles from './styles';
import { ICON_MORE } from '../../../styles/images';

class СShare extends Component {
	constructor(props) {
		super(props);
	}

	async requestFilePermission(url, title, text, save) {
		const { t, isLoading } = this.props;

		if (!url && !title) return;

		try {
			if (Platform.OS === 'android') {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
					{
						'title': t('common:files.action_title'),
						'message': t('common:files.action_message')
					}
				);

				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					this.sharePDF(url, title, text);
				} else {
					isLoading(false);
					Alert.alert(t('common:files.action_decline'));
				}

			} else {
				this.sharePDF(url, title, text);
			}
		} catch (err) {
			console.warn(err)
		}
	}

	sharePDF(url, title, text) {

		let filePath = null;
		const { config, fs } = RNFetchBlob;
		const FileDir = (Platform.OS === 'android') ? fs.dirs.DownloadDir : fs.dirs.DocumentDir;
		const configOptions = {
			fileCache: true,
			path: `${FileDir}/${title}.pdf`
		};

		config(configOptions)
			.fetch('GET', url)
			.then(async resp => {
				filePath = resp.path();
				this.props.isLoading(false);
				let options = {
					type: 'application/pdf',
					title: `${title} ${text}`,
					subject: text,
					url: (Platform.OS === 'android') ? 'file://' + filePath : filePath
				};
				await Share.open(options);
			})
			.catch((e) => {
				this.props.isLoading(false);
			})
	}

	render() {
		const { url, title, text, isLoading } = this.props;

		return (
			<TouchableOpacity
				onPress={() => {
					isLoading(true);
					this.requestFilePermission(url, title, text, false);
				}}
				activeOpacity={0.8}
				style={styles.moreIcon}>
				<Image
					style={styles.icon}
					resizeMode='contain'
					source={ICON_MORE}
				/>
			</TouchableOpacity>
		)
	}
}

export default withNamespaces('common')(СShare);