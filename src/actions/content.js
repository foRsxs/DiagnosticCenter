import axios from 'react-native-axios'
import {Alert, AsyncStorage} from 'react-native';
import * as types from '../types/content';
import {APP_API_URL} from '../config';

export function getListSpecialization(type) {
  return (dispatch, getState) => {
    const { authorization } = getState();
    if (true) { 
      axios.post(`${APP_API_URL}/specs`, {
        api_token: authorization.token,
        type: type
      })
      .then((response) => {
        console.log(response.data)
        dispatch(setListSpecialization(response.data))
      })
    } else {
      Alert.alert('Интернет соединение отсутствует');
    }
  }
}

export function getListDoctors(spec_id) {
  return (dispatch, getState) => {
    const { authorization } = getState();
    if (true) { 
      const params = {api_token: authorization.token}
      if (spec_id) params.spec_id = spec_id;
      axios.post(`${APP_API_URL}/doctors`, params)
      .then((response) => {
        console.log(response.data)
        dispatch(setListDoctors(response.data))
      })
    } else {
      Alert.alert('Интернет соединение отсутствует');
    }
  }
}

export function getListServices(type) {
  return (dispatch, getState) => {
    const { authorization } = getState();

    if (true) { 
      axios.post(`${APP_API_URL}/services`, {
        api_token: authorization.token,
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

export function getDoctor(keyid) {
  
  return (dispatch, getState) => {
    const { authorization } = getState();
    console.log(keyid, authorization.token)
    if (true) { 
      axios.post(`${APP_API_URL}/doctor`, {
        api_token: authorization.token,
        keyid: keyid
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