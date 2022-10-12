
import { useEffect, useState, useContext } from "react";
import DetailCart from "../../../components/detail-cart/DetailCart";
import Button from "../../../element/button/Button";
import Footer from "../../../layouts/footer/Footer";
import Header from "../../../layouts/header/Header";
import { getBookByIdApi, getAllBookInCartApi, deleteBookInCartApi, addBookInCartApi } from "../../../utils/api/CallApi";
import './UserCart.scss';
import '../../../assets/fonts/boxicons-2.1.1/css/boxicons.min.css';
import { userDataContext } from "../../../context/userDataContext";
// Import Skeleton 
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const UserCart = () => {
    const [listCart, setListCart] = useState([1, 1, 1, 1, 1]);
    const [listPrice, setListPrice] = useState([]);
    const [listSalePrice, setListSalePrice] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const [rerender, setRerender] = useState(false);
    const [total, setTotal] = useState(0);
    const userContext = useContext(userDataContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(async () => {
        setIsLoading(true);
        const response = await getAllBookInCartApi();
        console.log(response);
        const listCartUser = response.data?.data;
        setListCart(listCartUser)
        const listQuantity = listCartUser?.map(book => book.quantity);
        setQuantity(listQuantity)
        // console.log('listQuantity', listQuantity);

        const listBookId = listCartUser?.map(book => book.bookId);
        // console.log(listCartUser);

        const getWithPromiseAll = async () => {
            let data = await Promise.all(listBookId.map(async (bookId) => {
                return await getBookByIdApi(bookId);
            }))
            return data
        }

        const allBookResponse = await getWithPromiseAll();
        // console.log(allBookResponse);
        const listPriceBook = allBookResponse.map(response => response.data?.data?.price)
        setListPrice(listPriceBook)
        const listSalePriceBook = allBookResponse.map(response => Math.round(response.data?.data?.price * 85 / 100 * 100) / 100)
        setListSalePrice(listSalePriceBook)
        setIsLoading(false);

    }, [rerender])

    useEffect(async () => {
        const totalPriceRaw = quantity.reduce((previousValue, currentValue, index) => (previousValue + currentValue * listSalePrice[index]), 0);
        const totalPrice = Math.round(totalPriceRaw * 100) / 100;
        setTotal(totalPrice);
        // console.log('totalPrice', totalPrice);
    }, [quantity, listSalePrice])

    async function handleChangeQuantity(e, index) {
        console.log('change');
        if (e.target.value < 1) {
            e.target.value = 1

        }
        if (e.target.value > 99) {
            e.target.value = 99
        }
        quantity[index] = e.target.value;
        setQuantity([...quantity])
    }

    async function handleDeleteCart(e, bookId) {
        const bookCart = { bookId };
        // console.log('bookCart', bookCart);
        try {
            const result = await deleteBookInCartApi(bookCart);
            // console.log('result', result);

            userContext.changeCart({ cartQuantity: userContext.cart.cartQuantity - 1 })
            setRerender(!rerender);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleCallApiChangeQuantity(e, bookId, quantity) {
        const bookCart = {
            bookId,
            quantity
        }
        try {
            const response = await addBookInCartApi(bookCart);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleIncreaseCart(e, index, bookId) {
        if (quantity[index] >= 99) {
            quantity[index] = 99
            return
        }

        quantity[index] = quantity[index] + 1;
        setQuantity([...quantity])


        const bookCart = {
            bookId,
            quantity: quantity[index]
        }
        console.log('bookCart', bookCart);
        try {
            const response = await addBookInCartApi(bookCart);
            console.log('response', response);
        } catch (error) {
            console.log(error);
        }
    }
    async function handleDecreaseCart(e, index, bookId) {
        if (quantity[index] <= 1) {
            quantity[index] = 1
            return
        }
        quantity[index] = quantity[index] - 1;
        setQuantity([...quantity])


        const bookCart = {
            bookId,
            quantity: quantity[index]
        }
        console.log('bookCart', bookCart);
        try {
            const response = await addBookInCartApi(bookCart);
            // setRerender(!rerender);
            console.log('response', response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Header />
            <div className='body'>
                <div className='user-cart'>
                    <div className='user-cart-top'>
                        <div className="user-cart-top-title title">
                            Shopping Cart
                        </div>
                    </div>
                    <div className='user-cart-mid'>
                        <div className="user-cart-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="user-cart-head-book">Item</th>
                                        <th className="user-cart-head-quantity">Quantity</th>
                                        <th className="user-cart-head-price">Price</th>
                                        <th className="user-cart-head-total">Total</th>
                                        <th className="user-cart-head-remove"></th>
                                    </tr>
                                </thead>
                                {listCart.length === 0 && <tbody><div className="emty-cart">* Emty cart</div></tbody>}
                                <tbody>
                                    {listCart?.map((book, index) => {
                                        return (
                                            <tr key={book.bookId || index}>
                                                <td className="user-cart-body-book" >
                                                    <DetailCart bookId={book.bookId} isLoading1={true} />
                                                </td>
                                                <td className="user-cart-body-quantity" >
                                                    {isLoading ? <Skeleton width={64} height={50} /> :
                                                        <div className="user-cart-body-quantity-wrapper">
                                                            <input
                                                                type='number'
                                                                min='1'
                                                                max='99'
                                                                value={quantity[index] || ''}
                                                                onChange={(e) => handleChangeQuantity(e, index)}
                                                                onBlur={(e) => handleCallApiChangeQuantity(e, book.bookId, quantity[index])}
                                                                className="user-cart-body-quantity-content"
                                                            />
                                                            <div className="user-cart-body-quantity-button-wrapper">
                                                                <div className="user-cart-body-quantity-up-button user-cart-body-quantity-button" onClick={(e) => handleIncreaseCart(e, index, book.bookId)}>
                                                                    <i className='bx bxs-chevron-up'></i>
                                                                </div>
                                                                <div className="user-cart-body-quantity-down-button user-cart-body-quantity-button" onClick={(e) => handleDecreaseCart(e, index, book.bookId)}>
                                                                    <i className='bx bxs-chevron-down'></i>
                                                                </div>
                                                            </div>
                                                        </div>}

                                                </td>
                                                <td className="user-cart-body-price" >
                                                    <div className="user-cart-body-price-wrapper">
                                                        <div className="user-cart-body-price-content">
                                                            {isLoading ?
                                                                <Skeleton width={60} height={22} /> :
                                                                <p className="user-cart-body-price-default">${listPrice[index]}</p>}
                                                            {isLoading ?
                                                                <Skeleton width={60} height={22} /> :
                                                                <p className="user-cart-body-price-sale">${listSalePrice[index]}</p>}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="user-cart-body-total" >
                                                    <div className="user-cart-body-total-wrapper">
                                                        <div className="user-cart-body-total-content">
                                                            {isLoading ?
                                                                <Skeleton width={60} height={22} /> :
                                                                <p className="user-cart-body-total-sale">${Math.round(listSalePrice[index] * quantity[index] * 100) / 100}</p>}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="user-cart-body-remove" >
                                                    <div className="user-cart-body-remove-wrapper">
                                                        <div className="user-cart-body-remove-content" onClick={(e) => handleDeleteCart(e, book.bookId)}>
                                                            {isLoading ?
                                                                <Skeleton width={30} height={30} /> :
                                                                <i className='bx bx-trash'></i>}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='user-cart-bottom'>
                        <div className="user-cart-check-out">
                            <Button content={`CHECKOUT (TOTAL: ${total}$)`} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default UserCart;