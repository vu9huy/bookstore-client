import { Link } from "react-router-dom";
import './DetailBook.scss';
import { useQuery, useQueryClient, } from '@tanstack/react-query';
import { getBookByIdApi, addBookInCartApi, getAllBookInCartApi } from "../../utils/api/CallApi";
import { useEffect, useState, useContext } from "react";
// Import Skeleton 
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import Available from "../../element/available/Available";
import NotAvailable from "../../element/not-available/NotAvailable";
import Button from "../../element/button/Button";
import PromoteBook from "../promote-book/PromoteBook";
import { userDataContext } from '../../context/userDataContext';
import FlashMessage from "../../element/flash-mesagse/FlashMessage";

const DetailBook = ({ bookId }) => {
    const [isLoadingCart, getIsLoadingCart] = useState(true)
    let bookData = {};
    const { isLoading, data, error } = useQuery([`book-${bookId}`], async () => await getBookByIdApi(bookId), { refetchOnWindowFocus: false, cacheTime: Infinity, staleTime: Infinity })
    bookData = data?.data?.data ? data.data.data : {};
    // console.log(bookData);
    const [isExistInCart, setIsExistInCart] = useState(true);
    const [isFlashMessageDisplay, setIsFlashMessageDisplay] = useState(false);

    const bookCategories = bookData?.categories;
    const bookDescriptionRaw = bookData?.description;
    const bookDescriptionString = bookDescriptionRaw?.slice(11)
    const bookDescription = bookDescriptionString?.split('\n');
    const bookReviewRaw = bookData.review;
    const bookReview = bookReviewRaw?.split('\n');
    // console.log(bookReview);


    const userContext = useContext(userDataContext);

    useEffect(async () => {
        try {
            getIsLoadingCart(true);
            const response = await getAllBookInCartApi();
            const booksCart = response.data?.data || [];
            const addedBook = booksCart.filter(book => book.bookId === bookId);

            if (addedBook.length != 0) {
                setIsExistInCart(true)
            } else {
                setIsExistInCart(false)
            }
            getIsLoadingCart(false);
            // console.log('addedBook', addedBook);
        } catch (error) {
            console.log(error);
        }
    }, [])

    async function handleAddCart(e) {

        // console.log('context', userContext.cart.cartQuantity);

        if (!userContext.cart.cartQuantity) {
            setIsFlashMessageDisplay(true);
            setTimeout(() => {
                setIsFlashMessageDisplay(false);
            }, 3000);
            return
        }

        const bookCart = {
            bookId: bookId,
            quantity: 1
        }
        try {
            const response = await addBookInCartApi(bookCart);
            userContext.changeCart({ ...userContext.cart.cartQuantity, cartQuantity: userContext.cart.cartQuantity + 1 })
            setIsExistInCart(true);
        } catch (error) {

        }
    }

    return (
        <div className="detail-book">
            {isFlashMessageDisplay && <FlashMessage type={'error'} />}
            <div className="book-left">
                <div className="book-image">
                    {isLoading && (
                        <Skeleton
                            height={300} width={220}
                        />
                    )}
                    <img src={bookData.imageUrl} style={{ display: isLoading ? 'none' : undefined }} />
                </div>
            </div>
            <div className="book-right flex-column">
                <div className="book-name title">
                    {isLoading ? <Skeleton width={'100%'} height={40} /> : bookData.bookName}
                </div>
                {isLoading ? <Skeleton width={'100%'} height={30} /> : <div className="book-author">
                    <span className="">Author: </span>
                    <span>
                        <Link className="book-author-text" to={`/authors/${bookData.author}`}>
                            {bookData.author}
                        </Link>
                    </span>
                </div>}

                <div className="book-info">
                    {isLoading ? <Skeleton width={'100%'} height={30} /> :
                        <div className="book-format">
                            FORMAT
                        </div>}
                    {isLoading ? <Skeleton width={'100%'} height={80} /> :
                        <div className="book-format-group">
                            <div className="book-format-info">
                                {bookData.bookFormat}
                            </div>
                            <div className="book-price-group">
                                {bookData.price && <div className='book-item-2-price-default'>
                                    {`$${bookData.price}`}
                                </div>}
                                <div className='book-item-2-price-sale'>
                                    {`$${Math.round(bookData.price * 85 / 100 * 100) / 100}`}
                                </div>
                            </div>
                        </div>}
                </div>
                {isLoading ? <Skeleton width={140} height={30} /> :
                    <div className="book-available">
                        <Available />
                        {/* <NotAvailable /> */}
                    </div>}

                {isLoading ? <Skeleton width={'100%'} height={40} /> :
                    <div className="book-add-cart" >
                        {isExistInCart && <Link to='/cart' className="book-in-cart-wrapper" >
                            <Button content={'IN CART'} icon={<i className='bx bx-shopping-bag'></i>} />
                        </Link>}
                        {isExistInCart || <div className="book-add-cart-wrapper" onClick={(e) => handleAddCart(e)}>
                            <Button content={'ADD TO CART'} icon={<i className='bx bxs-cart-add'></i>} />
                        </div>}
                    </div>
                }

                <div className="book-discription">
                    {isLoading ? <Skeleton width={'100%'} height={34} /> :
                        <div className="book-discription-title title">Description</div>}
                    {isLoading ?
                        <>
                            <Skeleton width='100%' height={26} count={2} />
                            <Skeleton width='40%' height={26} count={1} />
                            <Skeleton width='100%' height={26} count={6} />
                            <Skeleton width='80%' height={26} count={1} />
                        </>
                        :
                        <div className="book-discription-text">
                            {bookDescription?.map((description, index) => <p key={index} className="indent book-text">{description}</p>)}
                        </div>}

                </div>
                <div className="book-detail">
                    {isLoading ? <Skeleton width={'100%'} height={32} /> :
                        <div className="book-detail-title title">Product Details</div>}
                    {isLoading ?
                        <div className="book-detail-items">
                            <div className="book-detail-item-left">
                                <Skeleton width={'100%'} height={24} />
                            </div>
                            <div className="book-detail-item-right">
                                <Skeleton width={'100%'} height={24} />
                            </div>
                            <div className="book-detail-item-left">
                                <Skeleton width={'100%'} height={24} />
                            </div>
                            <div className="book-detail-item-right">
                                <Skeleton width={'100%'} height={24} />
                            </div>
                            <div className="book-detail-item-left">
                                <Skeleton width={'100%'} height={24} />
                            </div>
                            <div className="book-detail-item-right">
                                <Skeleton width={'100%'} height={24} />
                            </div>

                            <div className="book-detail-item-left">
                                <Skeleton width={'100%'} height={24} />
                            </div>
                            <div className="book-detail-item-right">
                                <Skeleton width={'100%'} height={24} />
                            </div>
                        </div>
                        :
                        <div className="book-detail-items">
                            {/* <div className="book-detail-item book-detail-price "> */}
                            <div className="book-detail-item-left">
                                Price
                            </div>
                            <div className="book-detail-item-right">
                                <div className="book-price-group">
                                    {bookData.price && <div className='book-item-2-price-default'>
                                        {`$${bookData.price}`}
                                    </div>}
                                    <div className='book-item-2-price-sale'>
                                        {`$${Math.round(bookData.price * 85 / 100 * 100) / 100}`}
                                    </div>
                                </div>
                            </div>

                            <div className="book-detail-item-left">
                                Publisher
                            </div>

                            <div className="book-detail-item-right">
                                {bookData.publisher}
                            </div>
                            {/* </div> */}
                            {/* <div className="book-detail-item book-detail-publish-date "> */}
                            <div className="book-detail-item-left">
                                Publish Date
                            </div>
                            <div className="book-detail-item-right">
                                {bookData.datePublished}
                            </div>
                            {/* </div> */}
                            {/* <div className="book-detail-item book-detail-pages "> */}
                            <div className="book-detail-item-left">
                                Pages
                            </div>
                            <div className="book-detail-item-right">
                                {bookData.numberOfPages}
                            </div>
                            {/* </div> */}
                            {/* <div className="book-detail-item book-detail-dimensions "> */}
                            <div className="book-detail-item-left">
                                Dimensions
                            </div>
                            <div className="book-detail-item-right">
                                {bookData.size}
                            </div>
                            {/* </div> */}
                            {/* <div className="book-detail-item book-detail-language "> */}
                            <div className="book-detail-item-left">
                                Language
                            </div>
                            <div className="book-detail-item-right">
                                {bookData.inLanguage}
                            </div>
                            {/* </div> */}
                            {/* <div className="book-detail-item book-detail-type "> */}
                            <div className="book-detail-item-left">
                                Type
                            </div>
                            <div className="book-detail-item-right">
                                {bookData.bookFormat}
                            </div>
                            <div className="book-detail-item-left">
                                EAN/UPC
                            </div>
                            <div className="book-detail-item-right">
                                {bookData.EANUPC}
                            </div>
                            {/* </div> */}
                        </div>
                    }

                </div>
                <div className="book-categories">
                    <div className="book-categories-title title">
                        {isLoading ? <Skeleton width={'100%'} height={24} /> : 'BISAC Categories:'}
                    </div>
                    {isLoading ?
                        <div className="book-categories-items">
                            <Skeleton width={'100%'} height={24} />
                        </div>
                        :
                        <div className="book-categories-items">
                            {bookCategories?.map((categorie, index) => {
                                return (
                                    <div className="book-categories-item" key={index}>
                                        <span>
                                            <Link to={`/bisac/${categorie}`}>
                                                {categorie}
                                            </Link>
                                        </span>
                                        {bookCategories.length - 1 === index ? '' : ','}
                                    </div>
                                )
                            })}
                        </div>}
                </div>


                {isLoading ? <Skeleton width={'100%'} height={140} /> :
                    <div className="">
                        <PromoteBook />
                    </div>}


                {isLoading ||
                    <div className="book-about-author">
                        <div className="book-about-author-title title">
                            About the Author
                        </div>
                        <div className="book-about-author-text book-text indent">
                            {bookData.aboutAuthor}
                        </div>
                    </div>}


                {isLoading ||
                    <div className="book-about-reviews">
                        <div className="book-about-reviews-title title">
                            Reviews
                        </div>
                        <div className="book-about-review-text ">
                            {bookReview?.map((review, index) => <p key={index} className="indent book-text">{review}</p>)}
                        </div>
                    </div>}
            </div>
        </div>
    )
}

export default DetailBook;



const test = () => {

    return (
        <div className="detail-book">
            <div className="book-left">
                <div className="book-image">
                    {isLoading && (
                        <Skeleton
                            height={300} width={220}
                        />
                    )}
                    <img src={bookData.imageUrl} style={{ display: isLoading ? 'none' : undefined }} />
                </div>
            </div>
            <div className="book-right flex-column">
                <div className="book-name title">
                    {isLoading ? <Skeleton width={550} height={40} /> : bookData.bookName}
                </div>
                {isLoading ? <Skeleton width={180} height={30} /> : <div className="book-author">
                    <span className="">Author: </span>
                    <span>
                        <Link className="book-author-text" to={`/authors/${bookData.author}`}>
                            {bookData.author}
                        </Link>
                    </span>
                </div>}

                <div className="book-info">
                    {isLoading ? <Skeleton width={100} height={30} /> :
                        <div className="book-format">
                            FORMAT
                        </div>}
                    {isLoading ? <Skeleton width={140} height={80} /> :
                        <div className="book-format-group">
                            <div className="book-format-info">
                                {bookData.bookFormat}
                            </div>
                            <div className="book-price-group">
                                {bookData.price && <div className='book-item-2-price-default'>
                                    {`$${bookData.price}`}
                                </div>}
                                <div className='book-item-2-price-sale'>
                                    {`$${Math.round(bookData.price * 85 / 100 * 100) / 100}`}
                                </div>
                            </div>
                        </div>}
                </div>
                {isLoading ? <Skeleton width={140} height={30} /> :
                    <div className="book-available">
                        <Available />
                        {/* <NotAvailable /> */}
                    </div>}

                {isLoading ? <Skeleton width={180} height={40} /> :
                    <div className="book-add-cart" >
                        {isExistInCart && <Link to='/cart' className="book-in-cart-wrapper" >
                            <Button content={'IN CART'} icon={<i className='bx bx-shopping-bag'></i>} />
                        </Link>}
                        {isExistInCart || <div className="book-add-cart-wrapper" onClick={(e) => handleAddCart(e)}>
                            <Button content={'ADD TO CART'} icon={<i className='bx bxs-cart-add'></i>} />
                        </div>}
                    </div>
                }

                <div className="book-discription">
                    {isLoading ? <Skeleton width={160} height={34} /> :
                        <div className="book-discription-title title">Description</div>}
                    {isLoading ?
                        <>
                            <Skeleton width='100%' height={26} count={2} />
                            <Skeleton width='40%' height={26} count={1} />
                            <Skeleton width='100%' height={26} count={6} />
                            <Skeleton width='80%' height={26} count={1} />
                        </>
                        :
                        <div className="book-discription-text">
                            {bookDescription?.map((description, index) => <p key={index} className="indent book-text">{description}</p>)}
                        </div>}

                </div>
                <div className="book-detail">
                    {isLoading ? <Skeleton width={200} height={36} /> :
                        <div className="book-detail-title title">Product Details</div>}
                    {isLoading ?
                        <div className="book-detail-items">
                            <div className="book-detail-item-left">
                                <Skeleton width={100} height={24} />
                            </div>
                            <div className="book-detail-item-right">
                                <Skeleton width={100} height={24} />
                            </div>
                            <div className="book-detail-item-left">
                                <Skeleton width={140} height={24} />
                            </div>
                            <div className="book-detail-item-right">
                                <Skeleton width={190} height={24} />
                            </div>
                            <div className="book-detail-item-left">
                                <Skeleton width={120} height={24} />
                            </div>
                            <div className="book-detail-item-right">
                                <Skeleton width={160} height={24} />
                            </div>

                            <div className="book-detail-item-left">
                                <Skeleton width={90} height={24} />
                            </div>
                            <div className="book-detail-item-right">
                                <Skeleton width={170} height={24} />
                            </div>
                        </div>
                        :
                        <div className="book-detail-items">
                            {/* <div className="book-detail-item book-detail-price "> */}
                            <div className="book-detail-item-left">
                                Price
                            </div>
                            <div className="book-detail-item-right">
                                <div className="book-price-group">
                                    {bookData.price && <div className='book-item-2-price-default'>
                                        {`$${bookData.price}`}
                                    </div>}
                                    <div className='book-item-2-price-sale'>
                                        {`$${Math.round(bookData.price * 85 / 100 * 100) / 100}`}
                                    </div>
                                </div>
                            </div>

                            <div className="book-detail-item-left">
                                Publisher
                            </div>

                            <div className="book-detail-item-right">
                                {bookData.publisher}
                            </div>
                            {/* </div> */}
                            {/* <div className="book-detail-item book-detail-publish-date "> */}
                            <div className="book-detail-item-left">
                                Publish Date
                            </div>
                            <div className="book-detail-item-right">
                                {bookData.datePublished}
                            </div>
                            {/* </div> */}
                            {/* <div className="book-detail-item book-detail-pages "> */}
                            <div className="book-detail-item-left">
                                Pages
                            </div>
                            <div className="book-detail-item-right">
                                {bookData.numberOfPages}
                            </div>
                            {/* </div> */}
                            {/* <div className="book-detail-item book-detail-dimensions "> */}
                            <div className="book-detail-item-left">
                                Dimensions
                            </div>
                            <div className="book-detail-item-right">
                                {bookData.size}
                            </div>
                            {/* </div> */}
                            {/* <div className="book-detail-item book-detail-language "> */}
                            <div className="book-detail-item-left">
                                Language
                            </div>
                            <div className="book-detail-item-right">
                                {bookData.inLanguage}
                            </div>
                            {/* </div> */}
                            {/* <div className="book-detail-item book-detail-type "> */}
                            <div className="book-detail-item-left">
                                Type
                            </div>
                            <div className="book-detail-item-right">
                                {bookData.bookFormat}
                            </div>
                            {/* </div> */}
                        </div>
                    }

                </div>
                <div className="book-categories">
                    <div className="book-categories-title title">
                        {isLoading ? <Skeleton width={120} height={24} /> : 'BISAC Categories:'}
                    </div>
                    {isLoading ?
                        <div className="book-categories-items">
                            <Skeleton width={600} height={24} />
                        </div>
                        :
                        <div className="book-categories-items">
                            {bookCategories?.map((categorie, index) => {
                                return (
                                    <div className="book-categories-item" key={index}>
                                        <span>
                                            <Link to={`/tags/${categorie}`}>
                                                {categorie}
                                            </Link>
                                        </span>
                                        {bookCategories.length - 1 === index ? '' : ','}
                                    </div>
                                )
                            })}
                        </div>}
                </div>


                {isLoading ? <Skeleton width={500} height={140} /> :
                    <div className="">
                        <PromoteBook />
                    </div>}


                {isLoading ||
                    <div className="book-about-author">
                        <div className="book-about-author-title title">
                            About the Author
                        </div>
                        <div className="book-about-author-text book-text indent">
                            {bookData.aboutAuthor}
                        </div>
                    </div>}


                {isLoading ||
                    <div className="book-about-reviews">
                        <div className="book-about-reviews-title title">
                            Reviews
                        </div>
                        <div className="book-about-review-text ">
                            {bookReview?.map((review, index) => <p key={index} className="indent book-text">{review}</p>)}
                        </div>
                    </div>}
            </div>
        </div>
    )
}