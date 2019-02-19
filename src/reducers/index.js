import { combineReducers } from 'redux';
import { reducer as network } from 'react-native-offline';

import authorization from './authorization';
import content from './content';

export default combineReducers({
  authorization,
  content,
  network
});
