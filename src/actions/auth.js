import axios from 'react-native-axios'
import {Alert, AsyncStorage} from 'react-native';
import * as types from '../types/auth';
import {APP_API_URL} from '../config';

export function authUser(data) {
  return (dispatch, getState) => {
    //const { home } = getState();
    if (true) { 
      return axios.post(`${APP_API_URL}/get_patient`, data)
      .then((response) => {
        dispatch(saveUser(response.data))
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        return Promise.reject({error: error.response.data.message});
      });
    } else {
      Alert.alert('Интернет соединение отсутствует');
      return Promise.reject();
    }
  }
}

export function saveUser(data) {
  if (data.api_token) _storeData('api_token', data.api_token);
  return {
    type: types.SET_USER_DATA,
    user: data
  }
}

export function changeMethodsAuth(data) {
  if (data.methods_auth) _storeData('methods_auth', data.methods_auth);
  return {
    type: types.SET_METHODS_AUTH,
    data: data
  }
}

export function savePinCode(data) {
  if (data.code) _storeData('pinCode', data.code);
  return {
    type: types.SET_PIN_CODE,
    code: data
  }
}

export function setAuthorized() {
  return {
    type: types.SET_AUTHORIZED,
    value: true
  }
}

//Storage
_storeData = async (name, params) => {
  try {
    await AsyncStorage.setItem(name, params);
  } catch (error) {
    console.log(error)
  }
}

// _retrieveData = async (name) => {
//   try {
//     const value = await AsyncStorage.getItem(name);
//     return value;
//    } catch (error) {
//     Alert.alert(JSON.stringify(error))
//    }
// }