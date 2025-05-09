import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { topMeal } from './topMeal';
import { CarouselItem } from './CarouselItem';


// we have used sliders external library for sliding or rolling functionality using npm install (slick-carousel and react-slick).
export const MultiItemCarousel = () => {

  // the below setting is used for multiple item in the slider and use the item infinite time and auto slide the item.
   const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1500,
    arrows:false
  };

  return (
    <div>
        <Slider {...settings}>
            {topMeal.map((item) => (
              <CarouselItem image = {item.image} title={item.title}/>
            ))}
        </Slider>
    </div>
  )
}

