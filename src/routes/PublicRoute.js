import React  from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { AUTHENTICATED_ENTRY, ADMIN_AUTHENTICATED_ENTRY } from 'configs/AppConfig'

const PublicRoute = () => {

	const { token, user } = useSelector(state => state.auth)
	 
	return token ? <Navigate to={user.role_id ==1 ? ADMIN_AUTHENTICATED_ENTRY : AUTHENTICATED_ENTRY} /> : <Outlet/>
}

export default PublicRoute