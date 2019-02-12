import { StyleSheet } from 'react-native';

import variables from '../../../../styles/variables';
const { main } = variables.fSize;

import { COLOR_BLUE, COLOR_BORDER, RED } from '../../../../styles/constants';

export default StyleSheet.create({
	container: {
		borderTopWidth: 1,
		borderColor: COLOR_BORDER
	},
	button: {
		alignSelf: 'center',
		justifyContent: 'center',
	},
	icon: {
		height: 25,
		marginVertical: 5
	},
	buttonText: {
		color: COLOR_BLUE,
		fontSize: main,
		paddingLeft: 5,
		paddingRight: 5
	},
	buttonActiveText: {
		color: RED,
		fontSize: main,
		paddingLeft: 5,
		paddingRight: 5
	}
});