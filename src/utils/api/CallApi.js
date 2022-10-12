
import axios from 'axios';
// import { LOCAL_STORAGE_ACCESS_TOKEN, apiUrl, LOCAL_STORAGE_REFRESH_TOKEN } from "../components/contexts/constants";
import AxiosApiInstance from './AxiosInterceptorsConfig';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
const apiUrl = process.env.REACT_APP_API_URL;
const REFRESH_TOKEN = process.env.REACT_APP_REFRESH_TOKEN;
const USERNAME = process.env.REACT_APP_LOCALSTORAGE_USERNAME;
const EMAIL = process.env.REACT_APP_LOCALSTORAGE_EMAIL;
const AVATAR_URL = process.env.REACT_APP_LOCALSTORAGE_AVATAR_URL;
const IS_LOGGED = process.env.REACT_APP_LOCALSTORAGE_IS_LOGGED;
// const CART_QUANTITY = process.env.REACT_APP_LOCALSTORAGE_CART_QUANTITY;
// const DEFAULT_AVATAR_URL = process.env.REACT_APP_DEFAULT_AVATAR_URL;
const DEFAULT_AVATAR_URL = 'https://vu9huy-books.s3.ap-east-1.amazonaws.com/logos_2_4x.png';

const cookies = new Cookies();

const maxAge = 60 * 60 * 24 * 365;


// REGISTER
const registerUser = async (userData) => {
    userData.avatarUrl = DEFAULT_AVATAR_URL;
    try {
        const response = await axios.post(`${apiUrl}/user/register`, userData);

        return response.data;
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { success: false, message: error.message }
    }
}

// VERIFY EMAIL
const verifyEmail = async (jwt) => {
    const data = { jwt: jwt }
    try {
        const response = await axios.post(`${apiUrl}/user/verify`, data);

        return response.data;
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { success: false, message: error.message }
    }
}

// LOGIN
const loginUser = async (userForm, rememberPassword) => {
    const cookieOption = rememberPassword ? { path: '/', maxAge: maxAge } : { path: '/' }

    try {
        const response = await axios.post(`${apiUrl}/user/login`, userForm);
        const userEmail = response.data?.data?.email;
        if (userEmail) {
            return response
        }
        if (response.data?.error_code == 0) {
            cookies.set(ACCESS_TOKEN, response.data.data.access_token, cookieOption);
            cookies.set(REFRESH_TOKEN, response.data.data.refresh_token, cookieOption);

            const access_token = response.data.data.access_token;
            const decoded = jwt_decode(access_token);
            const { username, email, avatarUrl, quantityCart } = decoded;
            if (rememberPassword) {
                // Delete user data in  session storage if not remember me is true
                sessionStorage.removeItem(USERNAME);
                sessionStorage.removeItem(EMAIL);
                sessionStorage.removeItem(AVATAR_URL);
                sessionStorage.removeItem(IS_LOGGED);
                // sessionStorage.removeItem(CART_QUANTITY);

                // Save user data in session storage if remember me is true
                localStorage.setItem(USERNAME, username);
                localStorage.setItem(EMAIL, email);
                localStorage.setItem(AVATAR_URL, avatarUrl);
                // localStorage.setItem(CART_QUANTITY, quantityCart);
                localStorage.setItem(IS_LOGGED, true);
            } else {
                // Delete user data in local storage if not remember me is false
                localStorage.removeItem(USERNAME);
                localStorage.removeItem(EMAIL);
                localStorage.removeItem(AVATAR_URL);
                // localStorage.removeItem(CART_QUANTITY);
                localStorage.removeItem(IS_LOGGED);

                // Save user data in session storage if not remember me is false
                sessionStorage.setItem(USERNAME, username);
                sessionStorage.setItem(EMAIL, email);
                sessionStorage.setItem(AVATAR_URL, avatarUrl);
                // sessionStorage.setItem(CART_QUANTITY, quantityCart);
                sessionStorage.setItem(IS_LOGGED, true);
            }

        }
        return response
    } catch (error) {
        if (error?.response?.data) return error?.response?.data
        else return { success: false, message: error.message }
    }
}

// LOGOUT
const logoutUser = async () => {
    try {
        cookies.remove(ACCESS_TOKEN, { path: '/' });
        cookies.remove(REFRESH_TOKEN, { path: '/' });

        localStorage.removeItem(USERNAME);
        localStorage.removeItem(EMAIL);
        localStorage.removeItem(AVATAR_URL);
        localStorage.setItem(IS_LOGGED, false);

        sessionStorage.removeItem(USERNAME);
        sessionStorage.removeItem(EMAIL);
        sessionStorage.removeItem(AVATAR_URL);
        sessionStorage.setItem(IS_LOGGED, false);
        return { success: true }
    } catch (error) {
        console.log(error);
        return { success: true, error: error }
    }
}

// REFRESH TOKEN
const refreshAccessToken = async () => {
    try {
        const refreshToken = cookies.get(REFRESH_TOKEN)

        const response = await axios.post(`${apiUrl}/user/refresh-token`, { refresh_token: refreshToken }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.data.error_code == 0) {
            cookies.set(ACCESS_TOKEN, response.data.data.access_token)
            cookies.set(REFRESH_TOKEN, response.data.data.refresh_token)
        }
        // console.log(response.data.data.access_token);
        return response.data.data.access_token
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { success: false, message: error.message }
    }
}


// BOOK
// CREATE BOOK 
const createBookApi = async (banner) => {
    try {
        const response = await AxiosApiInstance.post(`${apiUrl}/books`, banner);
        return response
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { success: false, message: error.message }
    }
}

// GET ALL BOOK 
const getAllBookApi = async (skip, limit) => {
    try {
        const response = await AxiosApiInstance.get(`${apiUrl}/books?skip=${skip}&limit=${limit}`);
        return response
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { success: false, message: error.message }
    }
}

// GET BOOK BY ID
const getBookByIdApi = async (id) => {
    try {
        const response = await AxiosApiInstance.get(`${apiUrl}/books/${id}`);
        return response
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { success: false, message: error.message }
    }
}

// GET BOOKS BY LIST ID
const getBooksByListIdsIdApi = async (listId) => {
    try {
        const response = await AxiosApiInstance.post(`${apiUrl}/books/listid`, listId);
        return response
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { success: false, message: error.message }
    }
}

// GET BOOKS BY CONDITION
const getBookByConditionApi = async (ObjQuery, skip, limit) => {
    let queryAray = [];
    for (const prop in ObjQuery) {
        if (ObjQuery[prop] !== '') {
            queryAray.push(`${prop}=${ObjQuery[prop]}&`);
        }
    }
    queryAray.push(`skip=${skip}&limit=${limit}`)
    const queryString = queryAray.join('')
    // console.log('queryString', queryString);    
    try {
        const response = await AxiosApiInstance.get(`${apiUrl}/books/search?${queryString}`);
        return response
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { success: false, message: error.message }
    }
}

// GET COUNT OF BOOKS BY CONDITION
const getCountOfBookByConditionApi = async (ObjQuery) => {
    let queryAray = [];
    for (const prop in ObjQuery) {
        if (ObjQuery[prop] !== '') {
            queryAray.push(`${prop}=${ObjQuery[prop]}`);
        }
    }
    // queryAray.push(`skip=${skip}&limit=${limit}`)
    const queryString = queryAray.join('')
    try {
        const response = await AxiosApiInstance.get(`${apiUrl}/books/count?${queryString}`);
        return response
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { success: false, message: error.message }
    }
}


// UPDATE BOOK BY ID
const updateBookByIdApi = async (id, book) => {
    try {
        const response = await AxiosApiInstance.put(`${apiUrl}/books/${id}`, book);
        return response
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { success: false, message: error.message }
    }
}

// DELETE BOOK BY ID
const deleteBookByIdApi = async (id) => {
    try {
        const response = await AxiosApiInstance.delete(`${apiUrl}/books/${id}`);
        return response
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { success: false, message: error.message }
    }
}

// BANNER
// CREATE BANNER 
const createBannerApi = async (banner) => {
    try {
        const response = await AxiosApiInstance.post(`${apiUrl}/banners`, banner);
        return response
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { success: false, message: error.message }
    }
}

// GET All BANNER 
const getAllBannerApi = async () => {
    try {
        const response = await AxiosApiInstance.get(`${apiUrl}/banners`);
        return response
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { success: false, message: error.message }
    }
}

// GET BANNER BY ID
const getBannerByIdApi = async (id) => {
    try {
        const response = await AxiosApiInstance.get(`${apiUrl}/banners/${id}`);
        return response
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { success: false, message: error.message }
    }
}

// UPDATE BANNER BY ID
const updateBannerByIdApi = async (id, banner) => {
    try {
        const response = await AxiosApiInstance.put(`${apiUrl}/banners/${id}`, banner);
        return response
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { success: false, message: error.message }
    }
}

// DELETE BANNER BY ID
const deleteBannerByIdApi = async (id) => {
    try {
        const response = await AxiosApiInstance.delete(`${apiUrl}/banners/${id}`);
        return response
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { success: false, message: error.message }
    }
}

// CART
// GET ALL BOOK IN CART 
const getAllBookInCartApi = async () => {
    try {
        const response = await AxiosApiInstance.get(`${apiUrl}/carts/`);
        return response
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { success: false, message: error.message }
    }
}

// DELETE BOOK IN CART
const deleteBookInCartApi = async (bookCart) => {
    try {
        const response = await AxiosApiInstance.put(`${apiUrl}/carts/remove`, bookCart);
        return response
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { success: false, message: error.message }
    }
}

// ADD BOOK IN CART
const addBookInCartApi = async (bookCart) => {
    try {
        const response = await AxiosApiInstance.put(`${apiUrl}/carts/add`, bookCart);
        return response
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { success: false, message: error.message }
    }
}


// DISPLAY 
// CREATE DISPLAY 
const createDisplayApi = async (display) => {
    try {
        const response = await AxiosApiInstance.post(`${apiUrl}/displays`, display);
        return response
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { success: false, message: error.message }
    }
}

// GET All DISPLAY 
const getAllDisplayApi = async () => {
    try {
        const response = await AxiosApiInstance.get(`${apiUrl}/displays`);
        return response
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { success: false, message: error.message }
    }
}

// GET DISPLAY BY ID
const getDisplayByIdApi = async (id) => {
    try {
        const response = await AxiosApiInstance.get(`${apiUrl}/displays/${id}`);
        return response
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { success: false, message: error.message }
    }
}


// UPDATE DISPLAY BY ID
const updateDisplayByIdApi = async (id, display) => {
    try {
        const response = await AxiosApiInstance.put(`${apiUrl}/displays/${id}`, display);
        return response
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { success: false, message: error.message }
    }
}

// DELETE DISPLAY BY ID
const deleteDisplayByIdApi = async (id) => {
    try {
        const response = await AxiosApiInstance.delete(`${apiUrl}/displays/${id}`);
        return response
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { success: false, message: error.message }
    }
}

// UPLOAD IMAGES
const uploadImagesApi = async (file) => {
    try {
        const response = await AxiosApiInstance.get(`${apiUrl}/upload-image`, { params: { name: file.name } });
        return response
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { success: false, message: error.message }
    }
}



export {
    registerUser,
    verifyEmail,
    loginUser,
    logoutUser,
    refreshAccessToken,

    createBookApi,
    getAllBookApi,
    getBooksByListIdsIdApi,
    getBookByConditionApi,
    getCountOfBookByConditionApi,
    getBookByIdApi,
    updateBookByIdApi,
    deleteBookByIdApi,

    createBannerApi,
    getAllBannerApi,
    getBannerByIdApi,
    updateBannerByIdApi,
    deleteBannerByIdApi,

    getAllBookInCartApi,
    deleteBookInCartApi,
    addBookInCartApi,

    createDisplayApi,
    getAllDisplayApi,
    getDisplayByIdApi,
    updateDisplayByIdApi,
    deleteDisplayByIdApi,

    uploadImagesApi
}