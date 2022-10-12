import './Social.scss';
import { Link } from 'react-router-dom';
import '../../assets/fonts/boxicons-2.1.1/css/boxicons.min.css'

const Social = () => {
    const facebookUrl = 'https://www.facebook.com/'
    const twitterUrl = 'https://www.twitter.com/'
    const instagramUrl = 'https://www.instagram.com/'

    return (
        <div className='social'>
            <a href={facebookUrl} target="_blank" className='social-item'>
                <i className='bx bxl-facebook-square' ></i>
            </a>
            <a href={instagramUrl} target="_blank" className='social-item'>
                <i className='bx bxl-instagram-alt'></i>
            </a>
            <a href={twitterUrl} target="_blank" className='social-item'>
                <i className='bx bxl-twitter' ></i>
            </a>
        </div>
    )
}

export default Social;