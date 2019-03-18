import {
  StyleSheet
} from 'react-native';

import variables, {scale} from '../../../styles/variables';
import {
  MAIN_FONT,
  DARK_GREY
} from '../../../styles/constants';

const {
  medium
} = variables.fSize;

export default StyleSheet.create({
  mainContainer: {
    opacity: 1,
    height: '100%'
  },
  mainContentContainer: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%'
  },
  content: {
    marginTop: scale(-10),
    zIndex: 1,
    paddingTop: scale(10)
  },
  noText: {
    textAlign: 'center',
    fontSize: medium,
    fontFamily: MAIN_FONT,
    marginTop: scale(15)
  },
  title: {
    color: DARK_GREY,
    fontFamily: MAIN_FONT,
    fontSize: medium,
    textAlign: 'center',
    marginTop: scale(15)
  }
});
