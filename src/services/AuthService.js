import fetch from 'auth/FetchInterceptor'

const AuthService = {}

AuthService.login = function (data) {
	return fetch({
		url: '/managerLogin',
		method: 'post',
		data: data
	})
}

AuthService.getdealsList = function (data) {
	return fetch({
		url: '/dealslist_post',
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

AuthService.register = function (data) {
	return fetch({
		url: '/auth/register',
		method: 'post',
		data: data
	})
}

AuthService.logout = function () {
	return fetch({
		url: '/auth/logout',
		method: 'post'
	})
}

AuthService.loginInOAuth = function () {
	return fetch({
		url: '/auth/loginInOAuth',
		method: 'post'
	})
}

export default AuthService;