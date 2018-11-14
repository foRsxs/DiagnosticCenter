import * as types from '../types/auth';

const initialState = {
  token: null,
  confirmed_auth: false,
  methods_auth: null,
  pinCode: null,
  user: {}
}
  
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_USER_DATA:
      return {
        ...state,
        token: action.user.api_token,
        user: action.user
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
    default:
      return state
  }
}