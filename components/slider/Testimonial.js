/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React from 'react';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link"

const TestimonialSlider = ({ testimonials }) => {
    return (
        <>
            <section className="section-box">
                <div className="container mt-110">
                    <div className="row">
                        <div className="col-lg-9 col-sm-8">
                            <h3 className="text-heading-1 mb-10">
                                Thriving Sites, Thrilled Clients
                            </h3>
                            <p className="text-body-lead-large color-gray-600">
                                Meet Our Clients: Where WordPress and Worry-Free Webcare
                                Unite!
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-80">
                    <div className="box-swiper pb-120 pt-5">
                        <div className="swiper-container swiper-group-4">
                            <Swiper
                                modules={[FreeMode, Navigation, Autoplay]}
                                centeredSlides={true}
                                grabCursor={true}
                                autoHeight={true}
                                loop={true}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false
                                }}
                                navigation={{
                                    prevEl: ".swiper-button-prev-4",
                                    nextEl: ".swiper-button-next-4"
                                }}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 1,
                                        spaceBetween: 20,
                                    },
                                    768: {
                                        slidesPerView: 2,
                                        spaceBetween: 40,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 50,
                                    },
                                }}
                                className="swiper-wrapper"
                            >
                                {testimonials.map((item, i) => (
                                    <SwiperSlide key={item.id}>
                                        <div className="swiper-slide active">
                                            <div className={`card-grid-style-3 hover-up ${item.bg}`}>
                                                <div className="grid-3-img">
                                                    <img src={item?.person?.photo?.url} alt="Smart Tax & Accounting" />
                                                </div>
                                                <h3 className="text-heading-6 mb-5 mt-20">{item?.person?.name}</h3>
                                                <span className="text-body-small d-block">{item.company}</span>
                                                <p className="text-body-text text-desc color-gray-500 mt-20">{item.content}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className="swiper-button-next swiper-button-next-4" />
                        <div className="swiper-button-prev swiper-button-prev-4" />
                    </div>
                </div>
            </section>

        </>
    );
};

export default TestimonialSlider;

