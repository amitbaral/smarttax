import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import { useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

const ThumbSlider = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const data = [
        {
            img: "9.jpg",
            avatar: "1.jpg",
            title: "Liguid Wave",
            author: "Sound Box"
        },
        {
            img: "10.jpg",
            avatar: "2.jpg",
            title: "Liguid Wave",
            author: "Sound Box"
        },
    ];


    return (
        <>

            <div className="galleries">
                <div className="detail-gallery"><span className="icon-plus" />
                    <div className="product-image-slider">
                        <Swiper
                         modules={[FreeMode, Navigation, Thumbs]}
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                           
                        >                            <SwiperSlide>
                                <figure className="border-radius-10">
                                    <Image src="/assets/imgs/page/single-product/img-sp.jpg" alt="product image" width={500} height={400} />
                                </figure>
                            </SwiperSlide>
                            <SwiperSlide>
                                <figure className="border-radius-10">
                                    <Image src="/assets/imgs/page/single-product/img-sp2.jpg" alt="product image" width={500} height={400} />
                                </figure>
                            </SwiperSlide>
                            <SwiperSlide>
                                <figure className="border-radius-10">
                                    <Image src="/assets/imgs/page/single-product/img-sp3.jpg" alt="product image" width={500} height={400} />
                                </figure>
                            </SwiperSlide>
                            <SwiperSlide>
                                <figure className="border-radius-10">
                                    <Image src="/assets/imgs/page/single-product/img-sp4.jpg" alt="product image" width={500} height={400} />
                                </figure>
                            </SwiperSlide>
                        </Swiper>
                    </div>

                </div>
                <div className="slider-nav-thumbnails">
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="">                    <SwiperSlide><div><Image src="/assets/imgs/page/single-product/img-sp.jpg" alt="product image" width={100} height={80} /></div></SwiperSlide>
                    <SwiperSlide><div><Image src="/assets/imgs/page/single-product/img-sp2.jpg" alt="product image" width={100} height={80} /></div></SwiperSlide>
                    <SwiperSlide><div><Image src="/assets/imgs/page/single-product/img-sp3.jpg" alt="product image" width={100} height={80} /></div></SwiperSlide>
                    <SwiperSlide><div><Image src="/assets/imgs/page/single-product/img-sp4.jpg" alt="product image" width={100} height={80} /></div></SwiperSlide>
                </Swiper>
                </div>
                
            </div>


            {/* <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
                </SwiperSlide>
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
                </SwiperSlide>
            </Swiper> */}


        </>
    );
};

export default ThumbSlider;

