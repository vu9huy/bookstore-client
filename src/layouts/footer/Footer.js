import { Link } from 'react-router-dom';
import Logo from '../../components/logo/Logo';
import Social from '../../components/social/Social';
import './Footer.scss';

const Footer = () => {

    return (
        <div className='footer'>
            <div className='footer-wrapper'>
                <div className='footer-top'>
                    <div className='footer-top-left'><Logo /></div>
                    <Link to='/' className='footer-top-right'>TERM & CONDITIONS</Link>
                </div>
                <div className='footer-bottom'>
                    <div className='footer-bottom-left'>
                        <div className='footer-bottom-title'>
                            <div className='about-us'>ABOUT US</div>
                            <div className='about-us-content'>
                                <div className='about-us-item'>
                                    <Link to='/about-us-link' >Partner with us</Link>
                                </div>
                                <div className='about-us-item'>
                                    <Link to='/about-us-link' >Jobs</Link>
                                </div>
                                <div className='about-us-item'>
                                    <Link to='/about-us-link' >Cookie Statement</Link>
                                </div>
                                <div className='about-us-item'>
                                    <Link to='/about-us-link' >Privacy Statement</Link>
                                </div>
                            </div>
                        </div>
                        {/* <div className='footer-bottom-social'>
                            <div className=''><Social /></div>
                        </div> */}
                    </div>
                    <div className='footer-bottom-right'>
                        <div className='footer-bottom-right-contact'>
                            <div className='copy-right'>© Copyright 2022, Vu Hong Quan</div>
                            {/* <div className='contact'></div> */}
                            <div className='contact'>+84 xx xxx xxx</div>
                            <div className='contact'>quan2704vu@gmail.com</div>
                            <div className='contact'>fooxstore.book@gmail.com</div>
                        </div>
                        <div className='footer-bottom-right-social'>
                            <Social />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;