import { Link, useParams } from 'react-router-dom';
import './VerifyEmail.scss';
import newMailImage from '../../../assets/images/newmail.png'

const VerifyEmail = () => {
    const params = useParams();
    const userEmail = params.email;

    async function handleReSendVerifyMail() {

    }

    return (
        <div className='verify-email'>
            <div className='new-mail'>
                <img src={newMailImage} />
            </div>
            <div className='verify-email-text'>
                <p className='verify-email-title'>Please confirm your email</p>
                <span>An email was sent to</span>
                <span className='verify-email-mail'>{` ${userEmail}`}</span>
                <p>Please click the link in the email to continue.</p>
                <p className='verify-email-note'>*Verify email is only valid for 15 minutes.</p>
                <span>If you can't see us email, please click </span>
                <span className='verify-email-resend' onClick={() => handleReSendVerifyMail()} >here</span>
                <span> to resend verify mail.</span>
            </div>
            {/* <div onClick={() => handleReSendVerifyMail()} className='resend-mail-button'>
                Resend email
            </div> */}

        </div>
    )
}

export default VerifyEmail;