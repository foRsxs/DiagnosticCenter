import { StyleSheet } from 'react-native';

import variables, {scale} from '../../../styles/variables';
const { medium } = variables.fSize;
import { MEDIUM_BLACK, MAIN_FONT, WHITE } from '../../../styles/constants';

export default StyleSheet.create({
  mainContainer: {
    justifyContent: 'space-between', 
    flexDirection: 'column', 
    height: '100%'
  },
  mainContent: {
    marginTop: scale(-10), 
    zIndex: 1, 
    paddingTop: scale(10)
  },
  pickerWrap: {
    width: '100%', 
    position: 'relative',
  },
  form: { 
    width: '40%' 
  },
  settingItem: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: scale(15)
  },
  headTxt: {
    fontSize: medium,
    fontFamily: MAIN_FONT,
    color: MEDIUM_BLACK,
    width: '60%'
  },
  pickerIcon: {
    position: 'absolute', 
    top: scale(10),
    right: scale(5), 
    backgroundColor: WHITE, 
    marginLeft: 0,
    paddingHorizontal: scale(5), 
    paddingTop: 0, 
    marginRight: 0
  }, 
  btnWrap: {
    paddingHorizontal: scale(15), 
    paddingVertical: scale(30)
  },
  switchStyle: { 
    transform: [{ scaleX: scale(1) }, { scaleY: scale(1) }] 
  },
});