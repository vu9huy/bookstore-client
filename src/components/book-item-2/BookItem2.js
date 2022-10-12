import { Link } from 'react-router-dom';
import './BookItem2.scss';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BookItem2 = ({ isLoading, bookId, imageUrl, bookName, author, salePrice, defaultPrice }) => {
    return (
        <div className='book-item-2'>
            <Link to={`/book/${bookId}`} className='book-item-2-left'>
                {isLoading && (
                    <Skeleton
                        height="100%"
                    />
                )}
                <img src={imageUrl} style={{ display: isLoading ? 'none' : undefined }} />
            </Link>
            <div className='book-item-2-right'>
                <Link to={`book/${bookId}`} className='book-item-2-book-name title'>
                    {isLoading ? <Skeleton width={200} height={28} /> : bookName}
                </Link>
                <div className='book-item-2-author'>
                    {isLoading ? <Skeleton width={100} height={22} /> : author}
                </div>
                <div className='book-item-2-price'>
                    {defaultPrice && <div className='book-item-2-price-default'>
                        {isLoading ? <Skeleton width={70} /> : `$${defaultPrice}`}
                    </div>}
                    <div className='book-item-2-price-sale'>
                        {isLoading ? <Skeleton width={70} /> : `$${salePrice}`}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookItem2;