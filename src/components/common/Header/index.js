import React, { Component } from 'react';
import { StatusBar, View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { Icon } from 'native-base';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import styles from './style'

import { BAR_COLOR } from '../../../styles/constants';

import { 
	ICON_OFTEN_QUESTION,
	ICON_LOGO,
	ICON_PHONE,
	ICON_SEARCH
} from '../../../styles/images';

class Header extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { backButton = false, search = false, text, isHome = false, textUpper = false, callButton = false, t } = this.props;

		return (
			<View style={styles.headerWrap}>
				<View style={styles.container}>
					<StatusBar backgroundColor={BAR_COLOR} barStyle='light-content' />
					{
						(isHome) && (
							<View style={styles.headerHomeWrap}>
								<View style={styles.leftContainer}>
									<TouchableOpacity style={styles.headerLeftBtn} onPress={() => alert('press')}>
										<Image style={styles.headerIcon} resizeMode='contain' source={ICON_OFTEN_QUESTION} />
										<Text style={styles.headerLeftText}>{t('header_links:questions')}</Text>
									</TouchableOpacity>
								</View>
								<View style={styles.centerContainer}>
									<Image style={styles.logo} resizeMode='contain' source={ICON_LOGO} />
								</View>
								<View style={styles.rightContainer}>
									<TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }} onPress={() => alert('press')}>
										<Text style={styles.headerRightText}>{t('header_links:callcenter')}</Text>
										<Image style={styles.headerIcon} resizeMode='contain' source={ICON_PHONE} />
									</TouchableOpacity>
								</View>
							</View>
						)
					}
					{
						(backButton) && (
							<TouchableOpacity onPress={() => this.props.navigation.goBack(null)} activeOpacity={0.6} style={styles.btnBack} >
								<Icon ios='ios-arrow-back' android="ios-arrow-back" style={{ color: 'white', paddingLeft: 5, width: 30, height: 30 }} />
							</TouchableOpacity>
						)
					}
					{
						(search) && (
							<View style={styles.inputContainer}>
								<Image style={styles.searchIcon} resizeMode='contain' source={ICON_SEARCH} />
								<TextInput style={[styles.input]} placeholder='' onChangeText={(text) => onChangeSearch(text)} />
							</View>
						)
					}
					{
						(text) && (
							<View style={styles.textContainer} >
								<Text style={styles.text}>{text}</Text>
							</View>
						)
					}
					{
						(textUpper) && (
							<View style={{ flex: 5 }} >
								<Text style={styles.textUpper}>{textUpper.toUpperCase()}</Text>
							</View>
						)
					}
					{
						(callButton) && (
							<View style={styles.headerRight} >
								<TouchableOpacity onPress={() => alert('press')}>
									<Image style={styles.headerIcon} resizeMode='contain' source={ICON_PHONE} />
								</TouchableOpacity>
							</View>
						)
					}
				</View>
				<View style={styles.ovalWrap}>
					<View style={styles.oval} />
				</View>
			</View>
		)
	}
}

Header.propTypes = {
	backButton: PropTypes.bool,
	search: PropTypes.bool,
	isHome: PropTypes.bool,
	textUpper: PropTypes.bool,
	callButton: PropTypes.bool,
	text: PropTypes.string
};

export default withNamespaces('header_links')(Header);