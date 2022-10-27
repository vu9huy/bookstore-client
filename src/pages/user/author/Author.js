import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getCountOfBookByConditionApi } from '../../../utils/api/CallApi';
import './Author.scss';
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


const Author = () => {

    const limit = 25;

    const [query] = useSearchParams();
    const page = query.get('page') || 1;
    const skip = (page - 1) * Number(limit);

    const params = useParams()
    const authorNameRaw = params.authorName;

    const authorName = authorNameRaw.replaceAll('%20', ' ')
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [page, authorName])

    const category = `author-${authorName}`

    const queryObj = {
        author: authorName
    }

    const { isLoading, data, error } = useQuery([`count-books-author-${authorName}`], async () => await getCountOfBookByConditionApi(queryObj), { refetchOnWindowFocus: false, cacheTime: Infinity, staleTime: Infinity });

    console.log('data1', data);

    const booksTotal = data?.data?.data;

    const totalBooksPage = Math.ceil(Number(booksTotal) / 25)

    // console.log('totalBooksPage', totalBooksPage);

    return (
        <>
            <Header />
            <div className="body">
                <div className='author-container'>
                    <div className='author-wrapper'>
                        <div className="author-wrapper-top" >
                            <div className='author-header'>
                                <div className='author-header-left'>
                                    <div className='author-header-name'>
                                        {isLoading ? <Skeleton width={220} height={50} /> : `Author: ${authorName}`}
                                    </div>
                                </div>
                                <div className='author-header-right'>
                                    {/* <div className='category-body-header-name'>

                                </div> */}
                                </div>
                            </div>
                            <div className='author-mid'>
                                <div className='author-mid-list'>
                                    <BookSearch category={category} skip={skip} limit={limit} page={page} queryObj={queryObj} />
                                </div>
                            </div>
                        </div>
                        <div className='author-wrapper-bottom'>
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

export default Author;