import { StyleSheet, Dimensions, Platform } from 'react-native';

import { isIphoneXorAbove } from '../../../../utils/helpers';
import variables, { scale } from '../../../../styles/variables';
import { WHITE, ACCENT_BLUE, MAIN_FONT } from '../../../../styles/constants';

let { width, height } = Dimensions.get('window');
const { large, normal } = variables.fSize;

export default StyleSheet.create({
	headerWrap: {
		width: '100%',
		zIndex: 2,
		backgroundColor: 'rgba(0, 0, 0, 0)'
	},
	headerHomeWrap: {
		flex: 1,
		flexDirection: 'row',
	},
	headerLeftBtn: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	headerLeftText: {
		marginLeft: scale(8),
		width: scale(65),
		fontSize: normal,
		color: WHITE,
		lineHeight: scale(15)
	},
	logo: {
		width: '100%',
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
	headerRightBtn: {
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'flex-end'
	},
	textUpper: {
		width: '100%',
		textAlign: 'center',
		fontSize: large,
		color: WHITE,
		width: '100%',
		paddingHorizontal: scale(30)
	},
	headerRight: {
		width: scale(35),
		height: scale(35),
		position: 'absolute',
		top: (Platform.OS === 'ios' && isIphoneXorAbove()) ? scale(52) : (Platform.OS === 'ios') ? scale(37) : scale(15),
		right: scale(20),
		alignItems: 'flex-end',
		justifyContent: 'flex-end'
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		width: '100%',
		alignItems: 'center',
		backgroundColor: ACCENT_BLUE,
		zIndex: 3,
		height: (Platform.OS === 'ios' && isIphoneXorAbove()) ? scale(90) : (Platform.OS === 'ios') ? scale(75) : scale(60),
		paddingTop: (Platform.OS === 'ios' && isIphoneXorAbove()) ? scale(45) : (Platform.OS === 'ios') ? scale(30) : scale(15),
		paddingHorizontal: scale(15)
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
		paddingHorizontal: scale(15),
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
		height: scale(30),
		position: 'absolute',
		left: scale(20),
		top: (Platform.OS === 'ios' && isIphoneXorAbove()) ? scale(52) : (Platform.OS === 'ios') ? scale(37) : scale(18),
		zIndex: 20,
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
		paddingHorizontal: scale(30)
	},
	ovalWrap: {
		alignItems: 'center',
		marginTop: -width + height / 35,
		zIndex: 1,
		backgroundColor: 'transparent'
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
		marginLeft: scale(40)
	},
	searchIcon: {
		position: 'absolute',
		zIndex: 5,
		left: scale(5),
		top: scale(8),
		width: scale(18),
		height: scale(18)
	},
	input: {
		width: '100%',
		height: scale(35),
		padding: 0,
		paddingLeft: scale(30),
		paddingRight: scale(10),
		borderRadius: scale(5),
		backgroundColor: WHITE,
		fontSize: normal
	},
	iconHeader: { 
		color: 'white', 
		paddingLeft: scale(5), 
		fontSize: scale(36) 
	}
});