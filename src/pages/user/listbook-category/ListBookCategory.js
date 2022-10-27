import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getBookByConditionApi, getCountOfBookByConditionApi } from '../../../utils/api/CallApi';
import './ListBookCategory.scss';
// Import Skeleton 
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
// Import React Query 
import { useQuery, useQueryClient, } from '@tanstack/react-query';
import Header from '../../../layouts/header/Header';
import Footer from '../../../layouts/footer/Footer';
import Paginate from '../../../components/paginate/Paginate';
import BookSearch from '../../../layouts/search/book-search/BookSearch';
// import BookItem3 from '../../components/book-item-3/BookItem3';


const ListBookCategory = () => {
    const params = useParams();
    const category = params.category;
    // console.log('params', params);
    const limit = 25;

    const [query] = useSearchParams();
    const page = query.get('page') || 1;
    const skip = (page - 1) * Number(limit);
    // console.log('skip', skip);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [page, category])

    const queryObj = {
        tag: category
    }

    const { isLoading, data, error } = useQuery([`count-books-category-${category}`], async () => await getCountOfBookByConditionApi(queryObj), { refetchOnWindowFocus: false, cacheTime: Infinity, staleTime: Infinity });

    // console.log('data1', data);

    const booksTotal = data?.data?.data;

    const totalBooksPage = Math.ceil(Number(booksTotal) / 25)

    console.log('totalBooksPage', totalBooksPage);
    const categoryAlias = category?.replaceAll('-', '');

    const categoryObj = {
        comicsgraphicnovels: 'Comics & Graphic Novels',
        romance: 'Romance',
        historicalfiction: 'Historical Fiction',
        horror: 'Horror',
        literaturefiction: 'Literature & Fiction',
        manga: 'Manga',
        mysterythrillerstruecrime: 'Mystery, Thrillers, & Crime',
        poetry: 'Poetry',
        sciencefiction: 'Science Fiction',
        fantasy: 'Fantasy',
    }



    return (
        <>
            <Header />
            <div className="body">
                <div className='category-wrapper'>
                    <div className="category" >
                        <div className='category-body-header'>
                            <div className='category-body-header-left'>
                                <div className='category-body-header-name'>
                                    {isLoading ? <Skeleton width={220} height={50} /> : categoryObj[categoryAlias]}
                                </div>
                            </div>
                            <div className='category-body-header-right'>
                                {/* <div className='category-body-header-name'>

                                </div> */}
                            </div>
                        </div>
                        <div className='category-body-mid'>
                            <div className='category-body-mid-books category-body-mid-list'>
                                <BookSearch category={category} skip={skip} limit={limit} page={page} queryObj={queryObj} />
                            </div>
                        </div>
                    </div>
                    <div className='category-body-bottom'>
                        <Paginate
                            totalPage={totalBooksPage}
                            // totalPage={6}
                            currentPage={Number(page)}
                            category={category} />
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default ListBookCategory;