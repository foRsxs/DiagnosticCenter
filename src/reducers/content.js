import * as types from '../types/content';

const initialState = {
  ListSpecialization: [],
  listDoctors: []
}
  
export default function contentReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_LIST_SPECIALIZATION:
      return {
        ...state,
        ListSpecialization: action.data,
      }
    case types.SET_LIST_DOCTORS:
      return {
        ...state,
        listDoctors: action.data,
      }
    default:
      return state
  }
}