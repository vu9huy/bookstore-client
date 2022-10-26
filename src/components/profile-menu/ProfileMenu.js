
import './ProfileMenu.scss';
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
                <div className='profile-avatar-image' style={{ backgroundImage: "url(" + userContext.userData.avatarUrl + ")", }} />
            </div>
            {/* {!isDisplayMenu || */}
            <div className={isDisplayMenu ? 'profile-menu-menu active' : 'profile-menu-menu hidden'}
            // <div className='profile-menu-menu active'
            // style={isDisplayMenu ? { transform: 'scaleY(1)' } : {}}
            >
                <Menu avatarRef={avatarRef} isDisplayMenu={isDisplayMenu} onClickOutside={() => { setIsDisplayMenu(false) }} />
            </div>
            {/* } */}
        </div>
    )
}

export default ProfileMenu;