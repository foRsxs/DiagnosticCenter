import axios from 'react-native-axios'
import {Alert, AsyncStorage} from 'react-native';
import * as types from '../types/content';
import {APP_API_URL} from '../config';

export function getListSpecialization(type) {
  return (dispatch) => {
    if (true) { 
      axios.post(`${APP_API_URL}/specs`, {
        type: type
      })
      .then((response) => {
        dispatch(setListSpecialization(response.data))
      })
    } else {
      Alert.alert('Интернет соединение отсутствует');
    }
  }
}

export function getListDoctors(spec_id) {
  return (dispatch) => {
    if (true) { 
      const params = {}
      if (spec_id) params.spec_id = spec_id;
      axios.post(`${APP_API_URL}/doctors`, params)
      .then((response) => {
        dispatch(setListDoctors(response.data))
      })
    } else {
      Alert.alert('Интернет соединение отсутствует');
    }
  }
}

export function getListServices(type) {
  return (dispatch, getState) => {
    if (true) { 
      axios.post(`${APP_API_URL}/services`, {
        type: type
      })
      .then((response) => {
        console.log(response.data)
        //dispatch(setListSpecialization(response.data))
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
        console.log(response.data)
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
        console.log(response.data)
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