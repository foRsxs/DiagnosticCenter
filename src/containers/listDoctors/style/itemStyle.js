import { StyleSheet } from 'react-native';
import variables, {scale} from '../../../styles/variables';
import {ACCENT_BLUE, BACKGROUND_BLUE, WHITE, COLOR_NEW_GRAY, BLACK, DARK_GREY, COLOR_TEXT_GREEN, MAIN_FONT, MEDIUM_BLACK } from '../../../styles/constants';

const { medium, extralarge, normal } = variables.fSize;

export const styles = StyleSheet.create({
  imgWrap: {
    width: '100%',
    height: scale(200),
		position: 'absolute',
		top: scale(10),
    alignItems: 'center'
  },
  avatar: {
    width: scale(200),
		height: scale(200),
		borderRadius: scale(100),
		zIndex: 10
	},
	topContent: {
		height: scale(195),
		width: '100%',
		backgroundColor: BACKGROUND_BLUE,
    top: scale(-20),
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
    paddingHorizontal: scale(15),
    paddingBottom: scale(10),
    borderBottomWidth: 0.5,
    borderColor: COLOR_NEW_GRAY
  },
  name: {
    fontFamily: MAIN_FONT,
    fontSize: extralarge,
    color: BLACK
  },
  speciality: {
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
    paddingHorizontal: scale(15),
    marginBottom: scale(85)
  },
  emptyBlock:{
    width: '100%',
    height: scale(85)
  },
  wrapBtnQuest: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: scale(10),
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
		transform: [{ rotate: '180deg'}]
	},
	openInfo: {
    fontFamily: MAIN_FONT,
		fontSize: normal,
		color: COLOR_TEXT_GREEN
  },
  btnWrap: {
    position: 'absolute',
    bottom: 0,
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
    paddingTop: scale(50),
    textAlign: 'center'
  }
});
  
export const stylesHtml = StyleSheet.create({
    p: {
      margin: 0,
      fontSize: variables.fSize.main, 
      fontFamily: MAIN_FONT, 
      color: MEDIUM_BLACK
    },
    ul: {
      marginTop: 0,
      padding: 0,
    },
  });