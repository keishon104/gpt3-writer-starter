// core version + navigation, pagination modules:
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const carouselImages = [
  { name: "Obama", href: "WYmjDP_8kMU" },
  { name: "Ghandi", href: "E4bycvNRRm8" },
  { name: "Nature", href: "cssvEZacHvQ" },
  { name: "Space", href: "084iI8XTfN0" },
];

const Carousel = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, Autoplay]}
      spaceBetween={30}
      centeredSlides={true}
      slidesPerView={1}
      autoplay={{
        delay: 3500,
      }}
      loop={true}
      breakpoints={{
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
      }}
    >
      {carouselImages.map((item) => (
        <SwiperSlide className="" key={item.href}>
          <img
            className="h-[30rem]"
            key={item.href}
            src={`https://source.unsplash.com/${item.href}/1920x2614`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
