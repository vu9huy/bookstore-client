import Separator from '../../../element/separator/Separator';
import { useEffect, useRef } from 'react';
import './NotiDisplay.scss';
import '../../../assets/fonts/boxicons-2.1.1/css/boxicons.min.css';
import NotiType from '../../../element/noti-type/NotiType';

const NotiDisplay = ({ notiArray, onClickOutside, notiRef }) => {

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


    return (
        <div className='noti-display' ref={refMenu}>
            <div className='noti-header'>
                Notification
            </div>
            <Separator />
            <div className='noti-body'>
                {notiArray.map((noti, index) => {
                    return (
                        <div className={noti.isRead ? 'noti-item ' : 'noti-item not-read'} key={index}>
                            <div className='noti-type'>
                                <NotiType type={noti.type} />
                            </div>
                            <div className='noti-text'>
                                <div className='noti-name'>
                                    {noti.name}
                                </div>
                                <div className='noti-content'>
                                    {noti.content}
                                </div>
                                <div className='noti-time'>
                                    {noti.time}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Separator />

            <a href='' className='noti-footer'>
                See all
            </a>
        </div>
    )
}

export default NotiDisplay;