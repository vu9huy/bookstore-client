import './Logo.scss';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

function Logo({ }) {
    return (
        <Link to='/' className='logo'>
            <div className='logo-image'>
                <img src={logo} />
            </div>
            <div className='logo-text'>
                FooxStore
            </div>
        </Link>
    );
}

export default Logo;
