import { StyleSheet } from 'react-native';

import variables from '../../../styles/variables';
const { medium } = variables.fSize;
import { MAIN_FONT } from '../../../styles/constants';

export default StyleSheet.create({
    mainContainer: {
        opacity: 1,
        height: '100%'
    },
    mainContentContainer: {
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: '100%'
    },
    content: {
        marginTop: -10,
        zIndex: 1,
        paddingTop: 10,
    },
    noText: {
        textAlign: 'center',
        fontSize: medium,
        fontFamily: MAIN_FONT
    },
    list: {
        paddingBottom: 10
    }
});