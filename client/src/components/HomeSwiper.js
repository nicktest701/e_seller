import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y, Scrollbar } from "swiper";
import { EffectFade } from "swiper";

// Styles must use direct files imports
import "swiper/css/bundle";
import "swiper/css"; // core Swiper
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/pagination";

import SwiperContent from "./SwiperContent";
import { IMAGES } from "../constants";

function HomeSwiper() {
  return (
    <Swiper
      className="swiper"
      effect="fade"
      modules={[Autoplay, Pagination, Navigation, A11y, Scrollbar, EffectFade]}
      speed={2000}
      spaceBetween={30}
      centeredSlides={true}
      loop
      autoplay={{
        delay: 5000,
        // disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      // navigation={true}
    >
      <SwiperSlide className="swiper-slide">
        <SwiperContent img={IMAGES.bgImage1} content="Frebby Tech Consults" />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <SwiperContent img={IMAGES.bgImage2} content="Prepaid Units" />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <SwiperContent img={IMAGES.bgImage3} content="Evoucher & Pincodes" />
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <SwiperContent img={IMAGES.bgImage5} content="Bulk Airtime & EVD's" />
      </SwiperSlide>
    </Swiper>
  );
}

export default HomeSwiper;
