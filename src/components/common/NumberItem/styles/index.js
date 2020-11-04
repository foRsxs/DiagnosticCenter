import { StyleSheet } from 'react-native';

import {scale} from '../../../../styles/variables';

import {
  WHITE,
  ACTIVE_LIGHT_GRAY,
  LIGHT_GRAY,
  DARK_BLUE,
  MAIN_FONT
} from '../../../../styles/constants';

export default StyleSheet.create({
  wrapItem: {
    width: scale(60),
    height: scale(60),
    margin: scale(5),
    marginLeft: scale(15),
    marginRight: scale(15)
  },
  Item: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: LIGHT_GRAY,
  },
  ItemActive: {
    backgroundColor: ACTIVE_LIGHT_GRAY,
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30)
  },
  Text: {
    top: scale(9),
    textAlign: 'center',
    fontSize: scale(38),
    lineHeight: scale(47),
    fontFamily: MAIN_FONT,
    color: DARK_BLUE,
  },
  TextActive: {
    top: scale(9),
    textAlign: 'center',
    fontSize: scale(38),
    lineHeight: scale(47),
    fontFamily: MAIN_FONT,
    color: WHITE,
  },
});
