
import './banner.scss';
// Import Swiper 
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BannerSkeleton = () => {
    const bannersList = [0]
    const isLoading = true
    return (
        <div className='banner-wrapper'>
            <Swiper
                // spaceBetween={30}
                centeredSlides={true}
                modules={[Autoplay]}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                speed={1000}
                className="mySwiper"
            >
                {bannersList.map(banner => {
                    return (
                        <SwiperSlide key={banner._id}>
                            <div className="banner">
                                <div className="banner-left flex-column">
                                    <p className='banner-title'>
                                        {isLoading ? <div className=''>
                                            <Skeleton width='100%' height={48} />
                                            <Skeleton width='60%' height={48} />
                                        </div> : banner.name}
                                    </p>
                                    <p className='banner-description'>
                                        {/* {banner.description} */}
                                        {isLoading ? <div className=''>
                                            <Skeleton width='90%' height={20} />
                                            <Skeleton width='100%' height={20} />
                                            <Skeleton width='95%' height={20} />
                                            <Skeleton width='80%' height={20} />
                                            <Skeleton width='60%' height={20} />
                                        </div> : banner.description}
                                    </p>
                                    {isLoading ? <div className=''>
                                        <Skeleton width={140} height={60} />
                                    </div> : <div className='banner-link'>
                                        <a href={banner.url} target='blank'>Discover</a>
                                    </div>}


                                </div>
                                <div className="banner-right">
                                    {isLoading ? <div className=''>
                                        <Skeleton width='100%' height={400} />
                                    </div> : <div
                                        className='banner-image'
                                        style={{ backgroundImage: `url(${banner.imageUrl})` }}
                                    >
                                    </div>}
                                    {/* <div
                                        className='banner-image'
                                        style={{ backgroundImage: `url(${banner.imageUrl})` }}
                                    >
                                    </div> */}
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>

    )
}


export default BannerSkeleton;