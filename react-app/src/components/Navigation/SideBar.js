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
            <div className='upper-sideBar'>
                {/* <div className='sidebar-navlink'> */}
                <div className='sideBar-home sideBar-font'>
                    <NavLink exact to="/" style={{ textDecoration: 'none', color: "black" }}>
                        <i class="fa-solid fa-house"></i>
                        <span className='text'>
                            Home
                        </span>
                    </NavLink>
                </div>
                {sessionUser ? (
                    <div className='user-sideBar'>
                        {/* <div className='sidebar-navlink'> */}
                        <div className='sideBar-profilePage sideBar-font'>
                            <div>
                                <NavLink
                                    exact to={`/users/current`}
                                    style={{ textDecoration: 'none', color: "black" }}>
                                        <i class="fa-solid fa-warehouse"></i>
                                        <span className='text'>
                                            Profile
                                        </span>
                                </NavLink>
                            </div>
                        </div>
                        {/* <div className='sidebar-navlink'> */}
                        <div className='sideBar-logOut'>
                            <p className='sidebar-logout sidebar-links' onClick={handleLogout}>
                                <i class="fa-solid fa-right-from-bracket"></i>
                                <span className='text'>
                                    Log Out
                                </span>
                            </p>
                        </div>
                        <div className="create-post-modal">
                            <OpenModalButton
                            style={{ color: "red" }}
                            className="create-post-button"
                            buttonText={<div className='create-post-button-text'>
                                            <i class="fa-solid fa-plus"></i>
                                            Post
                                        </div>}
                            modalComponent={<CreatePostModal />}
                            />
                        </div>
                    </div>
                ) : (
                    <div className='sidebar-login-signup'>
                        <OpenModalButton
                            buttonText={<div>
                                            <i class="fa-solid fa-gas-pump"/>
                                            <span className='text'>
                                                Log In
                                            </span>
                                        </div>}
                            onItemClick={closeMenu}
                            modalComponent={<LoginFormModal />}
                        />
                        <OpenModalButton
                            buttonText={<div>
                                            <i class="fa-solid fa-flag-checkered"/>
                                            <span className='text'>
                                                Sign Up
                                            </span>
                                        </div>}
                            onItemClick={closeMenu}
                            modalComponent={<SignupFormModal />}
                        />
                    </div>
                )}
            </div>
            <div className='about-links-container'>
                <div className='link'>
                    {/* <a class="fa-brands fa-square-github fa-2xl gap" href='https://github.com/kdoan93/ShiftTalkers'> */}
                    <a href='https://github.com/kdoan93/ShiftTalkers'>
                        <i class="fa-brands fa-square-github fa-2xl gap"/>
                        {/* <i class=""/> */}
                        {/* GitHub */}
                    </a>
                </div>
                <div className='link'>
                    <a href="https://www.linkedin.com/in/kdoan93/">
                        <i class="fa-brands fa-linkedin fa-2xl gap"/>
                        {/* LinkedIn */}
                    </a>
                </div>
                <div className='link'>
                    <a href="https://kdoan93.github.io/">
                        <i class="fa-regular fa-folder-open fa-2xl gap"></i>
                        {/* Portfolio */}
                    </a>
                </div>
            </div>
		</div>
	);
}

export default SideBar;
