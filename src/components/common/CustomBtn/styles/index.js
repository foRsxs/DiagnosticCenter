import {
  StyleSheet
} from 'react-native';

import {
  MAIN_FONT
} from '../../../../styles/constants';
import variables, {scale} from '../../../../styles/variables'

export default StyleSheet.create({
  btn: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: scale(12),
    paddingBottom: scale(12),
    borderRadius: scale(25),
    height: scale(45)
  },
  textBtn: {
    fontFamily: MAIN_FONT,
    fontSize: variables.fSize.large,
    textAlignVertical: 'center',
    textAlign: 'center',
    letterSpacing: 2
  }
});
