import { StyleSheet } from 'react-native';

import variables, {scale} from '../../../styles/variables';
const { medium } = variables.fSize;
import { ACCENT_BLUE, DARK_GREY, BACKGROUND_BLUE, COLOR_BORDER, MAIN_FONT } from '../../../styles/constants';

export default StyleSheet.create({
    mainContainer: {
		flexDirection: 'column',
		height: '100%',
	},
	calendar: { 
		paddingTop: scale(20), 
		backgroundColor: '#fff', 
		marginHorizontal: scale(20) 
	},
	unSelectedItem: {
		marginRight: scale(10),
		backgroundColor: BACKGROUND_BLUE,
		borderColor: ACCENT_BLUE,
		width: scale(10),
		height: scale(10),
		borderRadius: 15,
		borderWidth: 1
	},
	selectedItem: {
		marginRight: scale(10),
		backgroundColor: ACCENT_BLUE,
		width: scale(10),
		height: scale(10),
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
		paddingVertical: scale(10), 
		borderTopWidth: 1, 
		borderColor: COLOR_BORDER, 
		alignItems: 'center' 
	},
	centerWrap: {
		alignItems: 'flex-start'
	}
});