import { Link } from 'react-router-dom';
import './PromoteBook.scss';

const PromoteBook = () => {


    return (
        <div className='promote-book '>
            <div className='promote-book-title title'>
                Earn by promoting books
            </div>
            <div className='promote-book-box '>
                <div className='promote-book-box-text '>
                    Earn money by sharing your favorite books through our Affiliate program.
                </div>
                <Link to={'/'} className='promote-book-box-link '>
                    BECOME AN AFFILIATE
                </Link>
            </div>
        </div>
    )
}

export default PromoteBook;
