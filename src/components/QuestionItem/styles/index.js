import { StyleSheet } from 'react-native';
import variables from '../../../styles/variables';
import { BACKGROUND_BLUE, BLACK, ACCENT_BLUE, MAIN_FONT } from '../../../styles/constants';

const { main } = variables.fSize;

export default StyleSheet.create({
  questionItem: {
    borderRadius: 10,
    alignItems: "center",
    width: '100%',
    backgroundColor: BACKGROUND_BLUE,
    marginBottom: 10,
    padding: 10
  },
  questionItemText: {
    fontSize: main,
    fontFamily: MAIN_FONT,
    color: BLACK,
    textAlign: 'justify'
  },
  answerItemText: {
    fontSize: main,
    fontFamily: MAIN_FONT,
    color: ACCENT_BLUE,
    textAlign: 'justify',
    paddingTop: 5
  },
  buttonTextClose: {
    textAlign: 'right',
    alignItems: 'center'
  },
  icon: {
    color: ACCENT_BLUE,
    fontSize: main,
    fontFamily: MAIN_FONT,
    paddingLeft: 10
  },
  buttonTextShow: {
    textAlign: 'right',
    fontSize: main,
    fontFamily: MAIN_FONT,
    color: ACCENT_BLUE,
    alignItems: 'center'
  }
})