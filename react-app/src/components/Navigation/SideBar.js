import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { CreatePostModal } from '../Post/CreatePost';
import './SideBar.css';

function SideBar(){
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
			<div className='sidebar-navlink'>
				<NavLink exact to="/" style={{ textDecoration: 'none', color: "black" }}>
                    <i class="fa-solid fa-house"></i>
                    Home
                </NavLink>
			</div>
			{sessionUser ? (
				<div className='user-sidebar'>
					<div className='sidebar-navlink'>
                        <div>
						    <NavLink
                                exact to={`/users/current`}
                                style={{ textDecoration: 'none', color: "black" }}>
                                    <i class="fa-solid fa-warehouse"></i>
                                    Profile Page
                            </NavLink>
                        </div>
					</div>
					<div className='sidebar-logout-container'>
                        <p className='sidebar-logout sidebar-links' onClick={handleLogout}>
                            <i class="fa-solid fa-right-from-bracket"></i>
                            Log Out
                        </p>
					</div>
					<div className="create-post-modal">
                        <OpenModalButton
                        style={{ color: "red" }}
                        className="create-post-button"
                        buttonText="+ Post"
                        modalComponent={<CreatePostModal />}
                        />
					</div>
				</div>
			) : (
                <div className='sidebar-login-signup'>
                    <div>
                        <i class="fa-solid fa-gas-pump"></i>
                        <OpenModalButton
                            className="sidebar-buttons"
                            buttonText="Log In"
                            onItemClick={closeMenu}
                            modalComponent={<LoginFormModal />}
                        />
                    </div>
                    <div>
                        <i class="fa-solid fa-flag-checkered"></i>
                        <OpenModalButton
                            className="sidebar-buttons"
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
