import { StyleSheet } from 'react-native';

import variables, {scale} from '../../../../styles/variables';
import { BLACK } from '../../../../styles/constants';

const { medium } = variables.fSize;

export default StyleSheet.create({
	listWrap: {
		marginLeft: 0, 
		paddingLeft: 15, 
		paddingTop: 10, 
		paddingBottom: 10
	},
	listIcon: {
		height: 30, 
		width: 30, 
		marginRight: 15
	},
	listText: {
		textAlign: 'left',
		color: BLACK,
		fontSize: medium
	},
	arrow: {
		fontSize: 24
	}
});