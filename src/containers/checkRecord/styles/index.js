import { StyleSheet } from 'react-native';

import variables, { scale } from '../../../styles/variables';
const { normal } = variables.fSize;
import { ACCENT_BLUE, MAIN_FONT, COLOR_LIGHT_BLACK } from '../../../styles/constants';

export default StyleSheet.create({
	mainContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between'
	},
	wrapper: {
    padding: scale(20),
	},
	datetimeWrap: {
		flexDirection: 'row',
		flex: 1
	},
	separator: {
		marginVertical: scale(10),
		borderLeftWidth: 1,
		borderColor: ACCENT_BLUE
	},
	helpText: {
		fontSize: normal,
		color: COLOR_LIGHT_BLACK,
		fontFamily: MAIN_FONT,
		paddingLeft: scale(50),
		paddingRight: scale(30),
		marginBottom: scale(20)
  },
  loaderWrap: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center'
  },
	buttonWrap: {
    padding: scale(20),
    flexDirection: 'column',
    justifyContent: 'space-between'
	},
	textInfo: {
		marginBottom: scale(20),
		textAlign: 'center'
	}
});
