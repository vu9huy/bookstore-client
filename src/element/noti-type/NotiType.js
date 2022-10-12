import './NotiType.scss';
import '../../assets/fonts/boxicons-2.1.1/css/boxicons.min.css'

const NotiType = ({ type }) => {

    return (
        <div className='noti-type'>
            {type === 'order-noti' ?
                <div className='order-noti noti-type-icon'>
                    <i className='bx bx-list-ul'></i>
                </div> :
                <div className='system-noti noti-type-icon'>
                    <i className='bx bx-server'></i>
                </div>}
        </div>
    )
}

export default NotiType;