
import './BookSearch.scss';
import { getBookByConditionApi } from '../../../utils/api/CallApi';
// Import Skeleton 
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
// Import React Query 
import { useQuery } from '@tanstack/react-query';
import BookItem3 from '../../../components/book-item-3/BookItem3';
import { useEffect } from 'react';


const BookSearch = ({ searchKey, skip, limit, page, queryObj, category }) => {

    // const queryObj = {
    //     bookName: searchKey
    // }
    const queryKey = category ? `category-${category}` : searchKey
    const { isLoading, data, error } = useQuery([`search-books-${queryKey}-${page}`], async () => await getBookByConditionApi(queryObj, skip, limit), { refetchOnWindowFocus: false, cacheTime: Infinity, staleTime: Infinity })
    const result = data?.data?.data;

    const listBook = isLoading && category ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] : result || [];
    // console.log('result', result);



    return (
        <div className={category ? `book-search-wrapper-category` : `book-search-wrapper`}>
            {listBook.length == 0 && <div className='book-search-no-match'>No results match that query</div>}
            <div className="book-search" >
                {listBook?.map((book, index) => {
                    return (
                        <div className='book-search-item' key={index}>
                            <BookItem3 isAddButton={true} isLoading={isLoading} bookId={book.id} imageUrl={book.imageUrl} bookName={book.bookName} author={book.author} salePrice={Math.round(book.price * 85 / 100 * 100) / 100} defaultPrice={book.price} />
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default BookSearch;
