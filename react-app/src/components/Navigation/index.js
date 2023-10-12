import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navigation.css';

function Navigation({ isLoaded }){

	let sessionUser = useSelector(state => state.session.user);

	return (
		<div className='nav-bar'>
			<div>
				<NavLink exact to="/">
					<img style={{ width: '300px'}} src="https://tinypic.host/images/2023/10/05/ShiftTalkers-logos_transparent-resize-edited.png" alt="ShiftTalkers-logos_transparent-resize-edited.png" border="0" />
				</NavLink>
			</div>
			{sessionUser ? (
				<div>
					<div>
						<NavLink exact to={`/users/${sessionUser.id}`} >
							<img
								style={ { width: '60px', height: '60px', borderRadius: '50%', margin: '10px 3px' } }
								src={sessionUser.profile_pic}
								className="navigation-profile-pic"
								border='0'
							/>
						</NavLink>
						<div>
						</div>
					</div>
				</div>
				) : (
					<></>
			)}
		</div>
	);
}

export default Navigation;
