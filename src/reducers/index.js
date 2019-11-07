import { combineReducers } from 'redux';
import { reducer as network } from 'react-native-offline';

import authorization from './authorization';
import content from './content';
import deviceInfo from './deviceInfo';

export default combineReducers({
  authorization,
  content,
  deviceInfo,
  network
});
