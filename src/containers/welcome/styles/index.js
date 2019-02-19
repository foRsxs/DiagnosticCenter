import { StyleSheet } from 'react-native';

import variables from '../../../styles/variables';
const {large, medium} = variables.fSize;
import { COLOR_BLUE, ACCENT_BLUE, COLOR_DARK_BLUE, MAIN_FONT } from '../../../styles/constants';

export default StyleSheet.create({
	wrapContainer: {
        justifyContent: 'space-between', 
        flexDirection: 'column',
        paddingHorizontal: 50,
    },
    title: {
        fontSize: large,
        color: COLOR_BLUE,
        textAlign: 'center',
        marginTop: 40,
        fontFamily: MAIN_FONT,
    },
    blueText: {
        fontSize: medium,
        color: ACCENT_BLUE,
        marginVertical: 15,
        lineHeight: 17,
        fontFamily: MAIN_FONT,
    },
    darkText: {
        fontFamily: MAIN_FONT,
        fontSize: medium,
        color: COLOR_DARK_BLUE,
        lineHeight: 20
    },
    textBold: {
        fontFamily: MAIN_FONT,
        fontSize: medium,
        color: COLOR_DARK_BLUE,
        fontWeight: '600',
        lineHeight: 20
    },
    button: {
        marginBottom: 40
    }
});