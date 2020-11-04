import { StyleSheet } from 'react-native';

import variables, {scale} from '../../../styles/variables';
const { medium } = variables.fSize;
import { DARK_GREY, MAIN_FONT } from '../../../styles/constants';

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
        marginTop: scale(-10),
        zIndex: 1,
        paddingTop: scale(10)
    },
    title: {
        color: DARK_GREY,
        fontFamily: MAIN_FONT,
        fontSize: medium,
        textAlign: 'center',
        marginTop: scale(15)
    }
});