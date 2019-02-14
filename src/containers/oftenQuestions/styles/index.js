import { StyleSheet } from 'react-native';

import variables from '../../../styles/variables';
const { large, medium } = variables.fSize;
import { ACCENT_BLUE, MAIN_FONT, BLACK } from '../../../styles/constants';

export default StyleSheet.create({
    mainContainer: {
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: '100%'
    },
    mainContent: {
        marginTop: -10,
        zIndex: 1,
        paddingTop: 10
    },
    titleMain: {
        textAlign: 'center',
        color: BLACK,
        fontSize: large,
        fontFamily: MAIN_FONT,
        marginTop: 15,
        paddingHorizontal: 40
    },
    subtitleMain: {
        textAlign: 'center',
        color: ACCENT_BLUE,
        fontSize: medium,
        fontFamily: MAIN_FONT,
        marginBottom: 15,
        marginTop: 10,
        paddingHorizontal: 40,
        lineHeight: 18
    },
    noText: {
        textAlign: 'center',
        fontSize: medium,
        fontFamily: MAIN_FONT
    }
});