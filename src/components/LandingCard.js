import React from "react";
import { FastAverageColor } from "fast-average-color";
import styled from "styled-components";
import { Howl } from "howler";

const LandingCard = ({ Imgsrc, PrevLink, setDomColor, setLight }) => {
  const fac = new FastAverageColor();
  const sound = new Howl({
    src: [PrevLink],
    html5: true,
  });

  const handleHover = (image) => {
    fac.getColorAsync(image, { algorithm: "dominant" }).then((color) => {
      setDomColor(color.hex);
      color.isLight ? setLight(true) : setLight(false);
    });
  };

  return (
    <Img
      src={Imgsrc}
      alt="LandingVisual"
      onClick={() => {
        sound.stop();
        sound.play();
      }}
      onMouseLeave={() => {
        sound.stop();
      }}
      onMouseEnter={() => {
        handleHover(Imgsrc);
      }}
    ></Img>
  );
};

export default LandingCard;

const Img = styled.img`
  width: 50%;
  transition: all 0.2s ease-out;
  cursor: pointer;
  // position: relative;
  &:hover {
    transform: translateY(-12px) translateX(-12px) scale(1.08);
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  }
`;
