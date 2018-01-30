import request from 'request-promise-native';

const BASE_URL = 'https://emp-api-server.herokuapp.com/contacts';
const PROXY_URL = 'https://frozen-taiga-73061.herokuapp.com/';


export function get(url) {
	const options = {
		uri: PROXY_URL + BASE_URL + url,
		json: true,
	}
	return request(options)
}

export function post(url, payload) {
	const options = {
		uri: PROXY_URL + BASE_URL + url,
		body: payload,
		json: true,
		method: "POST",
	}
	return request(options);
}

export function put(url, payload) {
	return axios.put(PROXY_URL + BASE_URL + url, payload)
}

export default {
	get,
	post,
	put,
}