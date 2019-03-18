import { StyleSheet } from 'react-native';

import variables, {scale} from '../../../../styles/variables';
import { BLACK } from '../../../../styles/constants';

const { medium } = variables.fSize;

export default StyleSheet.create({
	listWrap: {
		marginLeft: 0, 
		paddingLeft: scale(15), 
		paddingTop: scale(10), 
		paddingBottom: scale(10)
	},
	listIcon: {
		height: scale(30), 
		width: scale(30), 
		marginRight: scale(15)
	},
	listText: {
		textAlign: 'left',
		color: BLACK,
		fontSize: medium
	},
	arrow: {
		fontSize: scale(24)
	}
});