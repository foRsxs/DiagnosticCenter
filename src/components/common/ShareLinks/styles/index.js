import { StyleSheet } from 'react-native';

import variables, {scale} from '../../../../styles/variables';
import { BLACK, MAIN_FONT } from '../../../../styles/constants';

const { large } = variables.fSize;

export default StyleSheet.create({
  actionsWrap: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionsImg: {
    width: scale(20),
    height: scale(15),
    marginRight: scale(10)
  },
  topLink: {
    paddingVertical: scale(2),
    marginVertical: scale(10),
  },
  bottomLink: {
    paddingVertical: scale(2),
    marginTop: 0
  },
  linkText: {
    color: BLACK,
    fontFamily: MAIN_FONT,
    fontSize: large
  }
});
