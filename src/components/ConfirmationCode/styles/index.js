import { StyleSheet } from 'react-native';
import variables from '../../../styles/variables';
import { ACCENT_BLUE, MAIN_FONT } from '../../../styles/constants';

const { medium } = variables.fSize;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    height: 50,
    fontSize: 45,
    fontFamily: MAIN_FONT,
    lineHeight: 47,
    padding: 0,
    margin: 15,
    marginTop: 10,
    marginBottom: 10,
    letterSpacing: 10,
    color: ACCENT_BLUE
  },
  text: {
    marginVertical: 10,
    fontSize: medium,
    fontFamily: MAIN_FONT,
    color: ACCENT_BLUE
  },
  message: {
    marginVertical: 10,
    fontSize: medium,
    fontFamily: MAIN_FONT,
    color: 'red'
  }
})