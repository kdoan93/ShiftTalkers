import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { thunkGetUser } from '../../store/session';

function Navigation({ isLoaded }){
	let sessionUser = useSelector(state => state.session.user);

	return (
		<div className='nav-bar'>
			<div>
				<NavLink exact to="/"><img style={{ width: '300px'}} src="https://tinypic.host/images/2023/10/05/ShiftTalkers-logos_transparent-resize-edited.png" alt="ShiftTalkers-logos_transparent-resize-edited.png" border="0" /></NavLink>
			</div>
			{sessionUser ? (
				<div>
					<NavLink exact to={`/users/${sessionUser.id}`} >
						<img style={{ width: '100px'}} src={sessionUser.profile_pic} alt="profile-pic" border='0' />
					</NavLink>
					<div>
						<ProfileButton user={sessionUser} />
					</div>
				</div>
			) : (
				<div>
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default Navigation;
