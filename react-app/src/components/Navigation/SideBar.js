import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import './SideBar.css';
import { logout } from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function SideBar({ isLoaded }){
    const dispatch = useDispatch()
    const history = useHistory()
	const sessionUser = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        history.push('/')
      };

    const closeMenu = () => setShowMenu(false);

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
                        <p className='sidebar-logout sidebar-links' onClick={handleLogout}>Log Out</p>
					</div>
				</div>
			) : (
                <div>
                    <div>
                        <OpenModalButton
                        buttonText="Log In"
                        onItemClick={closeMenu}
                        modalComponent={<LoginFormModal />}
                        />
                    </div>
                    <div>
                        <OpenModalButton
                        buttonText="Sign Up"
                        onItemClick={closeMenu}
                        modalComponent={<SignupFormModal />}
                        />
                    </div>

                </div>
            )}
		</div>
	);
}

export default SideBar;
