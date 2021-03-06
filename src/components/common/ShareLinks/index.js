import React, { Component } from 'react';
import { Platform, Alert, View, Text, TouchableOpacity, Image, PermissionsAndroid, ActivityIndicator } from 'react-native';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import { withNamespaces } from 'react-i18next';

import styles from './styles';
import { ACCENT_BLUE } from '../../../styles/constants';
import { PICTURE_ICON, MAIL_ICON } from '../../../styles/images';

class ShareLinks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
		}
	}

	async requestFilePermission(url, title, text, save) {
		const { t } = this.props;

		if (!url || !title) return;

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
					(save) ? this.saveFile(url, title) : this.sharePDF(url, title, text);
				} else {
					this.setState({ loading: false });
					Alert.alert(t('common:files.action_decline'));
				}
			} else {
				(save) ? this.saveFile(url, title) : this.sharePDF(url, title, text);
			}
		} catch (err) {
			console.warn(err)
		}
	}

	saveFile = (url, title) => {
		const { t } = this.props;
		const { config, fs } = RNFetchBlob;
		const FileDir = (Platform.OS === 'android') ? fs.dirs.DownloadDir : fs.dirs.DocumentDir;

		const configOptions = {
			fileCache: true,
			path: `${FileDir}/${title}.pdf`
		};

		config(configOptions)
			.fetch('GET', url)
			.then((resp) => {
				this.setState({ loading: false });
				if (Platform.OS === 'ios') {
					RNFetchBlob.ios.previewDocument(resp.path())
				} else {
					Alert.alert(t('common:files.action_success'));
				}
			})
			.catch(() => {
				this.setState({ loading: false });
				Alert.alert(t('common:files.action_error'));
			});
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
				this.setState({ loading: false });
				let options = {
					type: 'application/pdf',
					title: `${title} ${text}`,
					subject: text,
					url: (Platform.OS === 'android') ? 'file://' + filePath : filePath,
					social: Share.Social.EMAIL
				};
				await Share.open(options);
			})
			.catch((e) => {
				this.setState({ loading: false });
			})
	}

	render() {
		const { t, url, title, text } = this.props;
		const { loading } = this.state;

		return (
			(!!loading ? (
				<ActivityIndicator size="small" color={ACCENT_BLUE} style={{ marginVertical: 30 }} />
			) : (
					<View style={{ paddingLeft: '15%', paddingBottom: 20 }}>
						<TouchableOpacity
							activeOpacity={0.8}
							style={styles.topLink}
							onPress={() => {
								this.setState({ loading: true });
								this.requestFilePermission(url, title, text, false);
							}}
						>
							<View style={styles.actionsWrap}>
								<Image
									style={styles.actionsImg}
									resizeMode='contain'
									source={MAIL_ICON}
								/>
								<Text style={styles.linkText}>{t('common:actions.send_to_mail')}</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.8}
							style={styles.bottomLink}
							onPress={() => {
								this.setState({ loading: true });
								this.requestFilePermission(url, title, text, true);
							}}
						>
							<View style={styles.actionsWrap}>
								<Image
									style={styles.actionsImg}
									resizeMode='contain'
									source={PICTURE_ICON}
								/>
								<Text style={styles.linkText}>{t('common:actions.save_to_gallery')}</Text>
							</View>
						</TouchableOpacity>
					</View>
				))
		)
	}
}

export default withNamespaces('common')(ShareLinks);