import axios from "axios";
import OneSignal from "react-native-onesignal";

import * as types from "../types/auth";
import { APP_API_URL } from "../config";
import i18n from "../i18n";

export function authUser(data) {
  return (dispatch, getState) => {
    const { authorization } = getState();

    return axios
      .post(`${APP_API_URL}/get_patient`, {
        ...data,
        lang: authorization.language
      })
      .then(response => {
        return Promise.resolve(response.data);
      })
      .catch(error => {
        return Promise.reject({
          code: error.response.data.code,
          error: error.response.data.message
        });
      });
  };
}

export function fullAuthUser(data) {
  return dispatch => {
    OneSignal.sendTag("user_keyid", (typeof data.keyid === 'string') ? data.keyid : JSON.stringify(data.keyid));
    dispatch(saveUser(data));
  };
}

export function getUserData() {
  return (dispatch, getState) => {
    const { authorization } = getState();

    return axios
      .post(`${APP_API_URL}/get_patient_by_token`, {
        api_token: authorization.token,
        lang: authorization.language
      })
      .then(response => {
        OneSignal.sendTag("user_keyid", (typeof response.data.keyid === 'string') ? response.data.keyid : JSON.stringify(response.data.keyid));
        dispatch(setUserdata(response.data));
        return Promise.resolve(response.data);
      })
      .catch(error => {
        dispatch(setUserdata({}));
        return Promise.reject(error);
      });
  };
}

export function changeNotify(value) {
  OneSignal.setSubscription(value);
  return {
    data: value,
    type: types.SET_NOTIFY
  };
}

export function logOut() {
  return {
    type: types.LOG_OUT
  };
}

export function setLanguage(lang_key) {
  return dispatch => {
    i18n.changeLanguage(lang_key);
    dispatch(setCurrentLang(lang_key));
  };
}

export function setCurrentLang(key) {
  i18n.changeLanguage(key);
  return {
    type: types.SET_CURRENT_LANG,
    data: key
  };
}

export function saveUser(data) {
  return {
    type: types.SET_USER_DATA,
    user: data
  };
}

export function setUserdata(data) {
  return {
    type: types.SET_USER,
    user: data
  };
}

export function changeMethodsAuth(data) {
  return {
    type: types.SET_METHODS_AUTH,
    data: data
  };
}

export function savePinCode(data) {
  return {
    type: types.SET_PIN_CODE,
    code: data
  };
}

export function setAuthorized(data) {
  return {
    type: types.SET_AUTHORIZED,
    value: data
  };
}

export function updateSecure(data) {
  return {
    type: types.SET_SECURE,
    data: data
  };
}

export function setMethodsAuthDevice(data) {
  return {
    type: types.SET_METHODS_AUTH_DEVICE,
    data: data
  };
}

export function setGuest() {
  return {
    type: types.SET_USER_GUEST
  };
}
