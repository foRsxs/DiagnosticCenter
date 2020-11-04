import { StyleSheet, Dimensions } from 'react-native';

import { MAIN_FONT, BACKGROUND_POPUP } from '../../../../styles/constants';
import variables, {scale} from '../../../../styles/variables';
const { large } = variables.fSize;
let {
  width,
  height
} = Dimensions.get('window');

export default StyleSheet.create({
  title: {
    textAlign: 'center', 
    marginBottom: 10,
    fontFamily: MAIN_FONT,
    fontSize: large, 
  },
  popupWrap: {
    width: width,
    height: height + 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND_POPUP
  },
  popup: {
    width: '80%',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    padding: scale(20),
    justifyContent: 'space-between'
  }
})

