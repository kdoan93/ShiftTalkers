import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './SideBar.css';

function SideBar({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);


	return (
		<div className='sideBar'>
			<div>
				<NavLink exact to="/">Home</NavLink>
                {/* Add garage logo as "Home" icon */}
			</div>
			{isLoaded && (
				<div className='user-sidebar'>
					<div>
						***Create Post***
					</div>
				</div>
			)}
		</div>
	);
}

export default SideBar;
