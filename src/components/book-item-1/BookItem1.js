import { Link } from 'react-router-dom';
import './BookItem1.scss';
// Import Skeleton 
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const BookItem1 = ({ imageUrl, bookId }) => {
    return (
        <Link to={`/book/${bookId}`} className='book-item-1'>
            <img src={imageUrl} />
        </Link>
    )
}

export default BookItem1;