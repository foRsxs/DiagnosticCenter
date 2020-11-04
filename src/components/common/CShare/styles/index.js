import { StyleSheet } from 'react-native';

import  {scale} from '../../../../styles/variables';

export default StyleSheet.create({
  moreIcon: {
    justifyContent: 'center',
    paddingLeft: scale(5),
    width: scale(24),
    height: scale(27),
    backgroundColor: 'transparent'
  },
  icon: {
    width: scale(24),
    height: scale(27),
  }
})
