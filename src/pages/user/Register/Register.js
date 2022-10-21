import react, { useEffect, useState } from 'react';
import '../Login/auth.css';
import GoogleLoginBtn from '../../../components/auth/GoogleLoginLogout/GoogleLogin/GoogleLogin';
import FormInput from '../../../components/auth/inputs/RegisterFormInput';
import { Link } from 'react-router-dom';
import Header from '../../../layouts/header/Header';
import Footer from '../../../layouts/footer/Footer';


function Register() {

    const [childData, setChildData] = useState("");

    return (
        <>
            <Header />
            <div className='body'>
                <div className="register">
                    <div className="form register-form" id="form-1">
                        <p className='login-title'>Register</p>
                        <FormInput />
                        <div className='or-login'>Already have an account?
                            <Link className='link' to='/login'> Login now</Link>
                        </div>
                        <div className='or'>
                            <span>or</span>
                        </div>
                        <div className='google-login'>
                            <GoogleLoginBtn
                            // passChildData={setChildData}
                            />
                            {/* <div>
                        <p>{childData.email}</p>
                        <p>{childData.name}</p>
                        <p>{childData.googleId}</p>
                    </div> */}
                            {/* <GoogleLogoutBtn /> */}
                        </div>

                    </div>

                </div>
            </div>
            {/* <Footer /> */}
        </>

    );
}

export default Register;
