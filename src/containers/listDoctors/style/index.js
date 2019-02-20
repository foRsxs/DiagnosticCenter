import {
  StyleSheet
} from 'react-native';

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
  MEDIUM_BLACK
} from '../../../styles/constants';

const {
  medium,
  extralarge,
  normal
} = variables.fSize;

export const styles = StyleSheet.create({
  imgWrap: {
    width: '100%',
    height: scale(200),
    position: 'absolute',
    top: scale(10),
    alignItems: 'center',
  },
  avatar: {
    width: scale(200),
    height: scale(200),
    borderRadius: scale(100),
    borderWidth: 1,
    borderColor: ACCENT_BLUE,
    zIndex: 10
  },
  topContent: {
    height: scale(195),
    width: '100%',
    backgroundColor: BACKGROUND_BLUE,
    marginTop: scale(-15),
    justifyContent: 'flex-end'
  },
  tabs: {
    flexDirection: 'row',
    width: '100%'
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
    fontSize: medium
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
    color: BLACK
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
    paddingBottom: scale(120),
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
    paddingLeft: scale(5)
  },
  textQuestion: {
    fontFamily: MAIN_FONT,
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
    fontFamily: MAIN_FONT,
    fontSize: normal,
    color: COLOR_TEXT_GREEN
  },
  btnWrap: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    width: '100%',
    bottom: 0,
    zIndex: 14,
    paddingBottom: scale(35),
    paddingHorizontal: scale(25)
  },
  redBtn: {
    width: scale(325),
    height: scale(50),
    zIndex: 15,
  },
  emptyData: {
    width: '100%',
    paddingTop: scale(20),
    textAlign: 'center'
  }
});

export const stylesHtml = StyleSheet.create({
  p: {
    margin: 0,
    fontSize: medium,
    fontFamily: MAIN_FONT,
    color: ACCENT_BLUE
  },
  ul: {
    marginTop: 0,
    padding: 0,
  },
  li: {
    color: MEDIUM_BLACK,
  }
});
