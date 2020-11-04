import { StyleSheet } from 'react-native';

import variables, { scale } from '../../../styles/variables';
const { medium } = variables.fSize;
import { BLACK, MAIN_FONT, COLOR_BORDER, COLOR_TEXT_GREEN } from '../../../styles/constants';

export default StyleSheet.create({
	questionItem: {
		alignItems: 'center',
		width: '100%',
		marginBottom: scale(10),
		paddingHorizontal: scale(20),
		paddingVertical: scale(15),
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: COLOR_BORDER,
		position: 'relative'
	},
	questionItemText: {
		fontSize: medium,
		fontFamily: MAIN_FONT,
		color: COLOR_TEXT_GREEN,
		textAlign: 'left',
		width: '92%'
	},
	answerItemText: {
		fontSize: medium,
		fontFamily: MAIN_FONT,
		color: BLACK,
		textAlign: 'left',
		width: '100%',
		paddingTop: scale(5)
	},
	itemClick: {
		width: '100%'
	},
	icon: {
		color: COLOR_TEXT_GREEN,
		fontSize: scale(20),
		fontFamily: MAIN_FONT,
		position: 'absolute',
		width: scale(20),
		height: scale(20),
		top: 0,
		right: 0,
		zIndex: 1
	}
});
