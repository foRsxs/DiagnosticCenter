import {
  StyleSheet,
  Dimensions
} from 'react-native';

import variables, {scale} from '../../../styles/variables';
import {
  ACCENT_BLUE,
  WHITE,
  MAIN_FONT
} from '../../../styles/constants';

import { isIphoneXorAbove } from '../../../utils/helpers';

let {
  height
} = Dimensions.get('window');

const {
  medium
} = variables.fSize;

export default StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    height: '100%'
  },
  bgImage: {
    height: height / 3.5,
    width: '100%'
  },
  tab: {
    backgroundColor: ACCENT_BLUE,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  tabActive: {
    backgroundColor: WHITE,
    borderBottomColor: WHITE,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  tabText: {
    color: WHITE,
    fontSize: medium,
    fontFamily: MAIN_FONT
  },
  tabTextActive: {
    color: ACCENT_BLUE,
    fontSize: medium,
    fontFamily: MAIN_FONT,
    fontWeight: '400'
  },
  wrapTabs: {
    elevation: 0,
    backgroundColor: 'transparent',
    marginTop: scale(-10)
  },
  wrapper: {
    padding: scale(20)
  },
  datetimeWrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  separator: {
    borderLeftWidth: 1,
    borderColor: ACCENT_BLUE,
    height: scale(50)
  },
  buttonWrap: {
    position: 'relative',
    padding: scale(20),
  },
  sendBtn: {
    position: 'relative'
  },
  btnUpdate: {
    position: 'absolute',
    top: isIphoneXorAbove ? scale(50) : scale(20),
    right: scale(20),
    zIndex: 10
  },
  imgUpdate: {
    width: 30,
    height: 30
  }, 
  mainContent: { 
    marginTop: scale(-10),
    zIndex: 1, 
    paddingTop: scale(10)
  },
  loaderWrap: {
    zIndex: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
