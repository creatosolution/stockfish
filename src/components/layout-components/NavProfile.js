import React, { useEffect } from 'react'
import { Menu, Dropdown, Avatar } from 'antd';
import { useDispatch } from 'react-redux'
import { 
	LogoutOutlined 
} from '@ant-design/icons';
import { signOut, saveLoginActivity } from 'store/slices/authSlice';

const MenuItemSignOut = (props) => (
	<span className="d-flex align-items-center">
		<LogoutOutlined className="font-size-md" />
		<span className="font-weight-normal mx-2">{props.label}</span>
	</span>
)

export const NavProfile = () => {
	// setupBeforeUnloadListener
	const dispatch = useDispatch();
	const loggedIn = localStorage.getItem("userId")

	const handleClick = ({ key }) => {
		if (key === 'Sign Out') {

			let req = {
				"role_id":localStorage.getItem("userRole"),
				
			}
			if(localStorage.getItem("userRole") == 2){
				req['meta_id'] = localStorage.getItem("userId")
			}
			handleSignOut(req) 

			// function text(url) {
			// 	return fetch(url).then(res => res.json());
			// }
			
			// text('https://api.ipify.org/?format=json').then(data => {
				 
			// 	let browser =  navigator.userAgent;
			// 	const logsReq = {
			// 		"user_id":localStorage.getItem("userId"),
			// 		"type":"logout",
			// 		"ip":data.ip,
			// 		"browser": browser
			// 	}
			// 	saveLoginActivity(logsReq)

			// });
		}
	}

	const handleSignOut = () => {
		dispatch(signOut())
	}
   
	
	const menu = (
		<Menu
			onClick={handleClick}
			items={
				[
					{
						key: 'Sign Out',
						label: <MenuItemSignOut label="Sign Out" />,
					}
				]
			}
		/>
	) 

	return (
		<Dropdown placement="bottomRight" overlay={menu} trigger={["click"]}>
			<div className="nav-item">
				<div className="d-flex align-items-center flex-row-reverse">
					<Avatar src="/img/avatars/thumb-1.jpg" className='ml-2' />
					<div className="profile-text">
						<div className="font-size-base font-weight-bold">Welcome {loggedIn ? loggedIn : ''}</div>

						{/* <span className="opacity-0-8"></span> */}
					</div>
				</div>
			</div>
		</Dropdown>
	);
}

export default NavProfile
