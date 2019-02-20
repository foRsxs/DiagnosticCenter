import { StyleSheet } from 'react-native';

import variables from '../../../styles/variables';
const { normal, medium } = variables.fSize;

import { MEDIUM_BLACK, MAIN_FONT, BACKGROUND_BLUE, BLACK } from '../../../styles/constants';

export default StyleSheet.create({
    headBlock: {
        marginVertical: 30,
        backgroundColor: BACKGROUND_BLUE,
        paddingVertical: 5,
        borderRadius: 10
    },
    topText: {
        color: MEDIUM_BLACK,
        fontFamily: MAIN_FONT,
        fontSize: medium,
        textAlign: 'center',
        lineHeight: 19,
        marginBottom: 10
    },
    bottomText: {
        color: MEDIUM_BLACK,
        fontFamily: MAIN_FONT,
        fontSize: normal,
        textAlign: 'center'
    },
    boldText: {
        color: BLACK,
        fontFamily: MAIN_FONT,
        fontWeight: '600',
        fontSize: medium,
    },
    descText: {
        color: MEDIUM_BLACK,
        fontFamily: MAIN_FONT,
        fontSize: medium,
        marginTop: 20
    }
});