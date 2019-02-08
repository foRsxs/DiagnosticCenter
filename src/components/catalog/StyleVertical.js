import { StyleSheet, Dimensions } from 'react-native';
import variables from '../../styles/variables';

let { height } = Dimensions.get('window')
const { medium, normal} = variables.fSize

import { BACKGROUND_BLUE, MEDIUM_BLACK, BLUE, RED, MAIN_FONT } from '../../styles/constants';

const styles = StyleSheet.create({
  itemWrap: {
    backgroundColor: BACKGROUND_BLUE,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    width: '100%',
    flex: 1,
    height: 210
  },
  wrapTxt: {
    alignItems: 'center',
    width: '100%',
    padding: 5,
  },
  specItemText: {
    textAlign: 'center',
    lineHeight: 18,
    fontFamily: MAIN_FONT,
    fontSize: medium,
    color: MEDIUM_BLACK,
  },
  specItemSubText: {
    fontFamily: MAIN_FONT,
    fontSize: normal,
    color: BLUE,
  },
  specIcon: {
    width: '100%',
    height: height/5,
  },
  arrowWrap: {
    backgroundColor: RED,
    width: '100%',
    height: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    color: 'white',
    fontFamily: MAIN_FONT,
    fontSize: medium
  }
});

export default styles;