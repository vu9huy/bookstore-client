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
import useWindowDimensions from '../../hooks/useWindowDimensions/useWindowDimensions';


const BookSlide = ({ display, isLoading4 }) => {

    const { height, width } = useWindowDimensions();
    const [listSlidesPerView, setListSlidesPerView] = useState(6);
    // console.log(height, width);


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
        if (width > 1024) {
            listBookDisplay = [1, 2, 3, 4, 5, 6];
        } else if (1024 >= width && width >= 960) {
            listBookDisplay = [1, 2, 3, 4, 5];

        } else if (960 >= width && width >= 580) {
            listBookDisplay = [1, 2, 3, 4];

        } else if (width < 580) {
            listBookDisplay = [1, 2, 3];
        }
    }

    useEffect(() => {
        if (width > 1200) {
            setListSlidesPerView(6)

        } else if (1200 >= width && width >= 960) {
            setListSlidesPerView(5)

        } else if (960 >= width && width >= 580) {
            setListSlidesPerView(4)

        } else if (width <= 580) {
            setListSlidesPerView(3)
        }
    }, [width])

    if (display.displayType === 'slide') {
        return (
            <div className='book-slide-container'>
                <div className='book-slide'>
                    {/* <div>{width} - {listSlidesPerView}</div> */}
                    <div className='book-slide-header'>
                        <Link to={`/list/${display.displayId}`} className='book-slide-header-name'>
                            {isLoading4 ? <Skeleton width={300} height={32} /> : display.name}
                        </Link>
                        {/* {isLoading4 && (
                        <Skeleton
                            width={250} height={32}
                        />
                    )} */}

                        {isLoading4 ?
                            <Skeleton width={200} height={40} /> :
                            <Link to={`/list/${display.displayId}`} className='view-all-button'>
                                <Button style={{ display: isLoading4 ? 'none' : undefined }}
                                    content={<span>  {`VIEW LIST (${listBook.length} BOOKS)`}</span>} ></Button>
                            </Link>}

                    </div>
                    {isLoading4 && (
                        <Skeleton
                            height={300}
                        />
                    )}
                    <div className='book-slide-body' style={{ display: isLoading4 ? 'none' : undefined }}>
                        <Swiper
                            grabCursor={true}
                            spaceBetween={10}
                            slidesPerView={listSlidesPerView}
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
                            <SwiperSlide key={listBookDisplay?.length + 1}>
                                <Link to={`/list/${display.displayId}`} className='view-all'>
                                    <span>{`VIEW ALL ${listBook.length} BOOKS`}</span>
                                </Link>
                            </SwiperSlide>
                        </Swiper>
                    </div>

                </div>
            </div>

        )
    } else
        return (
            <div className='book-table-container'>
                <div className='book-table'>
                    <div className='book-table-header'>
                        <Link to={`/list/${display.displayId}`} className='book-table-header-name'>
                            {isLoading4 ? <Skeleton width={300} height={32} /> : display.name}
                        </Link>
                        {/* {isLoading4 && (
                        <Skeleton
                            width={250} height={32}
                        />
                    )} */}
                        {isLoading4 ?
                            <Skeleton width={200} height={40} /> :
                            <Link to={`/list/${display.displayId}`} className='view-all-button'>
                                <Button style={{ display: isLoading4 ? 'none' : undefined }}
                                    content={<span>  {`VIEW LIST (${listBook.length} BOOKS)`}</span>} ></Button>
                            </Link>}
                        {/* <Link to={`/list/${display.displayId}`} >
                        <Button style={{ display: isLoading4 ? 'none' : undefined }}
                            content={<span>  {`VIEW LIST (${listBook.length} BOOKS)`}</span>} ></Button>
                    </Link> */}
                    </div>
                    <div className='book-table-body'>
                        {listBookDisplay?.map((book, index) => {
                            return (
                                <div className='book-table-body-item' key={index}>
                                    <BookItem2 isLoading={isLoading4} bookId={book.id} imageUrl={book.imageUrl} bookName={book.bookName} author={book.author} salePrice={Math.round(book.price * 85 / 100 * 100) / 100} defaultPrice={book.price} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
}


export default BookSlide;