import axios from 'react-native-axios'
import {Alert, AsyncStorage} from 'react-native';
import * as types from '../types/content';
import {APP_API_URL} from '../config';

export function getListSpecialization(type, order = false) {
  return (dispatch, getState) => {
    const { authorization, content: {network_connect} } = getState();
    if (network_connect) { 
      axios.post(`${APP_API_URL}/specs`, {
        type: type,
        lang: authorization.language
      })
      .then((response) => {
        if (type == 1 && !order) _storeData('specialization', JSON.stringify(response.data));
        (order) ? dispatch(setListSpecializationOrder(response.data)) : dispatch(setListSpecialization(response.data))
      })
    } else {
      (order) ? dispatch(setListSpecializationOrder([])): _retrieveData('specialization').then((resp)=> dispatch(setListSpecialization((resp && type == 1) ? resp: [])));
    }
  }
}

export function getListDoctors(spec_id, order = false) {
  return (dispatch, getState) => {
    const { authorization, content: {network_connect} } = getState();
    if (network_connect) { 
      const params = {
        lang: authorization.language
      }
      if (spec_id) params.spec_id = spec_id;
      axios.post(`${APP_API_URL}/doctors`, params)
      .then((response) => {
        if (!order && !spec_id) _storeData('doctors', JSON.stringify(response.data));
        (order) ? dispatch(setListDoctorsOrder(response.data)) : dispatch(setListDoctors(response.data));
      })
    } else {
      (order) ? dispatch(setListDoctorsOrder([])) : _retrieveData('doctors').then((resp)=> dispatch(setListDoctors((resp && !spec_id) ? resp: [])));
    }
  }
}

export function getListServices(id, auto_push = false) {
  return (dispatch, getState) => {
    const { authorization } = getState();
    axios.post(`${APP_API_URL}/services`, {
      spec_id: id,
      lang: authorization.language
    })
    .then((response) => {
      if (auto_push && response.data.length) dispatch(setOrderSuccess({servid: response.data[0].servid}));
      dispatch(setListServicesOrder(response.data));
    })
  }
}

export function getDoctor(doc_id) {
  return (dispatch, getState) => {
    const { authorization: {language} } = getState();
    axios.post(`${APP_API_URL}/doctor`, {
      doc_id,
      lang: language
    })
    .then((response) => {
      dispatch(setDoctorData(response.data));
    })
  }
}

export function getSales() {
  return (dispatch, getState) => {
    const { authorization: {language}, content: {network_connect} } = getState();
    if (network_connect) { 
      axios.get(`${APP_API_URL}/sales`, {
        lang: language
      })
      .then((response) => {
        _storeData('sales', JSON.stringify(response.data));
        dispatch(setSales(response.data));
      })
    } else {
      _retrieveData('sales').then((resp)=> dispatch(setSales((resp) ? resp: [])));
    }
  }
}

export function getListInformation() {
  return (dispatch, getState) => {
    const { authorization: {language} } = getState();
    axios.post(`${APP_API_URL}/articles`, {
      lang: language
    })
    .then((response) => {
      dispatch(setListInformation(response.data))
    })
    .catch((e)=> {
      dispatch(setListInformation([]))
    })
  }
}

export function getPost(post_id) {
  return (dispatch, getState) => {
    const { authorization } = getState();
    axios.post(`${APP_API_URL}/articles`,{
      post_id, 
      lang: authorization.language
    })
    .then((response) => {
      dispatch(setPost(response.data));
    })
    .catch((e)=> {
      dispatch(setPost({}));
    })
  }
}

export function getQuestions(doc_id) {
  return (dispatch, getState) => {
    const { authorization: {token, language} } = getState();
    axios.post(`${APP_API_URL}/questions`,{
      doc_id,
      api_token: token,
      lang: language
    })
    .then((response) => {
      dispatch(setQuestion(response.data));
    })
    .catch((e)=>{
      dispatch(setQuestion([]));
    })
  }
}

export function getOftenQuestions() {
  return (dispatch, getState) => {
    const { authorization: {language} } = getState();
    axios.post(`${APP_API_URL}/faq`,{
      lang: language
    })
    .then((response) => {
      dispatch(setOftenQuestion(response.data));
    })
    .catch((e)=> {
      dispatch(setOftenQuestion([]));
    })
  }
}

export function getListDates(docdep_id) {
  return (dispatch, getState) => {
    const { authorization: {token, language} } = getState();
    axios.post(`${APP_API_URL}/rnumb_date`,{
      api_token: token,
      docdep_id,
      lang: language
    })
    .then((response) => {
      dispatch(setListDates(response.data));
    })
    .catch((e)=>{
      dispatch(setListDates([]));
    })
  }
}

export function getListTimes(date) {
  return (dispatch, getState) => {
    const { authorization: {token, language}, content: {order} } = getState();
    axios.post(`${APP_API_URL}/rnumb_time`,{
      api_token: token,
      docdep_id: order.docdep_id,
      date,
      lang: language
    })
    .then((response) => {
      dispatch(setListTimes(response.data));
    })
    .catch((e)=> {
      dispatch(setListTimes([]));
    })
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
      if (!order[type] || order[type] !== data[type]) {
        if (nameDispatch === 'doc') {
          dispatch(getListServices(data[type], true));
          dispatch(getListDoctors(data[type], true));
        } else dispatch(getListServices(data[type]));
      }
    } else if (type === 'servid') {
      if (order.docdep_id) dispatch(cleareOrderSuccess('servid'));
      if (!order[type] || order[type] !== data[type]) dispatch(getListDoctors( order.spec_id, true));
    } else if (type === 'docdep_id') {
      if (order.date) dispatch(cleareOrderSuccess('docdep_id'));
      if (!order[type] ||  order[type] !== data[type]) dispatch(getListDates( data[type], true));
    }
    dispatch(setOrderSuccess(data))
  }
}

export function sendQuestion({type, question, email, doc_id}) {
  return (dispatch, getState) => {
    dispatch(sendQuestionSuccess({loading: true, status: false}))
    const { authorization: {token, language}, content: {network_connect} } = getState();
    const params = {
      api_token: token,
      question, 
      email,
      lang: language
    }
    if (doc_id) params.doc_id = doc_id
    if (network_connect) { 
      axios.post(`${APP_API_URL}/${type}`, params)
      .then((response) => {
        if (response.data.code === 200) dispatch(sendQuestionSuccess({loading: false, status: true}));
      })
    } else {
      dispatch(sendQuestionSuccess({loading: false, status: false}))
    }
    setTimeout(()=> {
      dispatch(sendQuestionSuccess({loading: false, status: false}))
    }, 3000)
  }
}

export function setDate(date) {
  return (dispatch, getState) => {
    const { content: {order} } = getState();
    if (order.time) dispatch(cleareOrderSuccess('date'));
    if (order.date !== date.date) {
      dispatch(getListTimes(date.date, true))
      dispatch(setOrderSuccess(date))
    } else dispatch(setOrderSuccess({date: null}))
  }
}

export function setTime(time) {
  return (dispatch, getState) => {
    const { content: {order} } = getState();
    (order.time !== time.time) ? dispatch(setOrderSuccess(time)) : dispatch(setOrderSuccess({time: null}));
  }
}

export function saveOrder({rnumb_id, date, serv_id}) {
  return (dispatch, getState) => {
    const { authorization, content: {network_connect} } = getState();
    if (network_connect) { 
      axios.post(`${APP_API_URL}/get_talon`, {
        api_token: authorization.token,
        lang: authorization.language,
        rnumb_id, 
        date,
        serv_id
      })
      .then((response) => {
        if (response.data) dispatch(setCreatingOrderSuccess(true));
      })
    } else {
      dispatch(setCreatingOrderSuccess(false));
    }
    setTimeout(()=> {
      dispatch(setCreatingOrderSuccess(false))
    }, 3000)
  }
}

export function getListTalons() {
  return (dispatch, getState) => {
    const { authorization, content: {network_connect} } = getState();
    if (network_connect) { 
      axios.post(`${APP_API_URL}/talon_history`, {
        api_token: authorization.token,
        lang: authorization.language
      })
      .then((response) => {
        _storeData('talons', JSON.stringify(response.data));
        dispatch(setListTalons(response.data));
      })
    } else {
      _retrieveData('talons').then((resp)=> dispatch(setListTalons( (resp) ? resp: [] )))
    }
  }
}

export function deleteOrder({rnumb_id}) {
  return (dispatch, getState) => {
    const { authorization, content: {listTalons, network_connect} } = getState();
    if (network_connect) { 
      axios.post(`${APP_API_URL}/del_talon`, {
        api_token: authorization.token,
        lang: authorization.language,
        rnumb_id
      })
      .then((response) => {
        let array=[];
        if (response.data[0].err_code == 0) {
          listTalons.forEach((item)=> {if (+item.rnumb_id !== +rnumb_id) array.push(item)})
          dispatch(setDeletedOrder(true));
          dispatch(setListTalons(array))
        }
      })
    } else {
      dispatch(setDeletedOrder(false));
    }
    setTimeout(()=> {
      dispatch(setDeletedOrder(false))
    }, 3000)
  }
}

export function getHistory({type, p_type, vis_id}) {
  return (dispatch, getState) => {
    const { authorization, content: {network_connect} } = getState();
    let params = {
      api_token: authorization.token,
      lang: authorization.language
    }
    if (p_type) params.p_type = p_type;
    if (vis_id) params.vis_id = vis_id;
    if (network_connect) { 
      axios.post(`${APP_API_URL}/visit_${type}`, params)
      .then((response) => {
        if (type == 'list') _storeData('histories', JSON.stringify(response.data));
        dispatch((type == 'list') ? setHistory({ list: response.data}) : setHistory({current: response.data}));
      })
    } else {
      (type == 'list') ? _retrieveData('histories').then((resp)=> dispatch(setHistory( (resp) ? { list: resp }: { list: [] } ))) : dispatch(setHistory({current: []}));
    }
  }
}

export function getAnalizes({type='', res_id}) {
  return (dispatch, getState) => {
    const { authorization, content: {network_connect} } = getState();
    let params = {
      api_token: authorization.token,
      lang: authorization.language
    }
    if (res_id) params.res_id = res_id;
    if (network_connect) { 
      axios.post(`${APP_API_URL}/lab_research${type}`, params)
      .then((response) => {
        if (type === '_list') _storeData('analizes', JSON.stringify(response.data));
        dispatch((type == '_list') ? setAnalizes({ list: response.data}) : setAnalizes({current: response.data}));
      })
    } else {
      (type === '_list') ? _retrieveData('analizes').then((resp)=> dispatch(setAnalizes( (resp) ? { list: resp }: { list: [] } ))) : dispatch(setAnalizes({current: []}));
    }
  }
}

export function changeNetworkConnection(status) {
  return {
    type: types.UPDATE_NETWORK_CONNECTION,
    data: status
  }
}

export function setAnalizes(data) {
  return {
    type: types.SET_ANALIZES,
    data: data
  }
}

export function setHistory(data) {
  return {
    type: types.SET_HISTORY,
    data: data
  }
}

export function setCreatingOrderSuccess(status) {
  return {
    type: types.CREATE_ORDER_SUCCESS,
    data: status
  }
}

export function setDeletedOrder(status) {
  return {
    type: types.DELETED_ORDER_SUCCESS,
    data: status
  }
}

export function setListTalons(data) {
  return {
    type: types.SET_LIST_TALONS,
    data: data
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

export function setListTimes(data) {
  return {
    type: types.UPDATE_LIST_TIMES,
    data: {times: data}
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

_retrieveData = async (name) => {
  try {
    const value = await AsyncStorage.getItem(name);
    return JSON.parse(value);
   } catch (error) {
    Alert.alert(JSON.stringify(error))
   }
}