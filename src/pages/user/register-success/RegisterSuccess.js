import './RegisterSuccess.scss';
import registerSuccessImage from '../../../assets/images/success.webp';
import registerFailureImage from '../../../assets/images/failure.webp';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { verifyEmail } from '../../../utils/api/CallApi';
// Import React Query 
import { useQuery, } from '@tanstack/react-query';

const RegisterSuccess = () => {

    const [params] = useSearchParams();
    const userEmail = params.get('email');
    const jwt = params.get('token');

    const { isLoading, data, error } = useQuery(['verify-email'], async () => await verifyEmail(jwt), { refetchOnWindowFocus: false, cacheTime: Infinity, staleTime: Infinity })

    const isSuccess = data?.error_code === 0;

    return (
        <>
            {isLoading && <div>Loading...</div>}
            {isSuccess && <div className='register-success register-response'>
                <div className='register-response-image register-success-image'>
                    <img src={registerSuccessImage} />
                </div>
                <div className='register-success-text'>
                    <p>Congratulations,</p>
                    <p>{`you have successfully `}
                        <span>
                            <span className='register-success-link'>
                                register!
                            </span>
                        </span>

                    </p>

                </div>
                <Link to='/login' className='register-success-button'>
                    Login now
                </Link>
            </div>}

            {isSuccess || <div className='register-failure register-response'>
                <div className='register-response-image register-failure-image'>
                    <img src={registerFailureImage} />
                </div>
                <div className='register-success-text'>
                    <p>Sorry, we can't verify your email.</p>
                    <p>Please click the button below to get new verify email.</p>
                </div>
                <Link to='/login' className='register-success-button'>
                    Resend
                </Link>
            </div>}
        </>

    )
}

export default RegisterSuccess;