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
    padding: 15,
    paddingBottom: 20
  },
  confirmListItem: {
    marginRight: 0,
    marginLeft: 0,
    paddingRight: 11
  },
  wrapAuthView: {
    position: 'relative',
    alignItems: 'center',
    zIndex: 3,
    height: '100%',
    flex: 1,
    padding: 15,
    paddingBottom: 16
  },
  wrapLanguage: {
    flexDirection: 'row',
    backgroundColor: COLOR_LIGHT_GRAY,
    borderRadius: 10
  },
  authTitle: {
    textAlign: 'center',
    fontSize: extralarge,
    fontFamily: MAIN_FONT,
    color: BLACK
  },
  wrapForm: {
    marginVertical: 25,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: ACCENT_BLUE,
    paddingLeft: 20
  },
  authMessage: {
    color: ACCENT_BLUE,
    fontFamily: MAIN_FONT,
    textAlign: 'center',
    marginTop: 10,
    fontSize: medium
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    fontSize: normal
  },
  wrapScan: {
    position: 'relative',
    zIndex: 2,
    flex: 1,
    paddingBottom: 20
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
    paddingBottom: 20
  },
  pinContent: {
    position: 'relative',
    zIndex: 2,
    justifyContent: 'space-between',
    padding: 15,
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
    width: width - 50,
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: large,
    fontFamily: MAIN_FONT,
    color: MEDIUM_BLACK,
    backgroundColor: WHITE,
  },
  title: {
    color: BLACK,
    fontFamily: MAIN_FONT,
    fontSize: large,
    marginTop: 20,
    zIndex: 1,
    textAlign: 'center',
    width: width
  },
  langActive: {
    backgroundColor: COLOR_BLUE,
    borderRadius: 10,
    color: WHITE,
    paddingHorizontal: 10,
    fontFamily: MAIN_FONT,
    fontSize: variables.fSize.main,
    zIndex: 10
  },
  lang: {
    color: COLOR_BLUE,
    paddingHorizontal: 10,
    fontFamily: MAIN_FONT,
    fontSize: variables.fSize.main,
    zIndex: 10,
  },
  smsTitle: {
    textAlign: 'center',
    paddingHorizontal: 50
  },
  inputSMS: {
    letterSpacing: 10,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: COLOR_BLUE,
    borderRadius: 5,
    marginVertical: 50,
    width: width - 50,
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: large,
    fontFamily: MAIN_FONT,
    color: MEDIUM_BLACK,
    backgroundColor: WHITE,
  }
});
