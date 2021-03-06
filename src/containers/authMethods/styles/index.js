import { StyleSheet, Dimensions} from 'react-native';

import variables, { scale } from '../../../styles/variables';
import {
  ACCENT_BLUE,
  WHITE,
  MEDIUM_BLACK,
  MAIN_FONT,
  BLACK,
  COLOR_LIGHT_GRAY,
  COLOR_BLUE
} from '../../../styles/constants';

let { width, height } = Dimensions.get('window');
const {
  extralarge,
  large,
  normal,
  main,
  medium
} = variables.fSize;

export default StyleSheet.create({
  wrapConfirmCode: {
    position: 'relative',
    zIndex: 2,
    flex: 1,
    padding: scale(15),
    paddingBottom: scale(20)
  },
  confirmListItem: {
    marginRight: 0,
    marginLeft: 0,
    paddingRight: scale(11)
  },
  wrapAuthView: {
    position: 'relative',
    alignItems: 'center',
    zIndex: 3,
    height: '100%',
    flex: 1,
    padding: scale(15),
    paddingBottom: scale(16)
  },
  authTitle: {
    textAlign: 'center',
    fontSize: extralarge,
    fontFamily: MAIN_FONT,
    color: BLACK
  },
  wrapForm: {
    marginVertical: scale(25),
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: ACCENT_BLUE,
    paddingLeft: scale(20)
  },
  authMessage: {
    color: ACCENT_BLUE,
    fontFamily: MAIN_FONT,
    textAlign: 'center',
    marginTop: scale(10),
    fontSize: medium
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: scale(10),
    fontSize: normal
  },
  wrapScan: {
    position: 'relative',
    zIndex: 2,
    flex: 1,
    paddingBottom: scale(20)
  },
  scanClick: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scanClickText: {
    color: 'transparent'
  },
  wrapPin: {
    position: 'relative',
    zIndex: 2,
    flex: 1,
    paddingBottom: scale(20)
  },
  pinContent: {
    position: 'relative',
    zIndex: 2,
    justifyContent: 'space-between',
    padding: scale(15),
    paddingBottom: 0,
    height: '100%'
  },
  wrapMain: {
    flex: 1
  },
  contentStyleMain: {
    flexGrow: 1,
    justifyContent: 'space-around'
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: WHITE,
  },
  logo: {
    position: 'absolute',
    zIndex: 10
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: width - scale(50),
    height: scale(50),
    paddingLeft: scale(10),
    paddingRight: scale(10),
    fontSize: large,
    fontFamily: MAIN_FONT,
    color: MEDIUM_BLACK,
    backgroundColor: WHITE,
  },
  title: {
    color: BLACK,
    fontFamily: MAIN_FONT,
    fontSize: large,
    marginTop: scale(20),
    zIndex: 1,
    textAlign: 'center',
    width: '100%'
  },
  wrapLanguage: {
    flexDirection: 'row',
    backgroundColor: COLOR_LIGHT_GRAY,
    borderRadius: 10
  },
  langActiveWrap: {
    backgroundColor: COLOR_BLUE,
    borderRadius: 10,
    paddingHorizontal: scale(10),
    zIndex: 10
  },
  langWrap: {
    paddingHorizontal: scale(10),
    zIndex: 10,
  },
  langActive: {
    color: WHITE,
    fontFamily: MAIN_FONT,
    fontSize: variables.fSize.main,
  },
  lang: {
    color: COLOR_BLUE,
    fontFamily: MAIN_FONT,
    fontSize: variables.fSize.main,
  },
  smsTitle: {
    textAlign: 'center',
    paddingHorizontal: scale(50)
  },
  inputSMS: {
    letterSpacing: scale(10),
    textAlign: 'center',
    borderWidth: 1,
    borderColor: COLOR_BLUE,
    borderRadius: 5,
    marginVertical: scale(50),
    width: width - scale(50),
    height: scale(50),
    paddingLeft: scale(10),
    paddingRight: scale(10),
    fontSize: large,
    fontFamily: MAIN_FONT,
    color: MEDIUM_BLACK,
    backgroundColor: WHITE,
  },
  textItem: {
    fontSize: main,
    fontFamily: MAIN_FONT,
  },
  checkStyle: {
    transform: [{ scaleX: scale(1) }, { scaleY: scale(1) }] 
  },
  btnWrap: {
    paddingVertical: scale(10)
  }
});
