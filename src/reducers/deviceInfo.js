import * as types from '../types/content';
import {initialState} from '../store/initialState';

export default function contentReducer(state = initialState.deviceInfo, action) {
  switch (action.type) {
    case types.SET_APP_PARAMS_CONFIG:
      return {
        ...state,
        appParamsConfig: action.data,
      }    
    default:
      return state
  }
}