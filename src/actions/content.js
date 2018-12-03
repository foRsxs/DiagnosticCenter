import axios from 'react-native-axios'
import {Alert, AsyncStorage} from 'react-native';
import * as types from '../types/content';
import {APP_API_URL} from '../config';

export function getListSpecialization(type, order = false) {
  return (dispatch) => {
    if (true) { 
      axios.post(`${APP_API_URL}/specs`, {
        type: type
      })
      .then((response) => {
        (order) ? dispatch(setListSpecializationOrder(response.data)) : dispatch(setListSpecialization(response.data))
      })
    } else {
      Alert.alert('Интернет соединение отсутствует');
    }
  }
}

export function getListDoctors(spec_id, order = false) {
  return (dispatch) => {
    if (true) { 
      const params = {}
      if (spec_id) params.spec_id = spec_id;
      axios.post(`${APP_API_URL}/doctors`, params)
      .then((response) => {
        (order) ? dispatch(setListDoctorsOrder(response.data)) : dispatch(setListDoctors(response.data));
      })
    } else {
      Alert.alert('Интернет соединение отсутствует');
    }
  }
}

export function getListServices(id) {
  return (dispatch, getState) => {
    if (true) { 
      axios.post(`${APP_API_URL}/services`, {
        spec_id: id
      })
      .then((response) => {
        dispatch(setListServicesOrder(response.data))
      })
    } else {
      Alert.alert('Интернет соединение отсутствует');
    }
  }
}

export function getDoctor(doc_id) {
  return (dispatch) => {
    if (true) { 
      axios.post(`${APP_API_URL}/doctor`, {
        doc_id
      })
      .then((response) => {
        dispatch(setDoctorData(response.data))
      })
    } else {
      Alert.alert('Интернет соединение отсутствует');
    }
  }
}

export function getSales() {
  return (dispatch) => {
    if (true) { 
      axios.get(`${APP_API_URL}/sales`)
      .then((response) => {
        dispatch(setSales(response.data))
      })
    } else {
      Alert.alert('Интернет соединение отсутствует');
    }
  }
}

export function getListInformation() {
  return (dispatch) => {
    if (true) { 
      axios.post(`${APP_API_URL}/articles`)
      .then((response) => {
        dispatch(setListInformation(response.data))
      })
    } else {
      Alert.alert('Интернет соединение отсутствует');
    }
  }
}

export function getPost(post_id) {
  return (dispatch) => {
    if (true) { 
      axios.post(`${APP_API_URL}/articles`,{post_id})
      .then((response) => {
        dispatch(setPost(response.data))
      })
    } else {
      Alert.alert('Интернет соединение отсутствует');
    }
  }
}

export function getQuestions(doc_id) {
  return (dispatch, getState) => {
    const { authorization } = getState();
    if (true) { 
      axios.post(`${APP_API_URL}/questions`,{
        doc_id,
        api_token: authorization.token
      })
      .then((response) => {
        console.log(response.data)
        dispatch(setQuestion(response.data))
      })
    } else {
      Alert.alert('Интернет соединение отсутствует');
    }
  }
}

export function getOftenQuestions() {
  return (dispatch, getState) => {
    if (true) { 
      axios.post(`${APP_API_URL}/faq`)
      .then((response) => {
        console.log(response.data)
        dispatch(setOftenQuestion(response.data))
      })
    } else {
      Alert.alert('Интернет соединение отсутствует');
    }
  }
}

export function getListDates(docdep_id) {
  return (dispatch, getState) => {
    if (true) { 
      const { authorization } = getState();
      axios.post(`${APP_API_URL}/rnumb_date`,{
        api_token: authorization.token,
        docdep_id
      })
      .then((response) => {
        console.log(response.data)
        dispatch(setListDates(response.data))
      })
    } else {
      Alert.alert('Интернет соединение отсутствует');
    }
  }
}

export function setOrder(data, type, nameDispatch) {
  return (dispatch, getState) => {
    const { content: {order} } = getState();
    if (type === 'type') {
      dispatch(cleareOrderSuccess());
      if (!order[type] || order[type] !== data[type]) dispatch(getListSpecialization(data[type], true));
    } else if (type === 'spec_id') {
      if (order.servid) dispatch(cleareOrderSuccess('spec_id'));
      if (!order[type] || order[type] !== data[type]) dispatch((nameDispatch == 'doc') ? getListDoctors(data[type], true) : getListServices(data[type], true));
    } else if (type === 'servid') {
      if (order.docdep_id) dispatch(cleareOrderSuccess('servid'));
      if (!order[type] || order[type] !== data[type]) dispatch(getListDoctors( order.spec_id, true));
    } else if (type === 'docdep_id') {
      if (order.date) dispatch(cleareOrderSuccess('docdep_id'));
      if (!order[type] ||  order[type] !== data[type]) dispatch(getListDates( data[type], true))
    }
    dispatch(setOrderSuccess(data))
  }
}

export function sendQuestion({type, question, email, doc_id}) {
  return (dispatch, getState) => {
    dispatch(sendQuestionSuccess({loading: true, status: false}))
    const { authorization } = getState();
    const params = {
      api_token: authorization.token,
      question, 
      email
    }
    if (doc_id) params.doc_id = doc_id
    if (true) { 
      axios.post(`${APP_API_URL}/${type}`, params)
      .then((response) => {
        if (response.data.code === 200) dispatch(sendQuestionSuccess({loading: false, status: true}))
      })
    } else {
      Alert.alert('Интернет соединение отсутствует');
    }
    setTimeout(()=> {
      dispatch(sendQuestionSuccess({loading: false, status: false}))
    }, 3000)
  }
}

export function cleareOrderSuccess(type) {
  return {
    type: types.CLEARE_ORDER,
    data: type
  }
}

export function setOrderSuccess(data) {
  return {
    type: types.UPDATE_ORDER,
    data: data
  }
}

export function setListDates(data) {
  return {
    type: types.UPDATE_LIST_DATES,
    data: {dates: data}
  }
}

export function sendQuestionSuccess(data) {
  return {
    type: types.SENDED_MESSAGE_SUCCESS,
    data: data
  }
}

export function setListSpecialization(data) {
  return {
    type: types.SET_LIST_SPECIALIZATION,
    data: data
  }
}

export function setListSpecializationOrder(data) {
  return {
    type: types.SET_LIST_SPECIALIZATION_ORDER,
    data: {specialities: data}
  }
}

export function setListServicesOrder(data) {
  return {
    type: types.SET_LIST_SERVICES_ORDER,
    data: {services: data}
  }
}

export function setListDoctorsOrder(data) {
  console.log(data)
  return {
    type: types.SET_LIST_DOCTORS_ORDER,
    data: {doctors: data}
  }
}

export function setListDoctors(data) {
  return {
    type: types.SET_LIST_DOCTORS,
    data: data
  }
}

export function setDoctorData(data) {
  return {
    type: types.SET_DOCTOR_DATA,
    data: data
  }
}

export function setSales(data) {
  return {
    type: types.SET_SALES,
    data: data
  }
}

export function setListInformation(data) {
  return {
    type: types.SET_LIST_INFORMATION,
    data: data
  }
}

export function setPost(data) {
  return {
    type: types.SET_POST,
    data: data
  }
}

export function setQuestion(data) {
  return {
    type: types.SET_QUESTION,
    data: data
  }
}

export function setOftenQuestion(data) {
  return {
    type: types.SET_OFTEN_QUESTION,
    data: data
  }
}

export function setAuthMessage(mess) {
  return {
    type: types.SET_AUTH_MESSAGE,
    data: mess
  }
}