

import './Noti.scss';
import { useRef, useState } from 'react';
import NotiDisplay from './noti-display/NotiDisplay';
import '../../assets/fonts/boxicons-2.1.1/css/boxicons.min.css';


const Noti = () => {
    const [isDisplayNoti, setIsDisplayNoti] = useState(false);
    const notiRef = useRef(null)
    const notiArray = [
        {
            type: 'order-noti',
            name: 'test',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            time: '12/09/2022',
            isRead: false,
        },
        {
            type: 'system-noti',
            name: 'test2',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            time: '05/09/2022',
            isRead: false,

        },
        {
            type: 'system-noti',
            name: 'test3',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            time: '01/09/2022',
            isRead: true,
        },
        {
            type: 'order-noti',
            name: 'test4',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            time: '29/05/2022',
            isRead: true,
        },
        {
            type: 'system-noti',
            name: 'test5',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            time: '10/04/2022',
            isRead: false,
        },
    ];

    const notiNotReadArray = notiArray.filter(noti => {
        return noti.isRead === false
    });
    const notiNumber = notiNotReadArray.length;

    async function handelDisplayNoti() {
        setIsDisplayNoti(!isDisplayNoti);
        // Call api read all noti (chuyển tất cả isRead từ true thành false)
    }

    return (
        <div className='noti'>
            <div className='noti-icon' ref={notiRef} onClick={() => handelDisplayNoti()} >
                <div className='noti-icon-bot'>
                    <i className='bx bx-bell'></i>
                </div>
                <div className='noti-icon-number'>
                    {notiNumber < 99 ? notiNumber : '99+'}
                </div>
            </div>

            <div className={isDisplayNoti ? 'noti-display-wrapper active' : 'noti-display-wrapper hidden'}>
                <NotiDisplay notiArray={notiArray} notiRef={notiRef} onClickOutside={() => { setIsDisplayNoti(false) }} />
            </div>

        </div>
    )
}

export default Noti;
