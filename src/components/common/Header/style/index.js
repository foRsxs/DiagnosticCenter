import { StyleSheet, Dimensions } from 'react-native';
let { width, height } = Dimensions.get('window');

import variables from '../../../../styles/variables';
import { WHITE, ACCENT_BLUE, MAIN_FONT } from '../../../../styles/constants';

const { large, normal } = variables.fSize;

export default StyleSheet.create({
	headerWrap: {
		width: '100%',
		zIndex: 2,
		backgroundColor: 'rgba(0, 0, 0, 0)'
	},
	headerHomeWrap: {
		flex: 1,
		flexDirection: 'row'
	},
	headerLeftBtn: {
		flexDirection: 'row',
		alignItems: 'center',
		zIndex: 10
	},
	headerLeftText: {
		marginLeft: 8,
		width: 65,
		fontSize: normal,
		color: WHITE,
		lineHeight: 15
	},
	logo: {
		height: 50
	},
	headerRightText: {
		width: 55,
		fontSize: normal,
		color: WHITE,
		textAlign: 'right',
		marginRight: 10,
		lineHeight: 15
	},
	textUpper: {
		width: '100%',
		textAlign: 'center',
		fontSize: large,
		color: WHITE,
		width: '100%',
		paddingHorizontal: 30
	},
	headerRight: {
		width: 30,
		height: 30,
		position: 'absolute',
		top: 15,
		right: 20,
		zIndex: 10,
		alignItems: 'flex-end'
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		width: '100%',
		alignItems: 'center',
		backgroundColor: ACCENT_BLUE,
		zIndex: 3,
		height: 60,
		paddingTop: 15,
		paddingHorizontal: 15
	},
	leftContainer: {
		flex: 3,
		flexDirection: 'row',
		alignItems: 'center',
	},
	centerContainer: {
		flex: 4,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		paddingHorizontal: 15,
	},
	rightContainer: {
		flex: 3,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	headerIcon: {
		width: 35,
		height: 35,
	},
	btnBack: {
		width: 30,
		height: 20,
		position: 'absolute',
		left: 20,
		top: 22,
		zIndex: 10,
		justifyContent: 'flex-start',
	},
	textContainer: {
		flex: 6,
		alignItems: 'flex-start',
		justifyContent: 'flex-end',
		paddingBottom: 3,
		paddingRight: 5
	},
	text: {
		color: WHITE,
		fontFamily: MAIN_FONT,
		fontSize: large,
		height: 22,
		lineHeight: 22,
		width: '100%',
		textAlign: 'center',
		paddingHorizontal: 30
	},
	ovalWrap: {
		alignItems: 'center',
		marginTop: -width + height / 35,
		zIndex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0)'
	},
	oval: {
		width: width,
		height: width,
		borderRadius: width,
		backgroundColor: ACCENT_BLUE,
		transform: [
			{ scaleX: 3 }
		]
	},
	inputContainer: {
		flex: 9,
		position: 'relative'
	},
	inputContainerSearch: {
		flex: 9,
		position: 'relative',
		marginLeft: 40
	},
	searchIcon: {
		position: 'absolute',
		zIndex: 5,
		left: 5,
		top: 8,
		width: 18,
		height: 18
	},
	input: {
		width: '100%',
		height: 35,
		padding: 0,
		paddingLeft: 30,
		paddingRight: 10,
		borderRadius: 5,
		backgroundColor: WHITE
	},
});