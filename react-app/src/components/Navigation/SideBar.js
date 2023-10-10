import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { logout, thunkGetUser } from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { CreatePostModal } from '../Post/CreatePost';
import './SideBar.css';

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

    // useEffect(() => {
    //     dispatch(thunkGetUser(sessionUser.id))
    // }, [dispatch])

    // if (!sessionUser) return null

	return (
		<div className='sideBar'>
			<div className='sidebar-navlink'>
				<NavLink exact to="/" style={{ textDecoration: 'none', color: "black" }}>Home</NavLink>
                {/* Add garage logo as "Home" icon */}
			</div>
			{sessionUser ? (
				<div className='user-sidebar'>
					<div className="create-post-modal">
                        <OpenModalButton
                        className="create-post-modal"
                        buttonText="Create a Post"
                        modalComponent={<CreatePostModal />}
                        />
					</div>
					<div className='sidebar-navlink'>
						<NavLink exact to={`/users/current`} style={{ textDecoration: 'none', color: "black" }}>Profile Page</NavLink>
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
