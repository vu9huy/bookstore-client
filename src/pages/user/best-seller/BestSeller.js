
import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getBookByConditionApi } from '../../../utils/api/CallApi';
import './BestSeller.scss';
// Import Skeleton 
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
// Import React Query 
import { useQuery } from '@tanstack/react-query';
import Header from '../../../layouts/header/Header';
import Footer from '../../../layouts/footer/Footer';
import Paginate from '../../../components/paginate/Paginate';
import BookItem3 from '../../../components/book-item-3/BookItem3';
// import BookItem3 from '../../components/book-item-3/BookItem3';


const BestSeller = () => {
    const category = 'bestseller'
    const limit = 25;

    const [query] = useSearchParams();
    const page = query.get('page') || 1;
    // const skip = (page - 1) * Number(limit);
    const skip = 0;


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [page])


    const queryObj = {
        author: 'th'
    }

    const { isLoading, data, error } = useQuery([`count-books-bestseller`], async () => await getBookByConditionApi(queryObj, skip, limit), { refetchOnWindowFocus: false, cacheTime: Infinity, staleTime: Infinity });

    console.log('data', data);


    const booksList = data?.data?.data || [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    const booksTotal = booksList?.length;

    const totalBooksPage = Math.ceil(Number(booksTotal) / 25)

    console.log('totalBooksPage', totalBooksPage);

    return (
        <>
            <Header />
            <div className="body">
                <div className='best-seller-container'>
                    <div className='best-seller-wrapper'>
                        <div className="best-seller-wrapper-top" >
                            <div className='best-seller-header'>
                                <div className='best-seller-header-left'>
                                    <div className='best-seller-header-name'>
                                        {isLoading ? <Skeleton width={220} height={50} /> : 'Best Seller'}
                                    </div>
                                </div>
                                <div className='best-seller-header-right'>
                                    {/* <div className='category-body-header-name'>

                                </div> */}
                                </div>
                            </div>
                            <div className='best-seller-mid'>
                                <div className='best-seller-mid-list'>
                                    {booksList?.map((book, index) => {
                                        return (
                                            <div className='book-search-item' key={index}>
                                                <BookItem3 isAddButton={true} isLoading={isLoading} bookId={book.id} imageUrl={book.imageUrl} bookName={book.bookName} author={book.author} salePrice={Math.round(book.price * 85 / 100 * 100) / 100} defaultPrice={book.price} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className='best-seller-wrapper-bottom'>
                            {/* <Paginate
                            totalPage={totalBooksPage}
                            currentPage={Number(page)}
                            category={category} /> */}
                        </div>
                    </div>
                </div>


            </div>
            <Footer />
        </>
    )
}

export default BestSeller;