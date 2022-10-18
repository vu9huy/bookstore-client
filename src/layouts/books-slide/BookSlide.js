import { useEffect, useState } from 'react';
import { getAllBookApi, getBooksByListIdsIdApi } from '../../utils/api/CallApi';
import './BookSlide.scss';
// Import Swiper 
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import BookItem1 from '../../components/book-item-1/BookItem1';
import { Link } from 'react-router-dom';
import BookItem2 from '../../components/book-item-2/BookItem2';
// Import Skeleton 
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
// Import React Query 
import { useQuery, useQueryClient, } from '@tanstack/react-query';
import Button from '../../element/button/Button';
import BookItem3 from '../../components/book-item-3/BookItem3';


const BookSlide = ({ display }) => {
    const listBookIds = display.listBook;
    // console.log('listBookIds', listBookIds);
    const { isLoading, data, error } = useQuery([`listbookids-${display.displayId}`], async () =>
        await getBooksByListIdsIdApi(listBookIds), { refetchOnWindowFocus: false, cacheTime: Infinity, staleTime: Infinity })
    // console.log('data', data);
    const result = data?.data?.data
    const listBook = result || [];
    // console.log('data bên home', data);
    let listBookDisplay;
    if (result) {
        if (display.displayType === 'slide') {
            listBookDisplay = result?.slice(0, 15);
        } else if (display.displayType === 'table') {
            listBookDisplay = result?.slice(0, 6);
        }
    } else {
        listBookDisplay = [1, 2, 3, 4, 5, 6];
    }

    if (display.displayType === 'slide') {
        return (
            <div className='book-slide'>
                <div className='book-slide-header'>
                    <Link to={`/list/${display.displayId}`} className='book-slide-header-name'>
                        {isLoading ? <Skeleton width={300} height={32} /> : display.name}
                    </Link>
                    {isLoading && (
                        <Skeleton
                            width={250} height={32}
                        />
                    )}

                    <Link to={`/list/${display.displayId}`} >
                        <Button style={{ display: isLoading ? 'none' : undefined }}
                            content={<span>  {`VIEW LIST (${listBook.length} BOOKS)`}</span>} ></Button>
                    </Link>

                </div>
                {isLoading && (
                    <Skeleton
                        height={300}
                    />
                )}
                <div className='book-slide-body' style={{ display: isLoading ? 'none' : undefined }}>
                    <Swiper
                        grabCursor={true}
                        spaceBetween={10}
                        slidesPerView={5}
                        // speed={1000}
                        // autoplay={{
                        //     delay: 4000,
                        //     disableOnInteraction: false,
                        // }}
                        // modules={[Autoplay]}
                        navigation={true}
                        freeMode={true}
                        modules={[Pagination, Navigation, FreeMode]}
                        className="mySwiper">
                        {listBookDisplay?.map((book, index) => {
                            return (
                                <SwiperSlide key={index} >
                                    <BookItem1 imageUrl={book.imageUrl} bookId={book.id} />
                                </SwiperSlide>
                            )
                        })}
                        <SwiperSlide key={listBookDisplay.length + 1}>
                            <Link to={`/list/${display.displayId}`} className='view-all'>
                                <span>{`VIEW ALL ${listBook.length} BOOKS`}</span>
                            </Link>
                        </SwiperSlide>
                    </Swiper>
                </div>

            </div>
        )
    } else
        return (
            <div className='book-table'>
                <div className='book-table-header'>
                    <Link to={`/list/${display.displayId}`} className='book-table-header-name'>
                        {isLoading ? <Skeleton width={300} height={32} /> : display.name}
                    </Link>
                    {isLoading && (
                        <Skeleton
                            width={250} height={32}
                        />
                    )}

                    <Link to={`/list/${display.displayId}`} >
                        <Button style={{ display: isLoading ? 'none' : undefined }}
                            content={<span>  {`VIEW LIST (${listBook.length} BOOKS)`}</span>} ></Button>
                    </Link>
                </div>
                <div className='book-table-body'>
                    {listBookDisplay?.map((book, index) => {
                        return (
                            <div className='book-table-body-item' key={index}>
                                <BookItem2 isLoading={isLoading} bookId={book.id} imageUrl={book.imageUrl} bookName={book.bookName} author={book.author} salePrice={Math.round(book.price * 85 / 100 * 100) / 100} defaultPrice={book.price} />
                            </div>
                        )
                    })}
                </div>

            </div>
        )
}


export default BookSlide;