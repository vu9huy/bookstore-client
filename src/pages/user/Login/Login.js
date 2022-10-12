import react, { useContext, useEffect, useState } from 'react';
import './auth.css';
import GoogleLoginBtn from '../../../components/auth/GoogleLoginLogout/GoogleLogin/GoogleLogin';
import FormInput from '../../../components/auth/inputs/LoginFormInput';
import { Link } from 'react-router-dom';
import GoogleLogoutBtn from '../../../components/auth/GoogleLoginLogout/GoogleLogout/GoogleLogout';
import { loginUser } from '../../../utils/api/CallApi';
import { useNavigate } from "react-router-dom";
import { userDataContext } from '../../../context/userDataContext';
import Header from '../../../layouts/header/Header';
import Footer from '../../../layouts/footer/Footer';
const USERNAME = process.env.REACT_APP_LOCALSTORAGE_USERNAME;
const EMAIL = process.env.REACT_APP_LOCALSTORAGE_EMAIL;
const AVATAR_URL = process.env.REACT_APP_LOCALSTORAGE_AVATAR_URL;


const Login = () => {
    const navigate = useNavigate();
    const [isEmty, setIsEmty] = useState(false);
    const [isRememberPassword, setIsRememberPassword] = useState(false);
    const [values, setValues] = useState({
        username: '',
        password: '',
    });
    const [isWrongUserData, setIsWrongUserData] = useState(false)

    const userContext = useContext(userDataContext);

    const inputs = [
        {
            id: 1,
            name: 'username',
            type: 'text',
            label: 'Username or Email',
            placeholder: "Ex: Vu Hong Quan",
            errorMessage: "Username should be 3-16 characters and shouldn't include any special characters.",
            regex: /^[A-Za-z0-9]{3,16}$/.test(values.username)
        },
        {
            id: 3,
            name: 'password',
            type: 'password',
            label: 'Password',
            placeholder: "Enter password",
            errorMessage: 'Password should be 8-30 characters and include at least 1 letter and 1 number.',
            regex: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(values.password)
        }
    ];

    async function onChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    async function handleSubmit(e) {
        e.preventDefault()
        if (values.username === '' || values.email === '' || values.password === '' || values.confirmPassword === '') {
            setIsEmty(true)
            setIsWrongUserData(false)
            return
        } else {
            setIsEmty(false)
            setIsWrongUserData(false)
        }
        try {

            const response = await loginUser(values, isRememberPassword);
            const username = localStorage.getItem(USERNAME) || sessionStorage.getItem(USERNAME) || '';
            const email = localStorage.getItem(EMAIL) || sessionStorage.getItem(EMAIL) || '';
            const avatarUrl = localStorage.getItem(AVATAR_URL) || sessionStorage.getItem(AVATAR_URL) || '';
            const userEmail = response.data?.data?.email;
            userContext.changeUserData({ username, email, avatarUrl })
            if (response.error_code == 401) {
                setIsWrongUserData(true)
                return
            }
            setIsWrongUserData(false)

            if (response.data?.error_code !== 0) {
                return
            }
            if (userEmail) {
                console.log(userEmail);
                navigate(`/verify-email/${userEmail}`);
                return
            }
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }
    const [childData, setChildData] = useState("");
    // console.log(childData);
    return (
        <>
            <Header />
            <div className='body'>
                <div className="register ">
                    <form method="POST" className="form login-form" id="form-1">
                        <p className='login-title'>Login</p>
                        {inputs.map((input, index) => {
                            return (<FormInput
                                key={input.id}
                                {...input}
                                regex={input.regex}
                                value={values[input.name]}
                                onChange={onChange}
                            />)
                        })}
                        <div className='option'>
                            <div className='remember' >
                                <input type="checkbox" id='remember' className='remember-checkbox' value={isRememberPassword} onChange={(e) => setIsRememberPassword(!isRememberPassword)} />
                                <label htmlFor="remember" className='remember-text'> Remember me</label>
                                {/* <div>{JSON.stringify(isRememberPassword)}</div> */}
                            </div>
                            <p className='forgot-password'>
                                <Link className='link' to='/forgot-password'> Forgot Password?</Link>
                            </p>
                        </div>
                        <button className="form-submit" onClick={(e) => handleSubmit(e)} >Login</button>
                        {isEmty && <p className='error-message'>* Please fill username and password</p>}
                        {isWrongUserData && <p className='error-message'>* Wrong username or password</p>}

                        <div className='or-login'>Don't have an account?
                            <Link className='link' to='/register'> Register now</Link>
                        </div>

                        <div className='or'>
                            <span>or</span>
                        </div>
                        <div className='google-login'>
                            <GoogleLoginBtn
                                passChildData={setChildData}
                            />
                            {/* <div>
                        <p>{childData.email}</p>
                        <p>{childData.name}</p>
                        <p>{childData.googleId}</p>
                    </div> */}
                            {/* <GoogleLogoutBtn /> */}
                        </div>

                    </form>

                </div>
            </div>
            {/* <Footer /> */}
        </>

    );
}

export default Login;
