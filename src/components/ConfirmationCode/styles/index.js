import { StyleSheet } from 'react-native';
import variables, {scale} from '../../../styles/variables';
import { ACCENT_BLUE, MAIN_FONT } from '../../../styles/constants';

const { medium } = variables.fSize;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    height: scale(50),
    fontSize: scale(45),
    fontFamily: MAIN_FONT,
    lineHeight: scale(47),
    padding: 0,
    margin: scale(15),
    marginTop: scale(10),
    marginBottom: scale(10),
    letterSpacing: scale(10),
    color: ACCENT_BLUE
  },
  text: {
    marginVertical: scale(10),
    fontSize: medium,
    fontFamily: MAIN_FONT,
    color: ACCENT_BLUE
  },
  message: {
    marginVertical: scale(10),
    fontSize: medium,
    fontFamily: MAIN_FONT,
    color: 'red'
  }
})