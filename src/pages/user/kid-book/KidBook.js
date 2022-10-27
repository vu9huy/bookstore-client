
import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getCountOfBookByConditionApi } from '../../../utils/api/CallApi';
import './KidBook.scss';
// Import Skeleton 
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
// Import React Query 
import { useQuery } from '@tanstack/react-query';
import Header from '../../../layouts/header/Header';
import Footer from '../../../layouts/footer/Footer';
import Paginate from '../../../components/paginate/Paginate';
import BookItem3 from '../../../components/book-item-3/BookItem3';
import BookSearch from '../../../layouts/search/book-search/BookSearch';
// import BookItem3 from '../../components/book-item-3/BookItem3';


const KidBook = () => {
    const category = 'kid'
    const limit = 25;

    const [query] = useSearchParams();
    const page = query.get('page') || 1;
    const skip = (page - 1) * Number(limit);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [page])


    const queryObj = {
        categories: 'Social Themes - Friendship'
    }

    const { isLoading, data, error } = useQuery([`count-books-category-${category}`], async () => await getCountOfBookByConditionApi(queryObj), { refetchOnWindowFocus: false, cacheTime: Infinity, staleTime: Infinity });

    // console.log('data1', data);

    const booksTotal = data?.data?.data;

    const totalBooksPage = Math.ceil(Number(booksTotal) / 25)

    console.log('totalBooksPage', totalBooksPage);

    return (
        <>
            <Header />
            <div className="body">
                <div className='kid-container'>
                    <div className='kid-wrapper'>
                        <div className="kid-wrapper-top" >
                            <div className='kid-header'>
                                <div className='kid-header-left'>
                                    <div className='kid-header-name'>
                                        {isLoading ? <Skeleton width={220} height={50} /> : 'Kid Books'}
                                    </div>
                                </div>
                                <div className='kid-header-right'>
                                    {/* <div className='category-body-header-name'>

                                </div> */}
                                </div>
                            </div>
                            <div className='kid-mid'>
                                <div className='kid-mid-list'>
                                    <BookSearch category={category} skip={skip} limit={limit} page={page} queryObj={queryObj} />
                                    {/* {booksList?.map((book, index) => {
                                        return (
                                            <div className='book-search-item' key={index}>
                                                <BookItem3 isAddButton={true} isLoading={isLoading} bookId={book.id} imageUrl={book.imageUrl} bookName={book.bookName} author={book.author} salePrice={Math.round(book.price * 85 / 100 * 100) / 100} defaultPrice={book.price} />
                                            </div>
                                        )
                                    })} */}
                                </div>
                            </div>
                        </div>
                        <div className='kid-wrapper-bottom'>
                            <Paginate
                                totalPage={totalBooksPage}
                                currentPage={Number(page)}
                                category={category} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default KidBook;