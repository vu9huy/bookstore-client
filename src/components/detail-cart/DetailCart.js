import { Link } from "react-router-dom";
import './DetailCart.scss';
import { useQuery, useQueryClient, } from '@tanstack/react-query';
import { getBookByIdApi } from '../../utils/api/CallApi';

import Available from "../../element/available/Available";
// Import Skeleton 
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const DetailCart = ({ bookId }) => {
    let bookData = {};
    const { isLoading, data, error } = useQuery([`book-${bookId}`], async () => await getBookByIdApi(bookId), { refetchOnWindowFocus: false, cacheTime: Infinity })
    bookData = data?.data?.data ? data.data.data : {};
    return (
        <div className="detail-cart">
            <div className="book-left">
                <Link to={`/book/${bookId}`} className="book-image">
                    {isLoading && (
                        <Skeleton
                            height={240} width={160}
                        />
                    )}
                    <img src={bookData.imageUrl} style={{ display: isLoading ? 'none' : undefined }} />
                    {/* <img src={bookData.imageUrl} /> */}
                </Link>
            </div>
            <div className="book-right flex-column">
                <Link to={`/book/${bookId}`} className="book-name title">
                    {/* {bookData.bookName} */}
                    {isLoading ? <Skeleton width={450} height={36} /> : bookData.bookName}
                </Link>
                <div className="book-author">
                    <span>
                        <Link className="book-author-text" to={`/${bookData.bookData}`}>
                            {isLoading ? <Skeleton width={130} height={20} /> : bookData.author}
                        </Link>
                    </span>
                </div>

                <div className="book-info">
                    <div className="book-format">
                        {isLoading ? <Skeleton width={130} height={20} /> : bookData.bookFormat}
                    </div>
                </div>

                <div className="book-price">
                    {bookData.price && <div className='book-item-2-price-default'>
                        {`$${bookData.price}`}
                    </div>}
                    <div className='book-item-2-price-sale'>
                        {`$${Math.round(bookData.price * 85 / 100 * 100) / 100}`}
                    </div>
                </div>

                <div className="book-available">
                    {isLoading ? <Skeleton width={160} height={30} /> : <Available />}

                    {/* <NotAvailable /> */}
                </div>

            </div>
        </div>
    )
}

export default DetailCart;