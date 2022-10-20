
import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import googleLogoImage from '../../../../assets/images/google-logo.webp';
import './GoogleLogin.scss'
const clientId = '934971953145-3cam4qdff5st75e60mi6nrpeoucsqse3.apps.googleusercontent.com'
// import {  GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GoogleLoginBtn = ({ passChildData }) => {

    // const login = useGoogleLogin({
    //     onSuccess: async respose => {
    //         try {
    //             const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
    //                 headers: {
    //                     "Authorization": `Bearer ${respose.access_token}`
    //                 }
    //             })

    //             console.log(res.data)
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    // });

    async function success(credentialResponse) {
        const userObjectRaw = jwt_decode(credentialResponse.credential);
        const email = userObjectRaw.email;
        const name = userObjectRaw.name;
        const avatar = userObjectRaw.picture;
        const userName = email.substr(0, email.indexOf('@gmail.com'))
        // console.log(userObjectRaw);
        const userObject = {
            userName,
            name,
            email,
            avatar
        }
        console.log(userObject);
    }


    return (
        <div className='google-login-button-wrapper'>
            {/* <button className='form-submit google-login-button' onClick={login}>
                <img src={googleLogoImage} />
                <div className='google-auth'>Sign in with Google</div>
            </button> */}
            <GoogleLogin
                size='large'
                width='320'
                onSuccess={(credentialResponse) => success(credentialResponse)}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </div>
    );
}

export default GoogleLoginBtn;
