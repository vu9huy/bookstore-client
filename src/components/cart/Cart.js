
import { Link } from 'react-router-dom';
import './Cart.scss';

const Cart = ({ numberCart }) => {


    return (
        <Link to='/cart' className='cart'>
            <div className='cart-icon'>
                <i className='bx bx-cart-alt'></i>
            </div>
            <div className='cart-number'>
                {numberCart < 99 ? numberCart : '99+'}
            </div>
        </Link>
    )
}

export default Cart;
