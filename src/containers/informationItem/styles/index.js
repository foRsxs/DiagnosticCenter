import {
  StyleSheet,
  Platform
} from 'react-native';

import {
  isIphoneXorAbove
} from '../../../utils/helpers';
import variables, {
  scale
} from '../../../styles/variables';

export default StyleSheet.create({
  mainContainer: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%'
  },
  textWrap: {
    backgroundColor: 'white',
    padding: scale(15),
    marginTop: scale(10)
  },
  iconList: {
    width: '100%',
    height: scale(200),
    borderRadius: scale(8),
    marginTop: scale(10)
  },
  imageWrapper: {
    paddingHorizontal: scale(10),
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeBtn: {
    position: 'absolute',
    right: scale(25),
    top: (Platform.OS === 'ios' && isIphoneXorAbove()) ? scale(45) : scale(25),
    zIndex: 10
  }
});
