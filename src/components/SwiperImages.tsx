"use client";

// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button } from "./ui/button";
import Image from "next/image";

const SwiperImages = () => {
    const ImageList = [
        {
            srcAddress: "/images/h1.jpg",
        },
        {
            srcAddress: "/images/h2.jpg",
        },

        {
            srcAddress: "/images/h3.jpg",
        },
    ];

    return (
        <Swiper
            modules={[EffectFade, Autoplay]}
            effect='fade'
            fadeEffect={{
                crossFade: true,
            }}
            speed={2000}
            className='mySwiper'
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            loop={true} // Optional: enables infinite loop
        >
            {ImageList?.map((item, index) => {
                return (
                    <SwiperSlide key={index}>
                        <div className='relative w-full flex h-full items-center justify-center '>
                            <Image
                                src={item.srcAddress}
                                alt='Logo'
                                width={0}
                                height={0}
                                sizes='100vw'
                                className='w-full h-[95vh] object-cover'
                            />
                            <div className='absolute z-20 mx-auto text-center text-white'>
                                <div className='mb-5 font-tertiary uppercase tracking-[6px]'>
                                    Just Enjoy &amp; Relax
                                </div>
                                <h1 className='mx-auto mb-6 max-w-[920px] font-primary text-[32px] uppercase tracking-[2px] lg:text-[68px]'>
                                    Your Luxury Hotel For Vacation
                                </h1>
                                <Button className='btn px-12 py-6 cursor-pointer bg-primary text-white mx-auto'>
                                    See our rooms
                                </Button>
                            </div>
                        </div>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};

export default SwiperImages;
