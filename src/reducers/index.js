import { combineReducers } from 'redux';
import authorization from './authorization';
import content from './content';

const rootReducer = combineReducers({
  authorization,
  content
})

export default rootReducer