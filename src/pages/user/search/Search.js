
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Footer from '../../../layouts/footer/Footer';
import Header from '../../../layouts/header/Header';
import { getBookByConditionApi, getCountOfBookByConditionApi } from '../../../utils/api/CallApi';
import './Search.scss';
// Import Skeleton 
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
// Import React Query 
import { useQuery, useQueryClient, } from '@tanstack/react-query';
import BookSearch from '../../../layouts/search/book-search/BookSearch';
import AuthorSearch from '../../../layouts/search/author-search/AuthorSearch';
import Paginate from '../../../components/paginate/Paginate';
// import BookItem3 from '../../components/book-item-3/BookItem3';


const Search = () => {
    const [query] = useSearchParams();
    const searchKey = query.get('q');
    const page = query.get('page');
    const limit = 25;
    const skip = (page - 1) * Number(limit);
    const [active, setActive] = useState('books');
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [page, searchKey])

    const booksQueryObj = {
        bookName: searchKey
    }
    const authorsQueryObj = {
        author: searchKey
    }

    const { isLoading: isLoading1, data: data1, error: error1 } = useQuery([`count-books-${searchKey}`], async () => await getCountOfBookByConditionApi(booksQueryObj), { refetchOnWindowFocus: false, cacheTime: Infinity, staleTime: Infinity })

    const { isLoading: isLoading2, data: data2, error: error2 } = useQuery([`count-authors-${searchKey}`], async () => await getCountOfBookByConditionApi(authorsQueryObj), { refetchOnWindowFocus: false, cacheTime: Infinity, staleTime: Infinity })

    console.log('data1', data1);
    console.log('data2', data2);


    const booksTotal = data1?.data?.data;

    const authorsTotal = data2?.data?.data;

    const totalBooksPage = Math.ceil(Number(booksTotal) / 25)
    const totalAuthorsPage = Math.ceil(Number(authorsTotal) / 25)

    console.log('totalBooksPage', totalBooksPage);

    function handleActive(Obj) {
        setActive(Obj)
    }

    return (
        <>
            <Header />
            <div className="body">
                <div className='search-wrapper'>
                    <div className="search" >
                        <div className='search-header'>
                            Search results for
                            <span className='search-title-key'>{` "${searchKey}"`}</span>
                        </div>
                        <div className='search-body'>
                            <div className='search-body-top'>
                                <Link to={`/search?q=${searchKey}&page=1`} className='search-body-top-item-wrapper'>
                                    <div className='search-body-top-item' onClick={() => handleActive('books')}>
                                        <span>
                                            <i className={active == 'books' ? 'bx bx-book-open active' : 'bx bx-book-open'} ></i>
                                        </span>
                                        <span className={active == 'books' ? 'active' : ''}>Name</span>
                                    </div>
                                    <div className={active == 'books' ? 'search-body-top-item-border active' : 'search-body-top-item-border'} ></div>
                                </Link>
                                <Link to={`/search?q=${searchKey}&page=1`} className='search-body-top-item-wrapper' onClick={() => handleActive('authors')}>
                                    <div className='search-body-top-item'>
                                        <span >
                                            <i className={active == 'authors' ? 'bx bx-user active' : 'bx bx-user'} ></i>
                                        </span>
                                        <span className={active == 'authors' ? 'active' : ''}>Author</span>
                                    </div>
                                    <div className={active == 'authors' ? 'search-body-top-item-border active' : 'search-body-top-item-border'}></div>
                                </Link>
                            </div>
                            <div className='search-body-mid'>
                                {active == 'books' && <div className='search-body-mid-books search-body-mid-list'>
                                    <BookSearch searchKey={searchKey} skip={skip} limit={limit} page={page} queryObj={booksQueryObj} isLoading={isLoading1} />
                                </div>}

                                {active == 'authors' && <div className='search-body-mid-authors search-body-mid-list'>
                                    <AuthorSearch searchKey={searchKey} skip={skip} limit={limit} page={page} queryObj={authorsQueryObj} isLoading={isLoading2} />
                                </div>}

                            </div>
                        </div>
                    </div>
                    <div className='search-body-bottom'>
                        <Paginate
                            totalPage={active == 'books' ? totalBooksPage : totalAuthorsPage}
                            // totalPage={6}
                            currentPage={Number(page)}
                            searchKey={searchKey} />
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default Search;
