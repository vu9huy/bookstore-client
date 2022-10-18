import { Link } from 'react-router-dom';
import './BookItem3.scss';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useContext, useEffect, useState } from 'react';
import { userDataContext } from '../../context/userDataContext';
import Button from '../../element/button/Button';
import { addBookInCartApi } from '../../utils/api/CallApi';

const BookItem3 = ({ isLoading, bookId, imageUrl, bookName, author, salePrice, defaultPrice, isAddButton }) => {
    const [isInCart, setIsInCart] = useState(true);

    const userContext = useContext(userDataContext);

    useEffect(() => {
        const booksCart = userContext.cart.cart || [];
        // console.log('booksCart', booksCart);

        const addedBook = booksCart.filter(book => book.bookId === bookId);

        if (addedBook.length != 0) {
            setIsInCart(true)
        } else {
            setIsInCart(false)
        }

    }, [bookId])

    async function handleAddCart() {
        const bookCart = {
            bookId: bookId,
            quantity: 1
        }
        try {
            const response = await addBookInCartApi(bookCart);
            userContext.changeCart({ ...userContext.cart.cartQuantity, cartQuantity: userContext.cart.cartQuantity + 1 })
            setIsInCart(true);
        } catch (error) {

        }
    }

    return (
        <div className='book-item-3'>
            <div className='book-item-3-wrapper'>
                <div className='book-item-3-top'>
                    <Link to={`/book/${bookId}`} className='book-item-3-image'>
                        {isLoading && (
                            <Skeleton
                                height="100%"
                            />
                        )}
                        <img src={imageUrl} style={{ display: isLoading ? 'none' : undefined }} />
                    </Link>
                </div>

                <div className='book-item-3-bottom'>
                    <Link to={`/book/${bookId}`} className='book-item-3-book-name title'>
                        {isLoading ? <Skeleton width={200} height={28} /> : bookName}
                    </Link>
                    <div className='book-item-3-author'>
                        {isLoading ? <Skeleton width={100} height={22} /> : author}
                    </div>
                    <div className='book-item-3-price'>
                        {defaultPrice && <div className='book-item-3-price-default'>
                            {isLoading ? <Skeleton width={70} /> : `$${defaultPrice}`}
                        </div>}
                        <div className='book-item-3-price-sale'>
                            {isLoading ? <Skeleton width={70} /> : `$${salePrice}`}
                        </div>
                    </div>
                </div>
            </div>
            {!isAddButton || <div className="book-add-cart" >
                {isInCart && <Link to='/cart' className="book-in-cart-wrapper" >
                    <Button content={'IN CART'} icon={<i className='bx bx-shopping-bag'></i>} />
                </Link>}
                {isInCart || <div className="book-add-cart-wrapper" onClick={(e) => handleAddCart(e)}>
                    <Button content={'ADD TO CART'} icon={<i className='bx bxs-cart-add'></i>} />
                </div>}
            </div>}

        </div>
    )
}

export default BookItem3;