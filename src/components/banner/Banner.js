
import './banner.scss';
// Import Swiper 
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Banner = ({ bannersList }) => {


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
                                    <p className='banner-title'>{banner.name}</p>
                                    <p className='banner-description'>{banner.description}</p>
                                    <div className='banner-link'>
                                        <a href={banner.url} target='blank'>Discover</a>
                                    </div>
                                </div>
                                <div className="banner-right">
                                    <div
                                        className='banner-image'
                                        style={{ backgroundImage: `url(${banner.imageUrl})` }}
                                    >
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}


            </Swiper>


        </div>

    )
}


export default Banner;