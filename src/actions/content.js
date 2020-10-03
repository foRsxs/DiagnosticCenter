import axios from 'axios';

import * as types from '../types/content';
import { APP_API_URL } from '../config';

export function getAppParamsConfig() {
	return (dispatch, getState) => {
		const { authorization: { language } } = getState();

		dispatch(setIsRequest(true));

		axios
			.get(`${APP_API_URL}/param`, {
				lang: language
			})
			.then((response) => {
				dispatch(setAppParamsConfig(response.data));
				dispatch(setIsRequest(false));
			})
			.catch((e) => {
				dispatch(setAppParamsConfig([]));
				dispatch(setIsRequest(false));
			});
	};
}

export function getListSpecialization(type, order = false) {
	return (dispatch, getState) => {
		const { authorization: { language } } = getState();

		dispatch(setIsRequest(true));

		axios
			.post(`${APP_API_URL}/specs`, {
				type: type,
				lang: language
			})
			.then((response) => {
				order
					? dispatch(setListSpecializationOrder(response.data))
					: dispatch(setListSpecialization(response.data));
				dispatch(setIsRequest(false));
			})
			.catch((e) => {
				dispatch(setListSpecializationOrder([]));
				dispatch(setIsRequest(false));
			});
	};
}

export function getListDoctors(spec_id, servid, order = false) {
	return (dispatch, getState) => {
		const { authorization: { language }, content } = getState();
		const params = {
			lang: language
		};

		if (spec_id) params.spec_id = spec_id;
		if (servid) params.servid = servid;
		if (order && content.order.type !== 1) params.type = content.order.type;

		dispatch(setIsRequest(true));

		axios
			.post(`${APP_API_URL}/doctors`, params)
			.then((response) => {
				isAllow = (value) => {
					return +value.allow === 1;
				};

				if (order) {
					if (response.data.filter(isAllow).length === 1) {
						dispatch(
							setOrderSuccess({
								docdep_id: response.data[0].docdep
							})
						);
						dispatch(
							setOrderValueSuccess({
								docdep: `${response.data[0].lastname} ${response.data[0].firstname} ${response.data[0]
									.secondname}`
							})
						);
						dispatch(
							getListDates({
								docdep_id: response.data[0].docdep
							})
						);
					}
					dispatch(setListDoctorsOrder(response.data.filter(isAllow)));
				} else {
					dispatch(setListDoctors(response.data));
				}
				dispatch(setIsRequest(false));
			})
			.catch((e) => {
				dispatch(setListDoctors([]));
				dispatch(setIsRequest(false));
			});
	};
}

export function getListServices(id, type, auto_push = false) {
	return (dispatch, getState) => {
		const { authorization: { language }, content: { order } } = getState();

		dispatch(setIsRequest(true));
		dispatch(setListServicesOrder([]));

		axios
			.post(`${APP_API_URL}/services`, {
				type: type ? type : order.type,
				spec_id: id,
				lang: language
			})
			.then((response) => {
				if (auto_push && response.data.length) {
					dispatch(
						setOrderSuccess({
							servid: response.data[0].servid
						})
					);
					dispatch(
						setOrderValueSuccess({
							serv: response.data[0].text
						})
					);
				}
				dispatch(setListServicesOrder(response.data));
				dispatch(setIsRequest(false));
			})
			.catch((e) => {
				dispatch(setListServicesOrder([]));
				dispatch(setIsRequest(false));
			});
	};
}

export function getSavedCards() {
	return (dispatch, getState) => {
		const { authorization: { token } } = getState();

		dispatch(setIsRequest(true));

		axios
			.get(`${APP_API_URL}/get_saved_cards`, {
				params: {
					api_token: token
				}
			})
			.then((response) => {
				dispatch(setSavedCards(response.data));
				dispatch(setIsRequest(false));
			})
			.catch((e) => {
				dispatch(setSavedCards([]));
				dispatch(setIsRequest(false));
			});
	};
}

export function deleteCard(card_id) {
	return (dispatch, getState) => {
		const { authorization: { token } } = getState();

		dispatch(setIsRequest(true));

		axios
			.get(`${APP_API_URL}/delete_epay_card`, {
				params: {
					api_token: token,
					card_id: card_id
				}
			})
			.then((response) => {
				dispatch(setDeleteCard(card_id));
				dispatch(setIsRequest(false));
			})
			.catch((e) => {
				setIsRequest(false);
			});
	};
}

export function addCard() {
	return (dispatch, getState) => {
		const { authorization: { token } } = getState();

		dispatch(setPayloadURL('', null));
		dispatch(setIsRequest(true));

		axios
			.get(`${APP_API_URL}/get_recur_auth`, {
				params: {
					api_token: token
				}
			})
			.then((response) => {
				dispatch(setPayloadURL(response.data.link));
				dispatch(setIsRequest(false));
			})
			.catch((e) => {
				dispatch(setPayloadURL(''));
				dispatch(setIsRequest(false));
			});
	};
}

export function paymentBySavedCard(card_id, rnumb_id, amount) {
	return (dispatch, getState) => {
		const { authorization: { token } } = getState();

		dispatch(setPayloadURL('', null));
		dispatch(setIsRequest(true));

		axios
			.get(`${APP_API_URL}/get_recur_pay`, {
				params: {
					api_token: token,
					card_id,
					amount,
					rnumb_id
				}
			})
			.then((response) => {
				dispatch(setPayloadURL(response.data.link, response.data.code));
				dispatch(setIsRequest(false));
			})
			.catch((e) => {
				dispatch(setPayloadURL('', 402));
				dispatch(setIsRequest(false));
			});
	};
}

export function getDoctor(docdep) {
	return (dispatch, getState) => {
		const { authorization: { language } } = getState();

		dispatch(setIsRequest(true));

		axios
			.post(`${APP_API_URL}/doctor`, {
				docdep,
				lang: language
			})
			.then((response) => {
				dispatch(setDoctorData(response.data));
				dispatch(setIsRequest(false));
			})
			.catch((e) => {
				dispatch(setDoctorData([]));
				dispatch(setIsRequest(false));
			});
	};
}

export function getSales() {
	return (dispatch, getState) => {
		const { authorization: { language }, content: { sales } } = getState();

		dispatch(setIsRequest(true));

		axios
			.get(`${APP_API_URL}/sales`, {
				lang: language
			})
			.then((response) => {
				dispatch(setSales(response.data));
				dispatch(setIsRequest(false));
			})
			.catch((e) => {
				dispatch(setSales(sales));
				dispatch(setIsRequest(false));
			});
	};
}

export function getListInformation() {
	return (dispatch, getState) => {
		const { authorization: { language }, content: { listInformation } } = getState();

		dispatch(setIsRequest(true));

		axios
			.post(`${APP_API_URL}/articles`, {
				lang: language
			})
			.then((response) => {
				dispatch(setListInformation(response.data));
				dispatch(setIsRequest(false));
			})
			.catch((e) => {
				dispatch(setListInformation(listInformation.list));
				dispatch(setIsRequest(false));
			});
	};
}

export function getPost(post_id) {
	return (dispatch, getState) => {
		const { authorization: { language }, content: { listVacantion } } = getState();

		dispatch(setIsRequest(true));

		axios
			.post(`${APP_API_URL}/articles`, {
				post_id,
				lang: language
			})
			.then((response) => {
				dispatch(setPost(response.data));
				dispatch(setIsRequest(false));
			})
			.catch((e) => {
				dispatch(setPost(listVacantion.post));
				dispatch(setIsRequest(false));
			});
	};
}

export function getListVacantion() {
	return (dispatch, getState) => {
		const { authorization: { language }, content: { listVacantion } } = getState();

		dispatch(setIsRequest(true));

		axios
			.post(`${APP_API_URL}/vacancy`, {
				lang: language
			})
			.then((response) => {
				dispatch(setListVacantion(response.data));
				dispatch(setIsRequest(false));
			})
			.catch((e) => {
				dispatch(setListVacantion(listVacantion.list));
				dispatch(setIsRequest(false));
			});
	};
}

export function getVacantion(post_id) {
	return (dispatch, getState) => {
		const { authorization: { language } } = getState();

		dispatch(setIsRequest(true));
		axios
			.post(`${APP_API_URL}/vacancy`, {
				post_id,
				lang: language
			})
			.then((response) => {
				dispatch(setVacantion(response.data));
				dispatch(setIsRequest(false));
			})
			.catch((e) => {
				dispatch(setVacantion({}));
				dispatch(setIsRequest(false));
			});
	};
}

export function getQuestions(docdep) {
	return (dispatch, getState) => {
		const { authorization: { token, language }, content: { questions } } = getState();

		dispatch(setIsRequest(true));

		axios
			.post(`${APP_API_URL}/questions`, {
				docdep,
				api_token: token,
				lang: language
			})
			.then((response) => {
				dispatch(setQuestion(response.data));
				dispatch(setIsRequest(false));
			})
			.catch((e) => {
				dispatch(setQuestion(questions.doctors));
				dispatch(setIsRequest(false));
			});
	};
}

export function getOftenQuestions() {
	return (dispatch, getState) => {
		const { authorization: { language }, content: { questions } } = getState();

		dispatch(setIsRequest(true));

		axios
			.post(`${APP_API_URL}/faq`, {
				lang: language
			})
			.then((response) => {
				dispatch(setOftenQuestion(response.data));
				dispatch(setIsRequest(false));
			})
			.catch((e) => {
				dispatch(setOftenQuestion(questions.often));
				dispatch(setIsRequest(false));
			});
	};
}

export function getListDates(docdep_id) {
	return (dispatch, getState) => {
		const { authorization: { token, language } } = getState();

		dispatch(setIsRequest(true));

		axios
			.post(`${APP_API_URL}/rnumb_date`, {
				api_token: token,
				docdep_id,
				lang: language
			})
			.then((response) => {
				dispatch(setListDates(response.data));
				dispatch(setIsRequest(false));
			})
			.catch((e) => {
				dispatch(setListDates([]));
				dispatch(setIsRequest(false));
			});
	};
}

export function getListTimes(date) {
	return (dispatch, getState) => {
		const { authorization: { token, language }, content: { order } } = getState();

		dispatch(setIsRequest(true));

		axios
			.post(`${APP_API_URL}/rnumb_time`, {
				api_token: token,
				docdep_id: order.docdep_id,
				date,
				lang: language
			})
			.then((response) => {
				dispatch(setListTimes(response.data));
				dispatch(setIsRequest(false));
			})
			.catch((e) => {
				dispatch(setListTimes([]));
				dispatch(setIsRequest(false));
			});
	};
}

export function setOrder(data, type, nameDispatch) {
	return (dispatch, getState) => {
		const { content: { order } } = getState();

		if (type === 'type') {
			dispatch(cleareOrderSuccess());
			if (!order[type] || order[type] !== data[type]) dispatch(getListSpecialization(data[type], true));
		} else if (type === 'spec_id') {
			dispatch(cleareOrderSuccess('spec_id'));
			if (!order[type] || order[type] !== data[type]) {
				if (nameDispatch === 'doc') {
					dispatch(getListServices(data[type], null, true));
					dispatch(getListDoctors(data[type], null, true));
				} else dispatch(getListServices(data[type], null));
			}
		} else if (type === 'servid') {
			if (order.docdep_id) dispatch(cleareOrderSuccess('servid'));
			if (!order[type] || order[type] !== data[type]) dispatch(getListDoctors(null, data[type], true));
		} else if (type === 'docdep_id') {
			if (order.date) dispatch(cleareOrderSuccess('docdep_id'));
			if (!order[type] || order[type] !== data[type]) dispatch(getListDates(data[type], true));
		}
		dispatch(setOrderSuccess(data));
	};
}

export function sendQuestion({ type, question, email, docdep }) {
	return (dispatch, getState) => {
		const { authorization: { token, language } } = getState();
		const params = {
			api_token: token,
			question,
			email,
			lang: language
		};

		dispatch(
			sendQuestionSuccess({
				loading: true,
				status: false
			})
		);

		if (docdep) params.docdep = docdep;

		axios
			.post(`${APP_API_URL}/${type}`, params)
			.then((response) => {
				if (response.data.code === 200)
					dispatch(
						sendQuestionSuccess({
							loading: false,
							status: true
						})
					);
			})
			.catch((e) => {
				dispatch(
					sendQuestionSuccess({
						loading: false,
						status: false
					})
				);
			});
	};
}

export function setDate(date) {
	return (dispatch, getState) => {
		const { content: { order } } = getState();

		if (order.time) dispatch(cleareOrderSuccess('date'));
		if (order.date !== date.date) {
			dispatch(getListTimes(date.date, true));
			dispatch(setOrderSuccess(date));
			dispatch(setOrderValueSuccess(date));
		} else {
			dispatch(
				setOrderSuccess({
					date: null
				})
			);
			dispatch(
				setOrderValueSuccess({
					date: null
				})
			);
		}
	};
}

export function setTime(time) {
	return (dispatch, getState) => {
		const { content: { order } } = getState();

		if (order.time !== time.time) {
			dispatch(setOrderSuccess(time));
			dispatch(setOrderValueSuccess(time));
		} else {
			dispatch(
				setOrderSuccess({
					time: null
				})
			);
			dispatch(
				setOrderValueSuccess({
					time: null
				})
			);
		}
	};
}

export function saveOrder({ type, rnumb_id, date, serv_id }) {
	return (dispatch, getState) => {
		const { authorization: { token, language } } = getState();

		dispatch(setIsRequest(true));

		axios
			.post(`${APP_API_URL}/get_talon`, {
				api_token: token,
				lang: language,
				rnumb_id,
				date,
				serv_id,
				type
			})
			.then((response) => {
				if (response.data) dispatch(setCreatingOrderSuccess(true));
				dispatch(setIsRequest(false));
			})
			.catch((e) => {
				dispatch(setCreatingOrderSuccess(false));
				dispatch(setIsRequest(false));
			});
	};
}

export function getListTalons() {
	return (dispatch, getState) => {
		const { authorization: { token, language }, content: { listTalons } } = getState();

		dispatch(setIsRequest(true));

		axios
			.post(`${APP_API_URL}/talon_history`, {
				api_token: token,
				lang: language
			})
			.then((response) => {
				dispatch(setListTalons(response.data));
				dispatch(setIsRequest(false));
			})
			.catch((e) => {
				dispatch(setListTalons(listTalons));
				dispatch(setIsRequest(false));
			});
	};
}

export function getListTalonInfo(rnumb_id) {
	return (dispatch, getState) => {
		const { authorization: { token, language }, content: { listTalons } } = getState();

		dispatch(setIsRequest(true));

		axios
			.post(`${APP_API_URL}/talon_history`, {
				rnumb_id,
				api_token: token,
				lang: language
			})
			.then((response) => {
				dispatch(setInfoListTalonInfo(response.data));
				dispatch(setIsRequest(false));
			})
			.catch((e) => {
				dispatch(setInfoListTalonInfo(listTalons));
				dispatch(setIsRequest(false));
			});
	};
}

export function deleteOrder({ rnumb_id }) {
	return (dispatch, getState) => {
		const { authorization: { token, language }, content: { listTalons } } = getState();

		dispatch(setIsRequest(true));

		axios
			.post(`${APP_API_URL}/del_talon`, {
				api_token: token,
				lang: language,
				rnumb_id
			})
			.then((response) => {
				let array = [];
				if (response.data[0].err_code == 0) {
					listTalons.forEach((item) => {
						if (+item.rnumb_id !== +rnumb_id) array.push(item);
					});
					dispatch(setDeletedOrder(true));
					dispatch(setListTalons(array));
				}
				dispatch(setIsRequest(false));
			})
			.catch((e) => {
				dispatch(setDeletedOrder(false));
				dispatch(setIsRequest(false));
			});
	};
}

export function getLinkForPayment(rnumb_id, amount) {
	return (dispatch, getState) => {
		const { authorization: { token }, content: { history } } = getState();

		dispatch(setPayloadURL('', null));
		dispatch(setIsRequest(true));

		axios
			.get(`${APP_API_URL}/get_epay_link`, {
				params: {
					api_token: token,
					rnumb_id,
					amount
				}
			})
			.then((response) => {
				dispatch(setPayloadURL(response.data.link, response.data.code));
				dispatch(setIsRequest(false));
			})
			.catch((e) => {
				dispatch(setPayloadURL('', 402));
				dispatch(setIsRequest(false));
			});
	};
}

export function getHistory({ type, p_type, vis_id }) {
	return (dispatch, getState) => {
		const { authorization: { token, language }, content: { history } } = getState();
		let params = {
			api_token: token,
			lang: language
		};

		if (p_type) params.p_type = p_type;
		if (vis_id) params.vis_id = vis_id;

		dispatch(setIsRequest(true));

		axios
			.post(`${APP_API_URL}/visit_${type}`, params)
			.then((response) => {
				dispatch(
					type == 'list'
						? setHistory({
								list: response.data
							})
						: setHistory({
								current: response.data
							})
				);
				dispatch(setIsRequest(false));
			})
			.catch((e) => {
				dispatch(
					type == 'list'
						? setHistory({
								list: history.list
							})
						: setHistory({
								current: history.current
							})
				);
				dispatch(setIsRequest(false));
			});
	};
}

export function getAnalizes({ type = '', res_id }) {
	return (dispatch, getState) => {
		const { authorization: { token, language }, content: { analizes } } = getState();
		let params = {
			api_token: token,
			lang: language
		};

		if (res_id) params.res_id = res_id;

		dispatch(setIsRequest(true));

		axios
			.post(`${APP_API_URL}/lab_research${type}`, params)
			.then((response) => {
				dispatch(
					type == '_list'
						? setAnalizes({
								list: response.data
							})
						: setAnalizes({
								current: response.data
							})
				);
				dispatch(setIsRequest(false));
			})
			.catch((e) => {
				dispatch(
					type == '_list'
						? setAnalizes({
								list: analizes.list
							})
						: setAnalizes({
								current: analizes.current
							})
				);
				dispatch(setIsRequest(false));
			});
	};
}

export function setAppParamsConfig(data) {
	return {
		type: types.SET_APP_PARAMS_CONFIG,
		data: data
	};
}

export function cleareOrder() {
	return (dispatch) => {
		dispatch(cleareOrderSuccess());
	};
}

export function setOrderValue(data) {
	return (dispatch) => {
		dispatch(setOrderValueSuccess(data));
	};
}

export function setAnalizes(data) {
	return {
		type: types.SET_ANALIZES,
		data: data
	};
}

export function setHistory(data) {
	return {
		type: types.SET_HISTORY,
		data: data
	};
}

export function setCreatingOrderSuccess(status) {
	return {
		type: types.CREATE_ORDER_SUCCESS,
		data: status
	};
}

export function setDeletedOrder(status) {
	return {
		type: types.DELETED_ORDER_SUCCESS,
		data: status
	};
}

export function setListTalons(data) {
	return {
		type: types.SET_LIST_TALONS,
		data: data
	};
}

export function cleareOrderSuccess(type) {
	return {
		type: types.CLEARE_ORDER,
		data: type
	};
}

export function setPayloadURL(url, code) {
	return {
		type: types.SET_PAYLOAD_LINK,
		data: url,
		code: code
	};
}

export function setInfoListTalonInfo(data) {
	return {
		type: types.SET_INFO_LIST_TALON_INFO,
		data
	};
}

export function cleareOrderDatas() {
	return {
		type: types.CLEARE_ORDER_DATA
	};
}

export function setOrderSuccess(data) {
	return {
		type: types.UPDATE_ORDER,
		data: data
	};
}

export function setOrderValueSuccess(data) {
	return {
		type: types.UPDATE_ORDER_VALUE,
		data: data
	};
}

export function setListTimes(data) {
	return {
		type: types.UPDATE_LIST_TIMES,
		data: {
			times: data
		}
	};
}

export function setListDates(data) {
	return {
		type: types.UPDATE_LIST_DATES,
		data: {
			dates: data
		}
	};
}

export function sendQuestionSuccess(data) {
	return {
		type: types.SENDED_MESSAGE_SUCCESS,
		data: data
	};
}

export function setListSpecialization(data) {
	return {
		type: types.SET_LIST_SPECIALIZATION,
		data: data
	};
}

export function setListSpecializationOrder(data) {
	return {
		type: types.SET_LIST_SPECIALIZATION_ORDER,
		data: {
			specialities: data
		}
	};
}

export function setListServicesOrder(data) {
	return {
		type: types.SET_LIST_SERVICES_ORDER,
		data: {
			services: data
		}
	};
}

export function setListDoctorsOrder(data) {
	return {
		type: types.SET_LIST_DOCTORS_ORDER,
		data: {
			doctors: data
		}
	};
}

export function setListDoctors(data) {
	return {
		type: types.SET_LIST_DOCTORS,
		data: data
	};
}

export function setDoctorData(data) {
	return {
		type: types.SET_DOCTOR_DATA,
		data: data
	};
}

export function setSavedCards(data) {
	return {
		type: types.SET_SAVED_CARDS,
		data: data
	};
}

export function setDeleteCard(card_id) {
	return {
		type: types.DELETE_CARD,
		data: { card_id }
	};
}

export function setSales(data) {
	return {
		type: types.SET_SALES,
		data: data
	};
}

export function setListInformation(data) {
	return {
		type: types.SET_LIST_INFORMATION,
		data: data
	};
}

export function setPost(data) {
	return {
		type: types.SET_POST,
		data: data
	};
}

export function setListVacantion(data) {
	return {
		type: types.SET_LIST_VACANTION,
		data: data
	};
}

export function setVacantion(data) {
	return {
		type: types.SET_VACANTION,
		data: data
	};
}

export function setQuestion(data) {
	return {
		type: types.SET_QUESTION,
		data: data
	};
}

export function setOftenQuestion(data) {
	return {
		type: types.SET_OFTEN_QUESTION,
		data: data
	};
}

export function setAuthMessage(mess) {
	return {
		type: types.SET_AUTH_MESSAGE,
		data: mess
	};
}

export function setWelcomeScreen(data) {
	return {
		type: types.WELCOME_SCREEN_HIDE,
		data: data
	};
}

export function setActiveTab(data) {
	return {
		type: types.SET_ACTIVE_TAB,
		data: data
	};
}

export function setIsRequest(data) {
	return {
		type: types.SET_IS_REQUEST,
		data: data
	};
}
