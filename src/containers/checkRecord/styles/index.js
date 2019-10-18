import { StyleSheet, Dimensions } from 'react-native';

import variables, { scale } from '../../../styles/variables';
const { normal } = variables.fSize;
import { ACCENT_BLUE, MAIN_FONT, COLOR_LIGHT_BLACK } from '../../../styles/constants';

export default StyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
        height: '100%'
    },
    wrapper: {
        padding: scale(20),
        flex: 1
    },
    datetimeWrap: {
        flexDirection: 'row',
        flex: 1
    },
    separator: {
        marginVertical: scale(10),
        borderLeftWidth: 1,
        borderColor: ACCENT_BLUE
    },
    buttonWrap: {
        position: 'absolute',
        backgroundColor: '#ffffff',
        width: Dimensions.get('window').width,
        bottom: scale(80),
        zIndex: 14,
        height: scale(70),
        paddingTop: scale(10),
        paddingBottom: scale(20),
        paddingHorizontal: scale(20)
    },
    helpText: {
        fontSize: normal,
        color: COLOR_LIGHT_BLACK,
        fontFamily: MAIN_FONT,
        paddingLeft: scale(50),
        paddingRight: scale(30),
        marginBottom: scale(20)
    },
    textInfo: {
        marginTop: scale(10),
        height: scale(60),
        textAlign: 'center'
    }
});