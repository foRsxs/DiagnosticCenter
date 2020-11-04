import { StyleSheet } from 'react-native';

import { MAIN_FONT } from '../../../styles/constants';
import variables from '../../../styles/variables';
const { medium } = variables.fSize;

export default StyleSheet.create({
  loaderWrap: {
    zIndex: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center', 
    fontSize: medium, 
    fontFamily: MAIN_FONT 
  }
})