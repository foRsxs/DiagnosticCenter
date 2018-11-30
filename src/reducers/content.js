import * as types from '../types/content';

const initialState = {
  authMessage: null,
  ListSpecialization: null,
  listDoctors: [],
  doctorData: null,
  sales: null,
  listInformation: {
    list: null,
    post: null
  },
  questions: {
    often: null,
    doctors: null
  },
  newQuestion: {
    loading: false,
    status: false,  
  }
}
  
export default function contentReducer(state = initialState, action) {
  switch (action.type) {
    case types.SENDED_MESSAGE_SUCCESS: 
      return {
        ...state,
        newQuestion: action.data,
      }
    case types.SET_AUTH_MESSAGE: 
      return {
        ...state,
        authMessage: action.data,
      }
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
    case types.SET_DOCTOR_DATA:
      return {
        ...state,
        doctorData: action.data
      }
    case types.SET_SALES:
      return {
        ...state,
        sales: action.data
      }
    case types.SET_LIST_INFORMATION:
      return {
        ...state,
        listInformation: {
          list: action.data,
          post: state.listInformation.post
        }
      }
    case types.SET_POST:
      return {
        ...state,
        listInformation: {
          list: state.listInformation.list,
          post: action.data
        }
      }
    case types.SET_QUESTION:
      return {
        ...state,
        questions: {
          often: state.questions.often,
          doctors: action.data
        }
      }
    case types.SET_OFTEN_QUESTION:
      return {
        ...state,
        questions: {
          often: action.data,
          doctors: state.questions.doctors
        }
      }
    default:
      return state
  }
}