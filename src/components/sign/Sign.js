import { Link } from 'react-router-dom';
import './Sign.scss';

const Sign = () => {
    return (
        <div className='sign'>
            <Link className='signin' to='/register'>Sign up</Link>
            <Link className='signup' to='/login'>Sign in</Link>
        </div>
    )
}

export default Sign;