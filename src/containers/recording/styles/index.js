import { StyleSheet, Dimensions } from 'react-native';

let { height } = Dimensions.get('window');

import variables from '../../../styles/variables';
const { extralarge, large, normal, main, medium } = variables.fSize;
import { ACCENT_BLUE, WHITE, MAIN_FONT, COLOR_BORDER, COLOR_LIGHT_GRAY, GRAY, ACTIVE_GRAY, COLOR_PLACEHOLDER } from '../../../styles/constants';

export default StyleSheet.create({
    mainContainer: { 
        flexDirection: 'column', 
        height: '100%' 
    },
    bgImage: { 
        height: height / 3.5, 
        width: '100%' 
    },
    tab: { 
        backgroundColor: ACCENT_BLUE, 
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10 
    },
    tabActive: { 
        backgroundColor: WHITE, 
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10 
    },
    tabText: { 
        color: WHITE, 
        fontSize: medium,
        fontFamily: MAIN_FONT 
    },
    tabTextActive: { 
        color: ACCENT_BLUE, 
        fontSize: medium,
        fontFamily: MAIN_FONT,
        fontWeight: '400' 
    },
    wrapTabs: { 
        elevation: 0, 
        backgroundColor: 'transparent', 
        marginTop: -10 
    },
    wrapper: {
        padding: 20,
        flex: 1
    },
    datetimeWrap: {
        flexDirection: 'row',
    }
});