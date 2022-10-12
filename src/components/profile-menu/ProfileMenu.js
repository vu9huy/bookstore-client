
import './ProfileMenu.scss';
import avatar from '../../assets/images/avatar.jpg'
import Menu from './menu/Menu';
import { useEffect, useRef, useState, useContext } from 'react';
import { userDataContext } from '../../context/userDataContext';

const ProfileMenu = () => {
    const [user, setUser] = useState({})
    const [isDisplayMenu, setIsDisplayMenu] = useState(false);
    const avatarRef = useRef(null)


    const userContext = useContext(userDataContext);

    useEffect(() => {
        setUser(userContext.userData)
    }, [])


    return (
        <div className='profile-menu'>
            <div className='profile-menu-avatar' ref={avatarRef} onClick={() => { setIsDisplayMenu(!isDisplayMenu) }} >
                <img src={user.avatarUrl} />
            </div>
            {/* {!isDisplayMenu || */}
            <div className={isDisplayMenu ? 'profile-menu-menu active' : 'profile-menu-menu hidden'}>
                <Menu username={user.username} email={user.email} avatarUrl={user.avatarUrl} avatarRef={avatarRef} onClickOutside={() => { setIsDisplayMenu(false) }} />
            </div>
            {/* } */}
        </div>
    )
}

export default ProfileMenu;