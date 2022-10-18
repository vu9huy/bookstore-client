import Separator from '../../../element/separator/Separator';
import { useEffect, useRef, useContext } from 'react';
import './Menu.scss';
import '../../../assets/fonts/boxicons-2.1.1/css/boxicons.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../utils/api/CallApi';
import { userDataContext } from '../../../context/userDataContext';

const Menu = ({ avatarUrl, username, email, onClickOutside, avatarRef }) => {
    const navigate = useNavigate();
    const refMenu = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (refMenu.current && !refMenu.current.contains(event.target) && !avatarRef.current.contains(event.target)) {
                onClickOutside && onClickOutside();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [onClickOutside]);

    const userContext = useContext(userDataContext)

    async function handleLogout() {
        const response = await logoutUser();
        await userContext.changeUserData({})
        navigate('/login');
    }

    return (
        <div className='menu' ref={refMenu}>
            <div className='menu-display-profile'>
                <Link to={`/users/${username}`} className='menu-display' >
                    <div className='menu-display-avatar'>
                        <img src={avatarUrl} />
                    </div>

                    <div className='menu-display-name'>
                        <div className='menu-display-username'>
                            {username}
                        </div>
                        <div className='menu-display-email'>
                            {email}
                        </div>
                    </div>
                </Link>
            </div>
            <Separator />
            <div className='menu-action'>
                <Link to='/setting' className='menu-action-setting menu-action-item'>
                    <div className='action-icon'>
                        <i className='bx bx-cog'></i>
                    </div>
                    <div className='action-text'>Setting</div>
                </Link>
                <div className='menu-action-logout menu-action-item' onClick={() => handleLogout()}>
                    <div className='action-icon'>
                        <i className='bx bx-arrow-from-left'></i>
                    </div>
                    <div className='action-text'>Logout</div>
                </div>
            </div>
        </div>
    )
}

export default Menu;