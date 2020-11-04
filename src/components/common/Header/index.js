import React, { Component } from 'react';
import { StatusBar, View, Text, TouchableOpacity, Image, TextInput, Linking, Keyboard } from 'react-native';
import { Icon } from 'native-base';
import {NavigationActions} from 'react-navigation';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';

import styles from './style';
import { BAR_COLOR } from '../../../styles/constants';

import {
	ICON_OFTEN_QUESTION,
	ICON_LOGO,
	ICON_PHONE,
	ICON_SEARCH,
	ICON_CANCEL
} from '../../../styles/images';
import { scale } from '../../../styles/variables';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: ''
		}
	}

	render() {
		const { 
			backButton = false, 
			search = false, 
			text, 
			isHome = false, 
			isPin = false, 
			textUpper = false, 
			callButton = false, 
			plusButton = false, 
			callCenterTel, 
			filterButton = false, 
			onFilterPress = () => {}, 
			t
		} = this.props;

		const { searchText } = this.state;
		return (
			<View style={styles.headerWrap}>
				<StatusBar backgroundColor={BAR_COLOR} barStyle='light-content' />
				<View style={styles.container}>
					{
						(!!isHome) && (
							<View style={styles.headerHomeWrap}>
								<View style={styles.leftContainer}>
									<TouchableOpacity style={styles.headerLeftBtn} onPress={() => this.props.navigation.navigate("oftenQuestions")}>
										<Image style={styles.headerIcon} resizeMode='contain' source={ICON_OFTEN_QUESTION} />
										<Text style={styles.headerLeftText}>{t('header_links:questions')}</Text>
									</TouchableOpacity>
								</View>
								<View style={styles.centerContainer}>
									<Image style={styles.logo} resizeMode='contain' source={ICON_LOGO} />
								</View>
								<View style={styles.rightContainer}>
									{(!!callCenterTel) && 
									<TouchableOpacity style={styles.headerRightBtn} onPress={() => Linking.openURL(`tel:${callCenterTel}`)}>
										<Text style={styles.headerRightText}>{t('header_links:callcenter')}</Text>
										<Image style={styles.headerIcon} resizeMode='contain' source={ICON_PHONE} />
									</TouchableOpacity>
									}
								</View>
							</View>
						)
					}
					{
						(!!isPin) && (
							<View style={styles.headerHomeWrap}>
								<View style={styles.leftContainer}></View>
								<View style={styles.centerContainer}>
									<Image style={styles.logo} resizeMode='contain' source={ICON_LOGO} />
								</View>
								<View style={styles.rightContainer}></View>
							</View>
						)
					}
					{
						(!!backButton) && (
							<TouchableOpacity onPress={() => {
								const isNavigateFromPaymentToRecordingItem = this.props.navigation?.state?.params?.isNavigateFromPaymentToRecordingItem;
								if(isNavigateFromPaymentToRecordingItem) {
									// fix bug with navigate from payment
									this.props.navigation.setParams({isNavigateFromPaymentToRecordingItem: false});
									this.props.navigation.reset([
												NavigationActions.navigate({ routeName: 'profile' }),
										 ], 0)
								} else {
									this.props.navigation.goBack(null);
								}
								}} activeOpacity={0.6} style={styles.btnBack} >
								<Icon type="Fontisto" name="angle-left" style={styles.iconHeader} />
							</TouchableOpacity>
						)
					}
					{
						(!!search) && (
							<View style={(backButton) ? styles.inputContainerSearch : styles.inputContainer}>
								<Image style={styles.searchIcon} resizeMode='contain' source={ICON_SEARCH} />
								<TextInput 
									style={[styles.input]} 
									placeholder=''
									value = { searchText }
									onChangeText={(text) => {
										this.setState({ searchText: text });
										this.props.onChangeSearch(text);
									}}
								/>
								{ 
									(!!searchText) &&
										<TouchableOpacity 
											style={styles.cancelContainer} 
											onPress={() =>  {
												this.setState({ searchText: '' });
												this.props.onClearSearch();
												Keyboard.dismiss();
											}}
										>
											<Image style={styles.cancelIcon} resizeMode='contain' source={ICON_CANCEL} />
										</TouchableOpacity>
								}
							</View>
						)
					}
					{
						(!!text) && (
							<View style={styles.textContainer} >
								<Text style={styles.text}>{text}</Text>
							</View>
						)
					}
					{
						(!!textUpper) && (
							<View style={{ flex: 5 }} >
								<Text style={styles.textUpper}>{textUpper.toUpperCase()}</Text>
							</View>
						)
					}
					{
						(!!callButton && !!callCenterTel) && (
							<View style={styles.headerRight} >
								<TouchableOpacity onPress={() => Linking.openURL(`tel:${callCenterTel}`)}>
									<Image style={styles.headerIcon} resizeMode='contain' source={ICON_PHONE} />
								</TouchableOpacity>
							</View>
						)
					}
					{
						(!!plusButton) && (
							<View style={styles.headerRight} >
								<TouchableOpacity onPress={() => this.props.navigation.navigate('recordingCreate')}>
									<Icon type="Fontisto" name="plus-a" style={styles.iconHeader} />
								</TouchableOpacity>
							</View>
						)
					}
					{
						(!!filterButton) && (
							<View style={styles.headerRight} >
								<TouchableOpacity onPress={onFilterPress}>
									<Icon type="Fontisto" name="filter" style={styles.iconHeader} />
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
	isPin: PropTypes.bool,
	callButton: PropTypes.bool,
	plusButton: PropTypes.bool,
	textUpper: PropTypes.string,
	text: PropTypes.string,
	callCenterTel: PropTypes.string,
};

export default withNamespaces('header_links')(Header);