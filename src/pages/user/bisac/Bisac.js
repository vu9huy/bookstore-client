import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getCountOfBookByConditionApi } from '../../../utils/api/CallApi';
import './Bisac.scss';
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


const Bisac = () => {

    const limit = 25;

    const [query] = useSearchParams();
    const page = query.get('page') || 1;
    const skip = (page - 1) * Number(limit);

    const params = useParams()
    const bisacNameRaw = params.bisacName;

    const bisacName = bisacNameRaw.replaceAll('%20', ' ')
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [page, bisacName])

    const category = `bisac-${bisacName}`

    const queryObj = {
        categories: bisacName
    }

    const { isLoading, data, error } = useQuery([`count-books-bisac-${bisacName}`], async () => await getCountOfBookByConditionApi(queryObj), { refetchOnWindowFocus: false, cacheTime: Infinity, staleTime: Infinity });

    console.log('bisacName', bisacName);

    const booksTotal = data?.data?.data;

    const totalBooksPage = Math.ceil(Number(booksTotal) / 25)

    console.log('totalBooksPage', totalBooksPage);

    return (
        <>
            <Header />
            <div className="body">
                <div className='bisac-container'>
                    <div className='bisac-wrapper'>
                        <div className="bisac-wrapper-top" >
                            <div className='bisac-header'>
                                <div className='bisac-header-left'>
                                    <div className='bisac-header-name'>
                                        {isLoading ? <Skeleton width={220} height={50} /> : `BISAC Category: ${bisacName}`}
                                    </div>
                                </div>
                                <div className='bisac-header-right'>
                                    {/* <div className='category-body-header-name'>

                                </div> */}
                                </div>
                            </div>
                            <div className='bisac-mid'>
                                <div className='bisac-mid-list'>
                                    <BookSearch category={category} skip={skip} limit={limit} page={page} queryObj={queryObj} />
                                </div>
                            </div>
                        </div>
                        <div className='bisac-wrapper-bottom'>
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

export default Bisac;