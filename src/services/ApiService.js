import fetch from 'auth/FetchInterceptor'

const ApiService = {}

ApiService.login = function (data) {
	return fetch({
		url: '/login',
		method: 'post',
		data: data
	})
}

ApiService.getAccountList = function (data) {
	return fetch({
		url: '/accountBalanceV2',
		method: 'post',
		data: data
	})
}

ApiService.getAccountIdList = function () {
	return fetch({
		url: '/accountListIDsV2',
		method: 'get'
	})
}

ApiService.getAccountListByUserId = function (data) {
	return fetch({
		url: '/clientListV2',
		method: 'post',
		data: data
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
		url: '/accountDisableV2',
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


ApiService.saveLoginActivity = function (data) {
	return fetch({
		url: '/saveLoginActivity',
		method: 'post',
		data: data
	})
}
ApiService.creditActivity = function (data) {
	return fetch({
		url: '/creditActivity',
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

ApiService.logout = function (data) {
	return fetch({
		url: '/logout',
		method: 'post',
		data: data
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


ApiService.importManagers = function (data) {
	return fetch({
		url: '/bulkImport',
		method: 'post',
		data: data
	})
}



ApiService.getLoginActivity = function () {
	return fetch({
		url: '/getLoginActivity',
		method: 'get'
	})
}

ApiService.getCreditActivity = function () {
	return fetch({
		url: '/getCreditActivity',
		method: 'get'
	})
}




export default ApiService;

