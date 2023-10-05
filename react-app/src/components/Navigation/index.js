import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);


	return (
		<div className='nav-bar'>
			<div>
				<NavLink exact to="/"><img style={{ width: '300px'}} src="https://tinypic.host/images/2023/10/05/ShiftTalkers-logos_transparent-resize-edited.png" alt="ShiftTalkers-logos_transparent-resize-edited.png" border="0" /></NavLink>
			</div>
			{isLoaded && (
				<div>
					<div>
						<ProfileButton user={sessionUser} />
					</div>
					<div>
						{/* <ProfileImage /> */}
					</div>
				</div>
			)}
		</div>
	);
}

export default Navigation;
