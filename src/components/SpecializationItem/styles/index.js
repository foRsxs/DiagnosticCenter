import { StyleSheet } from 'react-native';

import variables from '../../../styles/variables';
const { large, medium } = variables.fSize;

import { MAIN_FONT, RED, BLACK, ACCENT_BLUE, WHITE, COLOR_TEXT_GREEN } from '../../../styles/constants';

export default StyleSheet.create({
    specItem: {
        marginLeft: 0,
        paddingLeft: 15,
        paddingTop: 8,
        paddingBottom: 8
    },
    specItemText: {
        fontSize: large,
        fontFamily: MAIN_FONT,
        color: BLACK,
        textAlignVertical: 'center',
        letterSpacing: 1
    },
    specIcon: {
        marginRight: 10,
        width: 25,
        height: 25,
    },
    arrow: {
        color: ACCENT_BLUE,
        fontSize: 24
    },
    wrapArrowRed: {
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: RED,
        alignItems: 'center',
        justifyContent: 'center'
    },
    arrowRed: {
        color: WHITE,
        fontSize: 18
    },
    price: {
        textAlign: 'right',
        color: COLOR_TEXT_GREEN,
        fontSize: medium,
        lineHeight: 18
    }
});