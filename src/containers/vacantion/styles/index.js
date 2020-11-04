import { StyleSheet } from 'react-native';

import variables, {scale} from '../../../styles/variables';
const { medium } = variables.fSize;
import { BLACK, MAIN_FONT, COLOR_TEXT_GREEN } from '../../../styles/constants';

export default StyleSheet.create({
    questionItem: {
        marginLeft: 0,
        paddingLeft: scale(15),
        paddingTop: scale(10),
        paddingBottom: scale(10)
    },
    questionItemText: {
        fontSize: medium,
        fontFamily: MAIN_FONT,
        color: BLACK,
        textAlign: 'left',
        width: '100%'
    },
    arrow: {
        color: COLOR_TEXT_GREEN,
        fontSize: scale(24),
    },
    mainContainer: { 
        justifyContent: 'space-between', 
        flexDirection: 'column', 
        height: '100%' 
    },
    mainContent: { 
        marginTop: scale(-10),
        zIndex: 1, 
        paddingTop: scale(10) 
    }
});