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
			{sessionUser ? (
				<div className='user-sidebar'>
					<div>
						***Create Post***
					</div>
					<div>
						***User details***
					</div>
					<div>
						***Log Out***
					</div>
				</div>
			) : (
                <div>
                    <div>
                        Log In
                    </div>
                    <div>
                        Sign Up
                    </div>
                </div>
            )}
		</div>
	);
}

export default SideBar;
