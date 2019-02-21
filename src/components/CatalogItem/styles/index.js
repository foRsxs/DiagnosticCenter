import { StyleSheet } from 'react-native';
import variables, {scale} from '../../../styles/variables';
import {
	ACCENT_BLUE, 
	RED, 
	COLOR_NEW_GRAY, 
	BLACK, 
	COLOR_LIGHT_BLACK,
	COLOR_TEXT_GREEN
} from '../../../styles/constants';

const { medium, main, normal } = variables.fSize;

export const styles = StyleSheet.create({
  block: {
		width: '100%',
		paddingVertical: scale(5),
    flexDirection: 'row',
    position: 'relative',
    borderBottomWidth: 0.5,
		borderColor: COLOR_NEW_GRAY
  },
  blockImg: {
    width: '25%',
    alignItems: 'center'
  },
  img: {
    width: scale(65),
		height: scale(65),
		borderRadius: scale(33),
		borderWidth: 1,
		borderColor: ACCENT_BLUE,
    marginTop: scale(5)
  },
  content: {
    width: '75%'
	},
	name: {
		width: scale(245),
		fontSize: medium,
		color: BLACK
	},
	special: {
		fontSize: main,
		color: ACCENT_BLUE
	},
	category: {
		color: COLOR_LIGHT_BLACK,
		fontSize: normal
	},
	logoInfo: {
		width: '80%'
	},
  btn: {
		width: scale(30),
		height: scale(30),
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		backgroundColor: RED,
		borderRadius: scale(15),
    right: scale(15),
    top: scale(23)
	},
	iconBtn: {
		width: scale(8),
		height: scale(12)
	},
	more: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	moreInfoText: {
		color: COLOR_LIGHT_BLACK,
		fontSize: normal,
		paddingVertical: 5, 
		width: scale(260)
	},
	arrow: {
		marginLeft: 5,
		height: scale(8),
		width: scale(12)
	},
	arrowActive: {
		marginLeft: 5,
		height: scale(8),
		width: scale(12),
		transform: [{ rotate: '180deg'}]
	},
	openInfo: {
		fontSize: normal,
		color: COLOR_TEXT_GREEN
	}
})