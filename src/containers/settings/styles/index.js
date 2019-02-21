import { StyleSheet } from 'react-native';

import variables from '../../../styles/variables';
const { medium } = variables.fSize;
import { MEDIUM_BLACK, MAIN_FONT, WHITE } from '../../../styles/constants';

export default StyleSheet.create({
  mainContainer: {
    justifyContent: 'space-between', 
    flexDirection: 'column', 
    height: '100%'
  },
  mainContent: {
    marginTop: -10, 
    zIndex: 1, 
    paddingTop: 10
  },
  pickerWrap: {
    width: '100%', 
    position: 'relative'
  },
  form: { 
    width: '40%' 
  },
  settingItem: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  headTxt: {
    fontSize: medium,
    fontFamily: MAIN_FONT,
    color: MEDIUM_BLACK,
    width: '60%'
  },
  pickerIcon: {
    position: 'absolute', 
    top: 10,
    right: 5, 
    backgroundColor: WHITE, 
    marginLeft: 0,
    paddingHorizontal: 5, 
    paddingTop: 0, 
    marginRight: 0
  }, 
  btnWrap: {
    paddingHorizontal: 15, 
    paddingVertical: 20
  }
});