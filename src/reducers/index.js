import { combineReducers } from 'redux';

import authorization from './authorization';
import content from './content';
import deviceInfo from './deviceInfo';

export default combineReducers({
  authorization,
  content,
  deviceInfo
});
