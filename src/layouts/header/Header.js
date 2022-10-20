import { useContext, useEffect, useState } from 'react';
import Cart from '../../components/cart/Cart';
import Logo from '../../components/logo/Logo';
import Nav from '../../components/nav/Nav';
import Noti from '../../components/notification/Noti';
import ProfileMenu from '../../components/profile-menu/ProfileMenu';
import SearchInput from '../../components/search-input/SearchInput';
import Sign from '../../components/sign/Sign';
import Social from '../../components/social/Social';
import { userDataContext } from '../../context/userDataContext';
import SeparatorColumn from '../../element/separator-column/SeparatorColumn';
import { getAllBookInCartApi } from '../../utils/api/CallApi';
import './Header.scss';
const USERNAME = process.env.REACT_APP_LOCALSTORAGE_USERNAME;
const EMAIL = process.env.REACT_APP_LOCALSTORAGE_EMAIL;
const AVATAR_URL = process.env.REACT_APP_LOCALSTORAGE_AVATAR_URL;
const IS_LOGGED = process.env.REACT_APP_LOCALSTORAGE_IS_LOGGED;
// Import React Query 
import { useQuery, } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Header = ({ reRender }) => {
    const userContext = useContext(userDataContext);

    const isLogged = localStorage.getItem(IS_LOGGED) || sessionStorage.getItem(IS_LOGGED) || '';

    useEffect(() => {
        const username = localStorage.getItem(USERNAME) || sessionStorage.getItem(USERNAME) || '';
        const email = localStorage.getItem(EMAIL) || sessionStorage.getItem(EMAIL) || '';
        const avatarUrl = localStorage.getItem(AVATAR_URL) || sessionStorage.getItem(AVATAR_URL) || '';
        if (username && email && avatarUrl) {
            userContext.changeUserData({ username, email, avatarUrl, isLogged })
        }
    }, [])

    useEffect(async () => {
        // console.log(isLogged);
        if (isLogged) {
            const response = await getAllBookInCartApi();
            userContext.changeCart({ cartQuantity: response?.data?.data?.length, cart: response?.data?.data })
        }
    }, [isLogged])



    const [position, setPosition] = useState(window.pageYOffset)
    const [visible, setVisible] = useState(true)
    useEffect(() => {
        const handleScroll = () => {
            let moving = window.pageYOffset

            setVisible(position > moving);
            setPosition(moving)
        };
        window.addEventListener("scroll", handleScroll);
        return (() => {
            window.removeEventListener("scroll", handleScroll);
        })
    })

    const cls = visible ? "visible1" : "hidden1";

    return (
        <div
            // className={`header`}
            className={`${cls} header`}
        // style={{ transform: ' translate(0px, -76px)' }}
        >
            <div className='header-top'>
                <div className='header-top-left'>
                    <Logo />
                    <SeparatorColumn />
                    <Social />
                </div>
                {/* <div>{JSON.stringify(userContext.cart.cartQuantity)}</div> */}
                {userContext.userData.username && userContext.userData.email && userContext.userData.avatarUrl ?
                    <div className='header-top-right'>
                        <ProfileMenu />
                        {/* {isLoading ? <Skeleton height="100%" /> : */}
                        <Cart numberCart={userContext.cart.cartQuantity} />
                        {/* } */}
                        <Noti />
                        <SearchInput />
                    </div> :
                    <div className='header-top-right sign'>
                        <Sign />
                        <SearchInput />
                    </div>
                }
            </div>
            <div
                // className={`header-bottom ${cls}`}
                className={`header-bottom`}
            >
                <Nav />
            </div>
        </div>
    )
}

export default Header;