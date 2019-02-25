import { StyleSheet } from 'react-native';

import variables from '../../../styles/variables';
const { medium } = variables.fSize;
import { BLACK, MAIN_FONT, COLOR_TEXT_GREEN } from '../../../styles/constants';

export default StyleSheet.create({
    questionItem: {
        marginLeft: 0,
        paddingLeft: 15,
        paddingTop: 10,
        paddingBottom: 10
    },
    questionItemText: {
        fontSize: medium,
        fontFamily: MAIN_FONT,
        color: BLACK,
        textAlign: 'left',
        width: '100%'
    },
    arrow: {
        color: COLOR_TEXT_GREEN
    },
    mainContainer: { 
        justifyContent: 'space-between', 
        flexDirection: 'column', 
        height: '100%' 
    },
    mainContent: { 
        marginTop: -10, 
        zIndex: 1, 
        paddingTop: 10 
    }
});