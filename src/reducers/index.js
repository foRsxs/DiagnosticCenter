import * as types from '../types';
import { combineReducers } from 'redux';

const initialState = {}

function userCreateReducer(state = initialState, action) {
    switch (action.type) {
      case types.CREATE_USER:
        return {
          ...state,
          user: action.user
        }
      default:
        return state
    }
  }

const rootReducer = combineReducers({
    userCreateReducer,
});

export default rootReducer;