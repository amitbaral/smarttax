import Image from 'next/image';
import React, { FC } from 'react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Define types for Offer
interface Offer {
  id: string;
  title: string;
  image: {
    url: string;
  };
  excerpt?: string;
}

// Define types for Props
interface Props {
  offers: Offer[];
}

// Swiper configuration
const swiperConfig = {
  modules: [Navigation, Autoplay],
  slidesPerView: 'auto' as 'auto', // Explicitly set the type here
  spaceBetween: 30,
  loop: true,
  breakpoints: {
    640: { slidesPerView: 1, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 40 },
    1024: { slidesPerView: 3, spaceBetween: 50 },
  },
  autoplay: { delay: 2500, disableOnInteraction: false },
  navigation: { prevEl: '.swiper-button-prev-5', nextEl: '.swiper-button-next-5' },
};

const OfferSlider: FC<Props> = ({ offers }) => {
  // Transform offers into the required format
  const transformedOffers = offers.map(({ id, title, image, excerpt }) => ({
    id,
    img: image.url,
    title,
    text: excerpt,
  }));

  return (
    <div className="box-swiper">
      <div className="swiper-container swiper-group-4">
        <Swiper {...swiperConfig} className="swiper-wrapper pb-70 pt-5">
          {transformedOffers.map(({ id, img, title, text }) => (
            <SwiperSlide key={id}>
              <div className="swiper-slide">
                <div className="card-grid-style-2 hover-up">
                  <div className="grid-2-img">
                    <img src={img} alt={title} />
                  </div>
                  <h3 className="text-heading-5 mt-20">{title}</h3>
                  <p className="text-body-text color-gray-600 mt-20">{text}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default OfferSlider;
