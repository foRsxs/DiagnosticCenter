import { StyleSheet } from 'react-native'

import variables from '../../../styles/variables';
const { medium, large } = variables.fSize;
import {  MAIN_FONT, BLACK, DARK_GREY, COLOR_BORDER } from '../../../styles/constants';

export default StyleSheet.create({
	wrapContainer: {
        justifyContent: 'space-between', 
        flexDirection: 'column', 
        height: '100%'
    },
    prifileBlock: {
        paddingTop: 20,
        paddingBottom: 40,
        paddingHorizontal: 40,
        borderBottomWidth: 1,
        borderColor: COLOR_BORDER
    },
    prifileItem: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center'
    },
    titles: {
        fontSize: medium,
        color: BLACK,
        fontFamily: MAIN_FONT,
        marginRight: 10
    },
    text: {
        fontSize: large,
        color: DARK_GREY,
        fontFamily: MAIN_FONT,
        lineHeight: 22
    }
});