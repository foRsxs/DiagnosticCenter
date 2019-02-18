import { StyleSheet } from 'react-native';

import variables from '../../../styles/variables';
const { normal } = variables.fSize;
import { ACCENT_BLUE, MAIN_FONT, COLOR_LIGHT_BLACK } from '../../../styles/constants';

export default StyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
        height: '100%'
    },
    wrapper: {
        padding: 20,
        flex: 1
    },
    datetimeWrap: {
        flexDirection: 'row',
        flex: 1
    },
    separator: {
        marginVertical: 10,
        borderLeftWidth: 1,
        borderColor: ACCENT_BLUE
    },
    buttonWrap: {
        paddingHorizontal: 20
    },
    helpText: {
        fontSize: normal,
        color: COLOR_LIGHT_BLACK,
        fontFamily: MAIN_FONT,
        paddingLeft: 50,
        paddingRight: 30,
        marginBottom: 20
    }
});