
import { Link } from 'react-router-dom';
import './ComingSoon.scss';
import { useNavigate } from 'react-router-dom';
import Button from '../../../element/button/Button';

const ComingSoon = () => {
    const navigate = useNavigate();
    return (
        <div className='coming-soon'>
            {/* <img src={notfoundImage} /> */}
            <div className='coming-soon-wrapper'>
                <div className='coming-soon-text'>
                    {/* Page not found */}
                </div>
                <div className='coming-soon-button-group'>
                    <div className='' onClick={() => navigate(-1)}>
                        <Button content={'Back'} />
                    </div>
                    <Link to='/' className=''>
                        <Button content={'Go Home '} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ComingSoon;
