import * as types from '../types/content';
import {initialState} from '../store/initialState';

catNameFunc = (data) =>{
  let catName = null;
  let arr = [];
  data.forEach((item, i)=> {
    if(catName && catName === item.speciality){
      arr.forEach((k, y)=>{
        if(k.category===item.speciality){
          arr[y]['doctors'].push(item)
        }
      })
    } else {
      catName = item.speciality;
      arr.push({'category': catName, 'doctors': [item]});
    }
  })

  return arr;
}

sortedFunc = (data) =>{
  const sortData = data.sort((a, b) => { return a.specid - b.specid})
  return catNameFunc(sortData)
}
  
export default function contentReducer(state = initialState.content, action) {
  switch (action.type) {
    case types.UPDATE_NETWORK_CONNECTION:
      return {
        ...state,
        network_connect: action.data,
      }
    case types.SET_ANALIZES:
      return {
        ...state,
        analizes: {...state.analizes, ...action.data},
      }
    case types.SET_HISTORY:
      return {
        ...state,
        history: {...state.history, ...action.data},
      }
    case types.CLEARE_ORDER:
      return {
        ...state,
        order: {
          type: (action.data === 'spec_id' || action.data === 'servid' || action.data === 'docdep_id' || action.data === 'date') ? state.order.type : null,
          spec_id: (action.data === 'servid' || action.data === 'docdep_id' || action.data === 'date') ? state.order.spec_id : null,
          servid: (action.data === 'docdep_id' || action.data === 'date') ? state.order.servid: null,
          docdep_id: (action.data === 'date') ? state.order.docdep_id : null,
          date: null,
          time: null
        },
      }
    case types.UPDATE_LIST_TIMES: 
      return {
        ...state,
        orderDatas: {...state.orderDatas, ...action.data},
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
    case types.SET_LIST_TALONS: 
      return {
        ...state,
        listTalons: action.data,
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
        sortedListDoctor: sortedFunc(action.data)
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
      
    case types.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        orderCreated: action.data
      }
    case types.CLEARE_ORDER_DATA: 
      return {
        ...state,
        orderDatas: {
          specialities: [],
          services: [],
          doctors: [],
          dates: [],
          times: []
        }
      }
    case types.DELETED_ORDER_SUCCESS:
      return {
        ...state,
        orderDeleted: action.data
      }
    default:
      return state
  }
}