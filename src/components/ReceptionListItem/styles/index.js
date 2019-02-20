import { StyleSheet } from 'react-native';
import variables from '../../../styles/variables';
import { BACKGROUND_BLUE, BLACK, ACCENT_BLUE, MAIN_FONT, RED, MEDIUM_BLACK } from '../../../styles/constants';

const { medium, normal, main } = variables.fSize;

export default StyleSheet.create({
  moreIcon: {
    justifyContent: 'center',
    paddingLeft: 5,
    width: 25,
    height: 30,
    position: 'absolute',
    top: 10,
    right: 5,
    backgroundColor: 'transparent'
  },
  receptionItem: {
    borderRadius: 10,
    alignItems: "flex-start",
    width: '100%',
    backgroundColor: BACKGROUND_BLUE,
    marginBottom: 10,
    padding: 10,
    position: 'relative',
  },
  receptionItemDisable: {
    borderRadius: 10,
    alignItems: "flex-start",
    width: '100%',
    backgroundColor: BACKGROUND_BLUE,
    marginBottom: 10,
    padding: 10,
    position: 'relative',
    opacity: 0.5
  },
  txtHead: {
    color: BLACK,
    fontSize: medium
  },
  txtHeadServ: {
    color: BLACK,
    fontFamily: MAIN_FONT,
    fontSize: normal,
    paddingTop: 3
  },
  txtTime: {
    color: ACCENT_BLUE,
    fontFamily: MAIN_FONT,
    fontSize: main
  },
  txtName: {
    color: MEDIUM_BLACK,
    fontFamily: MAIN_FONT,
    fontSize: normal,
    marginTop: 5
  },
  disableText: {
    textAlign: 'right',
    width: 50,
    height: 30,
    fontSize: normal,
    fontFamily: MAIN_FONT,
    color: RED,
    position: 'absolute',
    bottom: 10,
    right: 10
  }
})