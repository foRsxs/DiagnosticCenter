import { StyleSheet } from 'react-native';

import variables, {scale} from '../../../styles/variables';
const { large, main } = variables.fSize;
import { ACCENT_BLUE, DARK_GREY, BLACK, MAIN_FONT  } from '../../../styles/constants';

export default StyleSheet.create({
    mainContainer: {
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: '100%'
    },
    mainContent: {
        marginTop: scale(-10),
        zIndex: 1,
        paddingTop: scale(10),
        paddingHorizontal: scale(20)
    },
    contactItem: {
        marginBottom: scale(15),
    },
    headTxt: {
        fontSize: large,
        fontFamily: MAIN_FONT,
        color: BLACK,
        width: '100%',
        textAlign: 'left',
    },
    subHeadTxt: {
        fontSize: main,
        fontFamily: MAIN_FONT,
        color: DARK_GREY,
        width: '100%',
        textAlign: 'left',
        marginVertical: scale(5)
    },
    linkTxt: {
        fontSize: main,
        fontFamily: MAIN_FONT,
        color: ACCENT_BLUE,
        width: '100%',
        textAlign: 'left',
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: ACCENT_BLUE,
    }
});