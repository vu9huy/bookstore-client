import './App.scss';
import './assets/fonts/boxicons-2.1.1/css/boxicons.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/user/home/Home';
import Login from './pages/user/Login/Login';
import Register from './pages/user/Register/Register';
import RegisterSuccess from './pages/user/register-success/RegisterSuccess';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import NotFound from './pages/user/404/404';
import { useContext, useState, useEffect } from 'react';
import Book from './pages/user/book/Book';
import UserCart from './pages/user/cart/UserCart';
import { userDataContext } from './context/userDataContext';
import VerifyEmail from './pages/user/verify-email/VerifyEmail';
import Search from './pages/user/search/Search';
import Profile from './pages/user/profile/Profile';
const IS_LOGGED = process.env.REACT_APP_LOCALSTORAGE_IS_LOGGED;


function App() {
  const [isLogin, setIsLogin] = useState(false);
  const userContext = useContext(userDataContext);
  const userData = userContext.userData;
  const isLogged = userData.isLogged;

  useEffect(() => {
    // console.log('userData', userData.isLogged);
    if (isLogged) {
      // console.log('isLogged', isLogged);
      setIsLogin(true)
    } else {
      // console.log('isLogged', isLogged);
      setIsLogin(false)
    }
  }, [isLogged])


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={isLogin ? <Navigate to='/' /> : <Login />} />
          <Route path='/register' element={isLogin ? <Navigate to='/' /> : <Register />} />
          <Route path='/register-response' element={<RegisterSuccess />} />
          <Route path='/verify-email/:email' element={<VerifyEmail />} />
          <Route path='/search' element={<Search />} />
          <Route path='/users/:username' element={<Profile />} />
          <Route path='/book/:id' element={<Book />} />
          <Route path='/cart' element={<UserCart />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
