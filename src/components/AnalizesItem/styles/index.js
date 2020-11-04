import { StyleSheet } from 'react-native';

import variables, {scale} from '../../../styles/variables';
import {
  MEDIUM_BLACK,
  ACCENT_BLUE,
  MAIN_FONT
} from '../../../styles/constants';

const { normal, medium } = variables.fSize;

export default StyleSheet.create({
  listWrap: {
    marginLeft: 0,
    paddingLeft: scale(15),
    paddingTop: scale(10),
    paddingBottom: scale(10)
  },
  txtHead: {
    color: MEDIUM_BLACK,
    fontFamily: MAIN_FONT,
    fontSize: medium,
    textAlign: 'left'
  },
  txtDate: {
    marginTop: scale(5),
    color: ACCENT_BLUE,
    fontFamily: MAIN_FONT,
    fontSize: normal,
    textAlign: 'left'
  }
});
