import { StyleSheet } from 'react-native';

import variables, {scale} from '../../../styles/variables';
const { normal, medium } = variables.fSize;

import { MEDIUM_BLACK, MAIN_FONT, BACKGROUND_BLUE, BLACK } from '../../../styles/constants';

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
    headBlock: {
        marginVertical: scale(30),
        backgroundColor: BACKGROUND_BLUE,
        paddingVertical: scale(5),
        borderRadius: scale(10)
    },
    topText: {
        color: MEDIUM_BLACK,
        fontFamily: MAIN_FONT,
        fontSize: medium,
        textAlign: 'center',
        lineHeight: scale(19),
        marginBottom: scale(10)
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
        marginTop: scale(20)
    }
});