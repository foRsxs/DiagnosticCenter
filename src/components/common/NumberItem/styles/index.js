import { StyleSheet } from 'react-native';

import {
  WHITE,
  ACTIVE_LIGHT_GRAY,
  LIGHT_GRAY,
  DARK_BLUE,
  MAIN_FONT
} from '../../../../styles/constants';

export default StyleSheet.create({
  wrapItem: {
    width: 60,
    height: 60,
    margin: 5,
    marginLeft: 15,
    marginRight: 15
  },
  Item: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: LIGHT_GRAY,
  },
  ItemActive: {
    backgroundColor: ACTIVE_LIGHT_GRAY,
    width: 60,
    height: 60,
    borderRadius: 30
  },
  Text: {
    top: 7,
    textAlign: 'center',
    fontSize: 38,
    lineHeight: 47,
    fontFamily: MAIN_FONT,
    color: DARK_BLUE,
  },
  TextActive: {
    top: 7,
    textAlign: 'center',
    fontSize: 38,
    lineHeight: 47,
    fontFamily: MAIN_FONT,
    color: WHITE,
  },
});
