import {
  Platform,
  StyleSheet
} from 'react-native';

import { isIphoneXorAbove } from '../../../utils/helpers';
import variables, {
  scale
} from '../../../styles/variables';
import {
  ACCENT_BLUE,
  BACKGROUND_BLUE,
  WHITE,
  COLOR_NEW_GRAY,
  BLACK,
  DARK_GREY,
  COLOR_TEXT_GREEN,
  MAIN_FONT,
  MEDIUM_BLACK,
  FONT_LIGHT
} from '../../../styles/constants';

const {
  medium,
  extralarge,
  normal,
} = variables.fSize;

export const styles = StyleSheet.create({
  imgWrap: {
    width: scale(200),
    height: scale(200),
    position: 'absolute',
    top: (Platform.OS === 'ios' && isIphoneXorAbove()) ? scale(50) : (Platform.OS === 'ios') ? scale(30) : scale(10),
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 10
  },
  avatar: {
    width: scale(200),
    height: scale(200),
    borderRadius: scale(100),
    borderWidth: 1,
    borderColor: ACCENT_BLUE
  },
  topContent: {
    height: scale(195),
    width: '100%',
    backgroundColor: BACKGROUND_BLUE,
    marginTop: scale(-20),
    justifyContent: 'flex-end'
  },
  tabs: {
    flexDirection: 'row',
    width: '100%',
  },
  tab: {
    width: '50%',
    height: scale(35),
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
    backgroundColor: ACCENT_BLUE,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textTab: {
    fontFamily: MAIN_FONT,
    color: WHITE,
    fontSize: medium,
  },
  bottomContainer: {
    height: scale(411)
  },
  mainInfo: {
    width: '100%',
    paddingHorizontal: scale(25),
    paddingVertical: scale(10),
    borderBottomWidth: 0.5,
    borderColor: COLOR_NEW_GRAY
  },
  name: {
    fontSize: extralarge,
    fontFamily: MAIN_FONT,
    color: BLACK,
    lineHeight: scale(27)
  },
  speciality: {
    paddingVertical: scale(5),
    fontFamily: MAIN_FONT,
    fontSize: medium,
    color: ACCENT_BLUE
  },
  category: {
    fontFamily: MAIN_FONT,
    fontSize: medium,
    color: DARK_GREY
  },
  blockInfo: {
    width: '100%',
    paddingVertical: scale(10),
    paddingHorizontal: scale(25),
    paddingBottom: scale(140),
  },
  wrapBtnQuest: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: scale(16),
    borderBottomWidth: 0.5,
    borderColor: COLOR_NEW_GRAY
  },
  btnQuest: {
    width: scale(250),
    height: scale(53),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(30),
    borderWidth: 1.5,
    borderColor: ACCENT_BLUE
  },
  iconQuest: {
    width: scale(35),
    height: scale(35)
  },
  textBtn: {
    fontFamily: MAIN_FONT,
    paddingLeft: scale(5),
    fontSize: normal
  },
  textQuestion: {
    fontFamily: FONT_LIGHT,
    fontSize: medium,
    paddingVertical: scale(8)
  },
  more: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  arrow: {
    marginLeft: 5,
    height: scale(8),
    width: scale(12)
  },
  arrowActive: {
    marginLeft: 5,
    height: scale(8),
    width: scale(12),
    transform: [{
      rotate: '180deg'
    }]
  },
  openInfo: {
    fontFamily: FONT_LIGHT,
    fontSize: normal,
    color: COLOR_TEXT_GREEN
  },
  btnWrap: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    width: '100%',
    bottom: scale(20),
    zIndex: 14,
    paddingTop: scale(10),
    paddingBottom: scale(20),
    paddingHorizontal: scale(25)
  },
  redBtn: {
    zIndex: 15,
  },
  emptyData: {
    width: '100%',
    paddingTop: scale(20),
    textAlign: 'center',
    fontSize: normal
  }
});

export const stylesHtml = StyleSheet.create({
  p: {
    margin: 0,
    fontSize: medium,
    fontFamily: FONT_LIGHT,
    color: ACCENT_BLUE,
    lineHeight: scale(20)
  },
  ul: {
    marginTop: 0,
    padding: 0,
  },
  li: {
    color: MEDIUM_BLACK,
  }
});
