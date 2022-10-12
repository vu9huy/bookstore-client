import { Link } from 'react-router-dom';
import './Sign.scss';

const Sign = () => {
    return (
        <div className='sign'>
            <Link className='signin' to='/register'>Sign in</Link>
            <Link className='signup' to='/login'>Sign up</Link>
        </div>
    )
}

export default Sign;