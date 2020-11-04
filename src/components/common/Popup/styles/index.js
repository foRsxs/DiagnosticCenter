import {
  StyleSheet,
  Dimensions
} from 'react-native';

import variables, {scale} from '../../../../styles/variables';
import {
  BACKGROUND_POPUP,
  MEDIUM_BLACK
} from '../../../../styles/constants';

let {
  width,
  height
} = Dimensions.get('window');

export default StyleSheet.create({
  popupWrap: {
    width: width,
    height: height,
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
  },
  text: {
    color: MEDIUM_BLACK,
    fontSize: variables.fSize.large,
    width: '100%',
    textAlign: 'center'
  }
});
