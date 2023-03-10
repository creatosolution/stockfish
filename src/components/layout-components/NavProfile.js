import React, { useEffect } from 'react'
import { Menu, Dropdown, Avatar } from 'antd';
import { useDispatch } from 'react-redux'
import { 
	LogoutOutlined 
} from '@ant-design/icons';
import { signOut } from 'store/slices/authSlice';

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
			handleSignOut()
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
