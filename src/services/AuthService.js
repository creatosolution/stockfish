import fetch from 'auth/FetchInterceptor'

const AuthService = {}

AuthService.login = function (data) {
	return fetch({
		url: '/managerLogin',
		method: 'post',
		data: data
	})
}

AuthService.getAccountList = function () {
	return fetch({
		url: '/accountList',
		method: 'get'
	})
}

AuthService.getAccountIdList = function () {
	return fetch({
		url: '/accountListIDs',
		method: 'get'
	})
}



AuthService.getAccountListByClient = function (data) {
	return fetch({
		url: '/accountInfo',
		method: 'post',
		data: data
	})
}

AuthService.accountUpdate  = function (data) {
	return fetch({
		url: '/accountUpdate',
		method: 'post',
		data: data
	})
}

AuthService.accountDisable  = function (data) {
	return fetch({
		url: '/accountDisable',
		method: 'post',
		data: data
	})
}


AuthService.getAllDeals = function (data) {
	return fetch({
		url: '/allDeals',
		method: 'post',
		data: data
	})
}



AuthService.getPosition = function (data) {
	return fetch({
		url: '/position',
		method: 'post',
		data: data
	})
}


AuthService.getAllPositions = function (data) {
	return fetch({
		url: '/allPositions',
		method: 'get'
	})
}



AuthService.getAllOrders = function (data) {
	return fetch({
		url: '/allOrders',
		method: 'get'
	})
}

AuthService.getOrder = function (data) {
	return fetch({
		url: '/order',
		method: 'post',
		data: data
	})
}




AuthService.register = function (data) {
	return fetch({
		url: '/auth/register',
		method: 'post',
		data: data
	})
}

AuthService.postRequest = function (url,data) {
	return fetch({
		url: url,
		method: 'post',
		data: data
	})
}

AuthService.logout = function () {
	return fetch({
		url: '/logout',
		method: 'get'
	})
}

AuthService.loginInOAuth = function () {
	return fetch({
		url: '/auth/loginInOAuth',
		method: 'post'
	})
}

export default AuthService;