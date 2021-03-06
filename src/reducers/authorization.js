import * as types from '../types/auth';
import {initialState} from '../store/initialState';
  
export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case types.LOG_OUT:
      return {
        ...state,
        token: null,
        confirmed_auth: false,
        methods_auth: false,
        notify: true,
        pinCode: null,
        isGuest: true,
        enableSecure: false,
        user: {}
      }
    case types.SET_CURRENT_LANG: 
      return {
        ...state,
        language: action.data
      }
    case types.SET_NOTIFY: 
      return {
        ...state,
        notify: action.data
      }
    case types.SET_SECURE:
      return {
        ...state,
        enableSecure: action.data
      }
    case types.SET_USER_GUEST:
      return {
        ...state,
        isGuest: true
      }
    case types.SET_USER: 
      return {
        ...state,
        user: action.user,
        isGuest: false
      }
    case types.SET_USER_DATA:
      return {
        ...state,
        token: action.user.api_token,
        user: action.user,
        isGuest: false
      }
    case types.SET_METHODS_AUTH:
      return {
        ...state,
        methods_auth: action.data.methods_auth,
        confirmed_auth: action.data.confirmed,
      }
    case types.SET_PIN_CODE:
      return {
        ...state,
        pinCode: action.code.code,
        confirmed_auth: action.code.confirmed,
      }
    case types.SET_AUTHORIZED:
      return {
        ...state,
        confirmed_auth: action.value,
      }
    case types.SET_METHODS_AUTH_DEVICE:
      return {
        ...state,
        device_touch: action.data.touch,
        device_face: action.data.face,
      }
    default:
      return state
  }
}