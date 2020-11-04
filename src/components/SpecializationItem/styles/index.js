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
    paddingLeft: scale(15),
    paddingTop: scale(8),
    paddingBottom: scale(8)  
  },
  specItemText: {
    fontSize: large,
    fontFamily: FONT_LIGHT,
    flex: 1,
    flexWrap: 'wrap',
    color: BLACK,
    textAlignVertical: 'center',
    letterSpacing: scale(1),
    lineHeight: scale(22)
  },
  specIcon: {
    marginRight: scale(10),
    width: scale(25),
    height: scale(25),
  },
  arrow: {
    color: ACCENT_BLUE,
    fontSize: scale(24)
  },
  wrapArrowRed: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(30),
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
    lineHeight: scale(18)
  },
  leftAlign: {
    alignItems: 'center'
  },
  currency: {
    color: COLOR_TEXT_GREEN,
    lineHeight: scale(18),
    fontSize: main,
  }
});
