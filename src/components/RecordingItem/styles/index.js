import { StyleSheet } from 'react-native';

import variables, {scale} from '../../../styles/variables';
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
    paddingVertical: scale(10),
    paddingRight: scale(15),
    width: '100%'
  },
  itemImage: {
    width: scale(25),
    height: scale(25),
    marginRight: scale(10)
  },
  wrapText: {
    flex: 1
  }, 
  itemTitle: {
    fontSize: medium,
    color: ACCENT_BLUE,
    fontFamily: MAIN_FONT,
    marginBottom: scale(5)
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
