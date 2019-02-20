import { StyleSheet, Dimensions } from 'react-native';
let { width, height } = Dimensions.get('window');

import variables, { scale } from '../../../../styles/variables';
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
		marginLeft: scale(8),
		width: scale(65),
		fontSize: normal,
		color: WHITE,
		lineHeight: scale(15)
	},
	logo: {
		height: scale(50)
	},
	headerRightText: {
		width: scale(55),
		fontSize: normal,
		color: WHITE,
		textAlign: 'right',
		marginRight: scale(10),
		lineHeight: scale(15)
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
		width: scale(30),
		height: scale(30),
		position: 'absolute',
		top: scale(15),
		right: scale(20),
		zIndex: scale(10),
		alignItems: 'flex-end'
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		width: '100%',
		alignItems: 'center',
		backgroundColor: ACCENT_BLUE,
		zIndex: 3,
		height: scale(60),
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
		width: scale(35),
		height: scale(35),
	},
	btnBack: {
		width: scale(30),
		height: scale(20),
		position: 'absolute',
		left: scale(20),
		top: scale(22),
		zIndex: 10,
		justifyContent: 'flex-start',
	},
	textContainer: {
		flex: 6,
		alignItems: 'flex-start',
		justifyContent: 'flex-end',
		paddingBottom: scale(3),
		paddingRight: scale(5)
	},
	text: {
		color: WHITE,
		fontFamily: MAIN_FONT,
		fontSize: large,
		height: scale(22),
		lineHeight: scale(22),
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
		width: scale(18),
		height: scale(18)
	},
	input: {
		width: '100%',
		height: scale(35),
		padding: 0,
		paddingLeft: 30,
		paddingRight: 10,
		borderRadius: 5,
		backgroundColor: WHITE
	},
});