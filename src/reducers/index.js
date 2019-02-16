import { combineReducers } from 'redux';

import authorization from './authorization';
import specialties from './specialties';
import content from './content';

export default combineReducers({
  authorization,
  specialties,
  content
});
