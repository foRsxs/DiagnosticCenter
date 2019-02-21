import { StyleSheet } from 'react-native';

import variables, { scale } from '../../../styles/variables';
import {
  FONT_LIGHT,
  RED,
  BLACK,
  ACCENT_BLUE,
  WHITE,
  COLOR_TEXT_GREEN
} from '../../../styles/constants';

const { large, medium, main } = variables.fSize;

export default StyleSheet.create({
  specItem: {
    marginLeft: 0,
    paddingLeft: 15,
    paddingTop: 8,
    paddingBottom: 8
  },
  specItemText: {
    fontSize: large,
    fontFamily: FONT_LIGHT,
    color: BLACK,
    textAlignVertical: 'center',
    letterSpacing: 1,
    lineHeight: scale(22)
  },
  specIcon: {
    marginRight: 10,
    width: 25,
    height: 25,
  },
  arrow: {
    color: ACCENT_BLUE,
    fontSize: 24
  },
  wrapArrowRed: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: RED,
    alignItems: 'center',
    justifyContent: 'center'
  },
  arrowRed: {
    color: WHITE,
    fontSize: medium
  },
  price: {
    textAlign: 'right',
    color: COLOR_TEXT_GREEN,
    fontSize: medium,
    lineHeight: 18
  },
  leftAlign: {
    alignItems: 'center'
  },
  currency: {
    color: COLOR_TEXT_GREEN,
    lineHeight: 18,
    fontSize: main,
  }
});
