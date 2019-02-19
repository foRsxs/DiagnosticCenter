import { StyleSheet } from 'react-native';

import variables from '../../../../styles/variables';
const { large } = variables.fSize;

import { BLACK, MAIN_FONT } from '../../../../styles/constants';

export default StyleSheet.create({
    actionsWrap: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center'
    },
    actionsImg: {
        width: 20,
        height: 15,
        marginRight: 10
    },
    topLink: {
        paddingVertical: 5,
        marginTop: 10
    },
    bottomLink: {
        paddingVertical: 5,
        marginTop: 5
    },
    linkText: { 
        color: BLACK, 
        fontFamily: MAIN_FONT, 
        fontSize: large 
    }
});