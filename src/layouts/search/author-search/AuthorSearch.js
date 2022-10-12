
import './AuthorSearch.scss';
import { getBookByConditionApi } from '../../../utils/api/CallApi';
// Import Skeleton 
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
// Import React Query 
import { useQuery } from '@tanstack/react-query';
import BookItem3 from '../../../components/book-item-3/BookItem3';


const AuthorSearch = ({ searchKey, skip, limit, page, queryObj }) => {

    // const queryObj = {
    //     author: searchKey
    // }
    const { isLoading, data, error } = useQuery([`search-authors-${searchKey}-${page}`], async () => await getBookByConditionApi(queryObj, skip, limit), { refetchOnWindowFocus: false, cacheTime: 600000, staleTime: Infinity })
    const result = data?.data?.data
    const listBook = result || [];
    // console.log('result', result);

    return (
        <div className="author-search" >
            {listBook.length == 0 && <div className=''>No results match that query</div>}
            {listBook?.map((book, index) => {
                return (
                    <div className='author-search-item' key={index}>
                        <BookItem3 isLoading={isLoading} bookId={book.id} imageUrl={book.imageUrl} bookName={book.bookName} author={book.author} salePrice={Math.round(book.price * 85 / 100 * 100) / 100} defaultPrice={book.price} />
                    </div>
                )
            })}
        </div>
    )
}

export default AuthorSearch;
