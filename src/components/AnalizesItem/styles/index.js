import { StyleSheet } from 'react-native';

import variables from '../../../styles/variables';
const { normal, medium } = variables.fSize;

import { MEDIUM_BLACK, ACCENT_BLUE, MAIN_FONT } from '../../../styles/constants';

export default StyleSheet.create({
    listWrap: {
        marginLeft: 0,
        paddingLeft: 15,
        paddingTop: 10,
        paddingBottom: 10
    },
    txtHead: {
        color: MEDIUM_BLACK,
        fontFamily: MAIN_FONT,
        fontSize: medium,
        textAlign: 'left'
    },
    txtDate: {
        marginTop: 5,
        color: ACCENT_BLUE,
        fontFamily: MAIN_FONT,
        fontSize: normal,
        textAlign: 'left'
    }
});