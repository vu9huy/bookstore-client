
import { Link } from 'react-router-dom';
import notfoundImage from '../../../assets/images/404.jpg'
import './404.scss'
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className='notfound'>
            {/* <img src={notfoundImage} /> */}
            <div className='notfound-wrapper'>
                <div className='notfound-text'>
                    Page not found
                </div>
                <div className='notfound-button-group'>
                    <div className='notfound-button' onClick={() => navigate(-1)}>
                        Back
                    </div>
                    <Link to='/' className='notfound-button'>
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound;
