
import React, { useContext } from 'react';
import googleLogoImage from '../../../../assets/images/google-logo.webp';
import './GoogleLogin.scss'
import { useGoogleLogin } from '@react-oauth/google';
import { signInWithGoogle } from '../../../../utils/api/CallApi';
const USERNAME = process.env.REACT_APP_LOCALSTORAGE_USERNAME;
const EMAIL = process.env.REACT_APP_LOCALSTORAGE_EMAIL;
const AVATAR_URL = process.env.REACT_APP_LOCALSTORAGE_AVATAR_URL;
import { useNavigate } from "react-router-dom";
import { userDataContext } from '../../../../context/userDataContext';

const GoogleLoginBtn = ({ passChildData }) => {
    const navigate = useNavigate();
    const userContext = useContext(userDataContext);

    async function handleGoogleLoginSuccess(tokenResponse) {
        const accessToken = tokenResponse.access_token;
        // console.log('accessToken', accessToken);
        const response = await signInWithGoogle(accessToken);
        // console.log('response', response);

        const username = localStorage.getItem(USERNAME) || '';
        const email = localStorage.getItem(EMAIL) || '';
        const avatarUrl = localStorage.getItem(AVATAR_URL) || '';
        // const userEmail = response.data?.data?.email;
        userContext.changeUserData({ username, email, avatarUrl });
        navigate('/');
        console.log('login xong');
    }
    const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });


    return (
        <div className='google-login-button-wrapper'>
            <button className='form-submit google-login-button' onClick={() => login()}>
                <img src={googleLogoImage} />
                <div className='google-auth'>Sign in with Google</div>
            </button>
        </div>
    );
}

export default GoogleLoginBtn;
