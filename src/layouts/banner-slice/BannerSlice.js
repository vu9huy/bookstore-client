import axios from 'axios';
import { useEffect, useState } from 'react';
import Banner from '../../components/banner/Banner';
import { getAllBannerApi } from '../../utils/api/CallApi';
import './BannerSlice.scss';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper 
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// Import React Query 
import { useQuery } from '@tanstack/react-query';

const BannerSlice = () => {
    // const [banners, setBanners] = useState([])

    const { isLoading, data, error } = useQuery([`banners`], async () => await getAllBannerApi(), { refetchOnWindowFocus: false, cacheTime: 600000, staleTime: Infinity })
    const result = data?.data?.data;
    const banners = result || []

    // useEffect(async () => {
    //     try {
    //         const response = await getAllBannerApi();
    //         const result = response.data.data;
    //         setBanners(result)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [])

    return (
        <>
            <div className='banner-slice'>
                <Swiper
                    grabCursor={true}
                    spaceBetween={0}
                    slidesPerView={1}
                    speed={1000}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    className="mySwiper">
                    {banners.map((banner, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <Banner name={banner.name} description={banner.description} imageUrl={banner.imageUrl} url={banner.url} />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </>
    )
}

export default BannerSlice;