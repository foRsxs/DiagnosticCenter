import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const { small, medium, normal} = variables.fSize

import { DARK_GREY, BACKGROUND_BLUE, MEDIUM_BLACK, BLUE, RED, MAIN_FONT } from '../../styles/constants';

const styles = StyleSheet.create({
  bottomBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10
  },
  addInfoText: {
    width: '70%',
    color: DARK_GREY,
    fontFamily: MAIN_FONT,
    fontSize: small
  },
  specItem: {
    flex: 1,
    height: 70,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: "center",
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: BACKGROUND_BLUE,
    marginBottom: 10
  },
  itemWrap: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%'
  },
  wrapTxt: {
    position: 'relative',
    paddingVertical: 10,
    paddingLeft: 70,
    paddingRight: 20,
    alignItems: 'stretch',
    flexDirection: 'column',
    width: '100%',
    flexWrap: 'nowrap'
  },
  specItemText: {
    fontFamily: MAIN_FONT,
    fontSize: medium,
    color: MEDIUM_BLACK,
  },
  specItemSubText: {
    fontSize: normal,
    color: BLUE,
  },
  specIcon: {
    position: 'absolute',
    left: 0,
    width: 60,
    height: 70,
  },
  arrowWrap: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: RED,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: 20,
    height: '100%',
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