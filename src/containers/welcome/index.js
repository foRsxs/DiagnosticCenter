import React, { Component } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { Text } from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Timeline from 'react-native-timeline-listview'

import * as AuthActions from '../../actions/auth';
import * as ContentActions from '../../actions/content';
import CustomBtn from '../../components/common/CustomBtn';
import styles from './styles';

import { IMAGE_WELCOME_1, IMAGE_WELCOME_2, IMAGE_WELCOME_3 } from '../../styles/images';
import { COLOR_TEXT_GREEN } from '../../styles/constants';

class WelcomeScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: [
				{ 
          title: this.props.t('welcome:enter_text1'), 
          titleBold: this.props.t('welcome:enter_text2'), 
          image: IMAGE_WELCOME_1, imgStyle: { width: '100%', height: 140 } 
        },
				{
					title: this.props.t('welcome:enter_text3'),
					titleBold: this.props.t('welcome:enter_text4'),
					title1: this.props.t('welcome:enter_text5'),
					titleBold1: this.props.t('welcome:enter_text6'),
					title2: this.props.t('welcome:enter_text7'),
					desc: this.props.t('welcome:enter_text8'),
					desc1: this.props.t('welcome:enter_text9'),
					desc2: this.props.t('welcome:enter_text10'),
					image: IMAGE_WELCOME_2,
					imgStyle: { width: '100%', height: 260 }
				},
				{ 
          title: this.props.t('welcome:enter_text11'), 
          image: IMAGE_WELCOME_3, 
          imgStyle: { width: '100%', height: 280 } 
        }
			]
    };
		this.renderDetail = this.renderDetail.bind(this);
		this._checkWelcome();
	}

	_checkWelcome = () => {
		const { hideScreen, token, enableSecure } = this.props;
		const { navigate } = this.props.navigation;

		if (hideScreen && token && enableSecure) {
			navigate('authorization');
		} else if (hideScreen && token && !enableSecure) {
			navigate('home');
		} else if (hideScreen && !token) {
			navigate('home');
		}
	};

	componentDidMount() {
		SplashScreen.hide();
	}

	renderImage(image, style) {
		return <Image style={style} resizeMode='contain' source={image} />
	}

	renderDetail(rowData) {
		let title = <Text style={styles.darkText}>{rowData.title}<Text style={styles.textBold}> {rowData.titleBold} </Text>{rowData.title1}<Text style={styles.textBold}> {rowData.titleBold1} </Text>{rowData.title2}</Text>
		var desc = (
			<View>
				{this.renderImage(rowData.image, rowData.imgStyle)}
				{(rowData.desc) && (<Text style={styles.darkText}>{rowData.desc} <Text style={styles.textBold}>"{rowData.desc1}"</Text> {rowData.desc2}{"\n"}</Text>)}
			</View>
		)
		return (
			<View style={{ flex: 1 }}>
				{title}
				{desc}
			</View>
		)
	}

	render() {
		const { navigate } = this.props.navigation;
		const { t } = this.props;

		return (
			<ScrollView contentContainerStyle={styles.wrapContainer}>
				<Text style={styles.title}>{t('welcome:enter_app')}</Text>
				<Text style={styles.blueText}>{t('welcome:enter_text')}</Text>
				<View style={{ flex: 1 }}>
					<Timeline
						style={{ flex: 1, marginTop: 20, marginLeft: -40 }}
						detailContainerStyle={{ marginTop: -10 }}
						showTime={false}
						separator={false}
						renderFullLine={false}
						circleColor={COLOR_TEXT_GREEN}
						lineColor={COLOR_TEXT_GREEN}
						data={this.state.data}
						renderDetail={this.renderDetail}
					/>
				</View>
				<Text style={styles.darkText}>{t('welcome:enter_text12')} <Text style={styles.textBold}>"{t('welcome:enter_text13')}"</Text> {t('welcome:enter_text14')}</Text>
				<Text style={styles.blueText}>{t('welcome:enter_text15')}</Text>
				<View style={styles.button}>
					<CustomBtn
						label={t('common:actions.continue')}
						onClick={() => {
							this.props.setWelcomeScreen(true);
							navigate('home')
						}}
					/>
				</View>
			</ScrollView>
		)
	}
}

function mapStateToProps(state) {
	return {
		token: state.authorization.token,
		hideScreen: state.content.hideScreen,
		enableSecure: state.authorization.enableSecure
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ ...AuthActions, ...ContentActions }, dispatch)
}

export default withNamespaces(['welcome', 'common'])(connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen));
