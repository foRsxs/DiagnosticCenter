import { StyleSheet } from 'react-native';

import variables from '../../../styles/variables';
const {large, medium} = variables.fSize;
import { COLOR_BLUE, ACCENT_BLUE, COLOR_DARK_BLUE } from '../../../styles/constants';

export default StyleSheet.create({
	wrapContainer: {
        justifyContent: 'space-between', 
        flexDirection: 'column',
        paddingHorizontal: 40,
    },
    title: {
        fontSize: large,
        color: COLOR_BLUE,
        textAlign: 'center',
        marginTop: 40
    },
    blueText: {
        fontSize: medium,
        color: ACCENT_BLUE,
        marginVertical: 15,
        lineHeight: 17
    },
    darkText: {
        fontSize: medium,
        color: COLOR_DARK_BLUE,
        lineHeight: 17
    },
    textBold: {
        fontSize: medium,
        color: COLOR_DARK_BLUE,
        fontWeight: '600',
        lineHeight: 17
    },
    image1: {
        width: '100%',
        height: 160
    },
    image2: {
        width: '100%',
        height: 300
    },
    image3: {
        width: '100%',
        height: 320
    },
    button: {
        marginBottom: 40
    }
});