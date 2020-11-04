import { StyleSheet } from 'react-native';

import variables, {scale} from '../../../../styles/variables';
import { COLOR_BLUE, COLOR_BORDER, RED, FONT_LIGHT } from '../../../../styles/constants';

const { normal } = variables.fSize;

export default StyleSheet.create({
	container: {
		borderTopWidth: 1,
		borderColor: COLOR_BORDER,
		height: scale(55)
	},
	button: {
		alignSelf: 'center',
		justifyContent: 'center',
	},
	icon: {
		height: scale(25),
		marginVertical: scale(5)
	},
	buttonText: {
		color: COLOR_BLUE,
		fontSize: normal,
		paddingLeft: 5,
		paddingRight: 5,
		fontFamily: FONT_LIGHT,
		height: scale(15),
		textAlign: 'center',
		lineHeight: scale(15),
	},
	buttonActiveText: {
		color: RED,
		fontSize: normal,
		paddingLeft: 5,
		paddingRight: 5,
		fontFamily: FONT_LIGHT,
		height: scale(15),
		textAlign: 'center',
		lineHeight: scale(15),
	}
});