import { StyleSheet } from 'react-native';

import variables from '../../../../styles/variables';
import {
  ACCENT_BLUE,
  BLACK,
  MAIN_FONT
} from '../../../../styles/constants';

const { medium } = variables.fSize;

export default StyleSheet.create({
  inputWrap: {
    marginBottom: 20,
    borderColor: ACCENT_BLUE,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  input: {
    fontFamily: MAIN_FONT,
    fontSize: medium,
    color: BLACK
  },
  textarea: {
    height: 250,
    fontSize: medium,
    fontFamily: MAIN_FONT,
    borderColor: ACCENT_BLUE,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  buttonWrap: {
    paddingTop: 20,
    paddingBottom: 15,
  },
  formWrap: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 15
  }
});
