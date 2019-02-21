import { StyleSheet } from 'react-native';

import variables from '../../../styles/variables';
import {
  MAIN_FONT,
  COLOR_PLACEHOLDER,
  ACCENT_BLUE,
  BLACK
} from '../../../styles/constants';

const { medium } = variables.fSize;

export default StyleSheet.create({
  itemWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderColor: ACCENT_BLUE,
    paddingVertical: 10,
    paddingRight: 15,
    width: '100%'
  },
  itemImage: {
    width: 25,
    height: 25,
    marginRight: 10
  },
  itemTitle: {
    fontSize: medium,
    color: ACCENT_BLUE,
    fontFamily: MAIN_FONT,
    marginBottom: 5
  },
  itemPlaceholder: {
    fontSize: medium,
    color: COLOR_PLACEHOLDER,
    fontFamily: MAIN_FONT
  },
  itemText: {
    fontSize: medium,
    color: BLACK,
    fontFamily: MAIN_FONT
  }
});
