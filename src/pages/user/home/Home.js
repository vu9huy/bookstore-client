
import './Home.scss';
import BookSlide from '../../../layouts/books-slide/BookSlide';
import BookItem2 from '../../../components/book-item-2/BookItem2';
import Header from '../../../layouts/header/Header';
import Footer from '../../../layouts/footer/Footer';
import Banner from '../../../components/banner/Banner';
import { useQuery, } from '@tanstack/react-query';
import { getAllBannerApi, getAllDisplayApi } from '../../../utils/api/CallApi';
import { useEffect } from 'react';
// Import Skeleton 
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import BannerSkeleton from '../../../components/banner/BannerSkeleton';
import BookSlideSkeleton from '../../../layouts/books-slide/BookSlideSkeleton';
import GoogleLoginBtn from '../../../components/auth/GoogleLoginLogout/GoogleLogin/GoogleLogin';

const Home = () => {
    const { isLoading, data, error } = useQuery([`banners`], async () => await getAllBannerApi(), { refetchOnWindowFocus: false, cacheTime: Infinity, staleTime: Infinity })
    const bannersList = data?.data?.data || [];
    // console.log('bannersList', bannersList);

    const { isLoading: isLoading2, data: data2, error: error2 } = useQuery([`displays`], async () => await getAllDisplayApi(), { refetchOnWindowFocus: false, cacheTime: Infinity, staleTime: Infinity })
    const displaysList = data2?.data?.data || [];
    // console.log('displaysList', displaysList);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Header />
            <div className='body'>
                <div className='home'>
                    <div className='home-container'>
                        {isLoading ?
                            <BannerSkeleton /> :
                            <Banner bannersList={bannersList} isLoading={isLoading} />}

                        {isLoading2 ?
                            <BookSlideSkeleton /> :
                            <>
                                {
                                    displaysList.map(display => {
                                        return (
                                            <BookSlide display={display} key={display.displayId} isLoading4={isLoading2} />
                                        )
                                    })
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
            {/* <GoogleLoginBtn /> */}
            <Footer />
        </>

    )
}

export default Home;