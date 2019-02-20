import {
  StyleSheet
} from 'react-native';

import {
  MAIN_FONT
} from '../../../../styles/constants';
import variables from '../../../../styles/variables'

export default StyleSheet.create({
  btn: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 25,
  },
  textBtn: {
    fontFamily: MAIN_FONT,
    fontSize: variables.fSize.large,
    textAlignVertical: 'center',
    textAlign: 'center',
    letterSpacing: 2
  }
});
