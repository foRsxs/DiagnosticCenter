import { StyleSheet } from 'react-native';

import variables, { scale } from '../../../styles/variables';
const { large, medium } = variables.fSize;
import { ACCENT_BLUE, MAIN_FONT, BLACK } from '../../../styles/constants';

export default StyleSheet.create({
    mainContainer: {
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: '100%'
    },
    mainContent: {
        marginTop: scale(-10),
        zIndex: 1,
        paddingTop: scale(10)
    },
    titleMain: {
        textAlign: 'center',
        color: BLACK,
        fontSize: large,
        fontFamily: MAIN_FONT,
        marginTop: scale(15),
        paddingHorizontal: scale(40)
    },
    subtitleMain: {
        textAlign: 'center',
        color: ACCENT_BLUE,
        fontSize: medium,
        fontFamily: MAIN_FONT,
        marginBottom: scale(15),
        marginTop: scale(10),
        paddingHorizontal: scale(40),
        lineHeight: scale(18)
    },
    noText: {
        textAlign: 'center',
        fontSize: medium,
        fontFamily: MAIN_FONT
    }
});