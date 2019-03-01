import { StyleSheet } from 'react-native';

import variables from '../../../../styles/variables';
import { BLACK, MAIN_FONT } from '../../../../styles/constants';

const { large } = variables.fSize;

export default StyleSheet.create({
  actionsWrap: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionsImg: {
    width: 20,
    height: 15,
    marginRight: 10
  },
  topLink: {
    paddingVertical: 2,
    marginVertical: 10,
  },
  bottomLink: {
    paddingVertical: 2,
    marginTop: 0
  },
  linkText: {
    color: BLACK,
    fontFamily: MAIN_FONT,
    fontSize: large
  }
});
