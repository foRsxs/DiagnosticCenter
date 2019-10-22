import { StyleSheet } from 'react-native'

import variables, {scale} from '../../../styles/variables';
const { medium, large } = variables.fSize;
import {  MAIN_FONT, BLACK, DARK_GREY, COLOR_BORDER } from '../../../styles/constants';

export default StyleSheet.create({
	wrapContainer: {
        justifyContent: 'space-between', 
        flexDirection: 'column', 
        flex: 1
    },
    profileBlock: {
        paddingTop: scale(20),
        paddingBottom: scale(20),
        paddingHorizontal: scale(40),
        borderBottomWidth: 1,
        borderColor: COLOR_BORDER,
        flex: 2
    },
    profileItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: scale(5)
    },
    titles: {
        fontSize: medium,
        color: BLACK,
        fontFamily: MAIN_FONT,
        marginRight: scale(10)
    },
    text: {
        fontSize: medium,
        color: DARK_GREY,
        fontFamily: MAIN_FONT,
        flexShrink: 1
    }
});