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
  },
  order: {
    type: null,
    spec_id: null,
    servid: null,
    docdep_id: null,
    date: null,
    time: null
  },
  orderDatas: {
    specialities: [],
    services: [],
    doctors: [],
    dates: [],
    times: []
  }
}
  
export default function contentReducer(state = initialState, action) {
  switch (action.type) {
    case types.CLEARE_ORDER:
      return {
        ...state,
        order: {
          type: (action.data === 'spec_id' || action.data === 'servid' || action.data === 'docdep_id') ? state.order.type : null,
          spec_id: (action.data === 'servid' || action.data === 'docdep_id') ? state.order.spec_id : null,
          servid: (action.data === 'docdep_id') ? state.order.servid: null,
          docdep_id: null,
          date: null,
          time: null
        },
      }
    case types.UPDATE_LIST_DATES: 
      return {
        ...state,
        orderDatas: {...state.orderDatas, ...action.data},
      }
    case types.SET_LIST_SPECIALIZATION_ORDER:
      return {
        ...state,
        orderDatas: {...state.orderDatas, ...action.data},
      }
    case types.SET_LIST_SERVICES_ORDER: 
      return {
        ...state,
        orderDatas: {...state.orderDatas, ...action.data},
      }
    case types.SET_LIST_DOCTORS_ORDER: 
      return {
        ...state,
        orderDatas: {...state.orderDatas, ...action.data},
      }
    case types.UPDATE_ORDER: 
      return {
        ...state,
        order: {...state.order, ...action.data},
      }
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