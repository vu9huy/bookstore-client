import { Link } from 'react-router-dom';
import './BookItem3.scss';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BookItem3 = ({ isLoading, bookId, imageUrl, bookName, author, salePrice, defaultPrice }) => {
    return (
        <div className='book-item-3'>
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
    )
}

export default BookItem3;