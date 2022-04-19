import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const UploadSlider = (props) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const img_list = props.img_list;

  return (
    <Slider {...settings}>
      {img_list.map((img, idx) => {
        return (
          <StyledSlider key={idx}>
            <img src={img}></img>
          </StyledSlider>
        );
      })}
    </Slider>
  );
};

const StyledSlider = styled(Slider)`
  .slick-list {
    //얘로 크기조정 했음
    width: 100%;
    height: 600px;
    margin: 0 auto;
  }
  .slick-prev:before {
    opaicty: 1; // 기존에 숨어있던 화살표 버튼이 보이게
    color: black; // 버튼 색은 검은색으로
    left: 0;
  }
  .slick-next:before {
    opacity: 1;
    color: black;
  }
`;

export default UploadSlider;
