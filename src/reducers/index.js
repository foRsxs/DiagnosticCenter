import { combineReducers } from 'redux';

import authorization from './authorization';
import content from './content';

export default combineReducers({
  authorization,
  content
});
