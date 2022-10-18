
import { Link } from 'react-router-dom';
import './Cart.scss';
// Import Skeleton 
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Cart = ({ numberCart }) => {


    return (
        <Link to='/cart' className='cart'>
            <div className='cart-icon'>
                <i className='bx bx-cart-alt'></i>
            </div>
            {numberCart ? <div className='cart-number'>
                {numberCart < 99 ? numberCart : '99+'}
            </div> :
                <div className='cart-number'></div>
            }
        </Link>
    )
}

export default Cart;
