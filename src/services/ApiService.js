import fetch from 'auth/FetchInterceptor'

const ApiService = {}

ApiService.login = function (data) {
	return fetch({
		url: '/login',
		method: 'post',
		data: data
	})
}

ApiService.getAccountList = function () {
	return fetch({
		url: '/accountListV2',
		method: 'get'
	})
}

ApiService.getAccountIdList = function () {
	return fetch({
		url: '/accountListIDsV2',
		method: 'get'
	})
}



ApiService.getAccountListByClient = function (data) {
	return fetch({
		url: '/accountInfo',
		method: 'post',
		data: data
	})
}

ApiService.accountUpdate  = function (data) {
	return fetch({
		url: '/accountUpdateV2',
		method: 'post',
		data: data
	})
}

ApiService.createUser  = function (data) {
	return fetch({
		url: '/createUser',
		method: 'post',
		data: data
	})
}

ApiService.accountDisable  = function (data) {
	return fetch({
		url: '/accountDisable',
		method: 'post',
		data: data
	})
}


ApiService.getAllDeals = function (data) {
	return fetch({
		url: '/allDealsV2',
		method: 'post',
		data: data
	})
}



ApiService.getPosition = function (data) {
	return fetch({
		url: '/position',
		method: 'post',
		data: data
	})
}

ApiService.getAllPositions = function (data) {
	return fetch({
		url: '/allPositionsV2',
		method: 'post',
		data: data
	})
}

 
ApiService.getAllOrders = function (data) {
		return fetch({
		url: '/allOrdersV2',
		method: 'post',
		data: data
	})
}


ApiService.getOrder = function (data) {
	return fetch({
		url: '/allOrdersV2',
		method: 'post',
		data: data
	})
}




ApiService.register = function (data) {
	return fetch({
		url: '/auth/register',
		method: 'post',
		data: data
	})
}

ApiService.postRequest = function (url,data) {
	return fetch({
		url: url,
		method: 'post',
		data: data
	})
}

ApiService.logout = function () {
	return fetch({
		url: '/logout',
		method: 'get'
	})
}

ApiService.loginInOAuth = function () {
	return fetch({
		url: '/auth/loginInOAuth',
		method: 'post'
	})
}

ApiService.clientsUserList = function () {
	return fetch({
		url: '/clientsUserList',
		method: 'get'
	})
}




export default ApiService;

