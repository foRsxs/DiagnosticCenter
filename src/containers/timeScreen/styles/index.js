import { StyleSheet } from 'react-native';

import variables from '../../../styles/variables';
const { medium } = variables.fSize;
import { COLOR_BORDER, ACCENT_BLUE, MEDIUM_BLACK, BACKGROUND_BLUE, MAIN_FONT, DARK_GREY, BLACK } from '../../../styles/constants';

export default StyleSheet.create({
    mainContainer: {
		flexDirection: 'column',
		height: '100%',
	},
	timeItemWrap: {
		width: '33%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	timeItemAvaliable: {
		width: 70,
		paddingVertical: 5,
		backgroundColor: BACKGROUND_BLUE,
		borderColor: ACCENT_BLUE,
		borderRadius: 10,
		borderWidth: 1,
		textAlign: 'center',
		margin: 10,
		justifyContent: 'center',
		fontSize: variables.fSize.large,
		fontFamily: MAIN_FONT,
		color: MEDIUM_BLACK
	},
	timeContainer: {
		paddingHorizontal: 0,
		flexDirection: 'row',
		flexWrap: 'wrap',
		backgroundColor: 'white',
		paddingTop: 20
	},
	unSelectedItem: {
		marginRight: 10,
		backgroundColor: BACKGROUND_BLUE,
		borderColor: ACCENT_BLUE,
		width: 10,
		height: 10,
		borderRadius: 15,
		borderWidth: 1
	},
	selectedItem: {
		marginRight: 10,
		backgroundColor: ACCENT_BLUE,
		width: 10,
		height: 10,
		borderRadius: 15
	},
	itemsWrap: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	itemsTxt: {
		color: DARK_GREY,
		fontFamily: MAIN_FONT,
		fontSize: medium
	},
	bottomWrap: { 
		paddingVertical: 10, 
		borderTopWidth: 1, 
		borderColor: COLOR_BORDER, 
		alignItems: 'center' 
	},
	centerWrap: {
		alignItems: 'flex-start'
    },
    textTime: { 
        backgroundColor: ACCENT_BLUE, 
        color: BLACK 
    }
});