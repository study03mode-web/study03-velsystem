import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const ClientCarousel: React.FC = React.memo(() => {
  // Generate customer image paths dynamically
  const customerImages = useMemo(
    () =>
      Array.from({ length: 68 }, (_, i) => {
        const index = i + 1;
        return `/customer/customer-${index}.png`;
      }),
    []
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            OUR CLIENTS
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={4500}
          breakpoints={{
            0: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1000: { slidesPerView: 5, spaceBetween: 40 },
          }}
          className="brand-slide"
        >
          {customerImages.map((image, index) => (
            <SwiperSlide key={index}>
                <div className="h-24 md:h-32 flex items-center justify-center">
                  <img
                    src={image}
                    alt={`Client Logo ${index + 1}`}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
});

ClientCarousel.displayName = "ClientCarousel";

export default ClientCarousel;
