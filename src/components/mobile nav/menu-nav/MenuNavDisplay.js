import Separator from '../../../element/separator/Separator';
import { useEffect, useRef, useState } from 'react';
import './MenuNavDisplay.scss';
import '../../../assets/fonts/boxicons-2.1.1/css/boxicons.min.css';
import NotiType from '../../../element/noti-type/NotiType';
import { Link } from 'react-router-dom';

const MenuNavDisplay = ({ navArr, onClickOutside, notiRef }) => {

    const [isDisplay1, setIsDisplay1] = useState(false);
    const [isDisplay2, setIsDisplay2] = useState(false);

    const refMenu = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (refMenu.current && !refMenu.current.contains(event.target) && !notiRef.current.contains(event.target)) {
                onClickOutside && onClickOutside();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [onClickOutside]);

    function handleShowMenu(e, alias) {
        if (alias == 'fiction') {
            setIsDisplay1(!isDisplay1)
        }
        if (alias == 'non-fiction') {
            setIsDisplay2(!isDisplay2)
        }
    }

    return (
        <div className='mobile-nav-menu-display' ref={refMenu}>
            {/* <div className='mobile-nav-menu-header'>
                Back
            </div> */}

            <div className='mobile-nav-menu-body'>
                {navArr.map((item, index) => {
                    return (
                        <div className='mobile-nav-menu-item' key={index}>
                            {!item.isHaveCategory ?
                                <div className='mobile-nav-menu-url-wrapper'>
                                    <Link to={`/books/${item.alias}`} className='mobile-nav-menu-item-url'>
                                        {item.name}
                                    </Link>
                                </div>
                                :
                                <div className='mobile-nav-menu-body-lv2' >
                                    <div className='mobile-nav-menu-display-lv2' onClick={(e) => handleShowMenu(e, item.alias)}>
                                        <div className='mobile-nav-menu-name-lv2'>{item.name}</div>
                                        <div className='mobile-nav-menu-icon-lv2'>
                                            <i className='bx bx-chevron-down'></i>
                                        </div>
                                    </div>
                                    <div className={isDisplay1 && item.alias == 'fiction' || isDisplay2 && item.alias == 'non-fiction' ? `mobile-nav-menu-items-lv2 ${item.alias}-active` : 'mobile-nav-menu-items-lv2'}>
                                        {item?.category?.map((itemlv2, index) => {
                                            return (
                                                <div className='mobile-nav-menu-item-lv2' key={index} onClick={() => console.log('chạm vào')}>
                                                    <Link to={`/${itemlv2.url}`} className='mobile-nav-menu-item-url-lv2'>
                                                        {itemlv2.name}
                                                    </Link>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            }

                        </div>
                    )
                })}
            </div>
            <Separator />
        </div>
    )
}

export default MenuNavDisplay;