import { StyleSheet } from 'react-native';

import variables from '../../../../styles/variables';
import {
  DARK_BLUE,
  MAIN_FONT
} from '../../../../styles/constants';

const { main } = variables.fSize;

export default StyleSheet.create({
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
    marginTop: 20
  },
  buttonTxt: {
    color: DARK_BLUE,
    fontFamily: MAIN_FONT,
    fontSize: main,
    textAlign: 'center'
  }
});