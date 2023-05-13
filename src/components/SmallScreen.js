import React from "react";
import styled, { keyframes } from "styled-components";
import Rating from "@mui/material/Rating";
import { Howl } from "howler";

const sound = new Howl({
  src: "https://p.scdn.co/mp3-preview/05e995b230b39b35942e268502a411070c8efc72?cid=cfe923b2d660439caf2b557b21f31221",
  html5: true,
});

const SmallScreen = () => {
  return (
    <Div>
      <LogoContainer>
        <RotLogo src="./assets/logo.png" alt="logo"></RotLogo>
        <LogoTitle>Sharify</LogoTitle>
      </LogoContainer>
      <H1>Screen Size Too Small</H1>
      <H2>
        Sharify doesn't support small screens right now, Move to a bigger screen
        to keep the good tunes going!
      </H2>
      <Cont>
        <img
          src="https://i.scdn.co/image/ab67616d0000b2737f4e05714b5d4d43486f39a8"
          alt="Small Screen pic"
          style={{
            width: "100%",
            cursor: "pointer",
          }}
          onClick={() => {
            sound.stop();
            sound.play();
          }}
          onMouseLeave={() => {
            sound.stop();
          }}
        ></img>
        <h2
          style={{
            fontFamily: "spotify-medium",
            marginTop: "20px",
            fontSize: "18px",
          }}
        >
          Size Too Smal
        </h2>
        <h4
          style={{
            fontFamily: "spotify-light",
            marginTop: "10px",
            fontSize: "16px",
          }}
        >
          Sufjan Stevens - 2004
        </h4>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <h4
            style={{
              fontFamily: "spotify-light",
              marginTop: "5px",
              fontSize: "14px",
            }}
          >
            Popularity{" "}
            <Rating
              value={(40 * 5) / 100}
              name="half-rating"
              precision={0.2}
              style={{
                fontSize: "14px",
                color: "black",
              }}
              readOnly
            />
          </h4>
          <h4
            style={{
              fontFamily: "spotify-light",
              marginTop: "5px",
              fontSize: "14px",
            }}
          >
            ART POP
          </h4>
        </div>
      </Cont>
    </Div>
  );
};

export default SmallScreen;

const LogoContainer = styled.div`
  width: 300px;
  height: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 40px;
  left: 40px;
  //border: 1px solid black;
`;

const rotate = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`;

const RotLogo = styled.img`
  width: 110px;
  margin-right: 10px;
  cursor: pointer;
  animation: ${rotate} 0.8s ease-out;
  //border: 1px solid black;
  @media (max-width: 1300px) {
    width: 97px;
    margin-right: 8px;
  }
  @media (max-width: 800px) {
    width: 97px;
  }
`;

const LogoTitle = styled.h1`
  font-family: "spotify-black";
  font-size: 55px;
  font-family: "spotify-black";
  letter-spacing: -4px;
  margin-top: 16px;
  cursor: pointer;
  //border: 1px solid black;
  @media (max-width: 1300px) {
    font-size: 45px;
  }
`;

const H1 = styled.div`
  font-family: Zen Tokyo Zoo;
  font-size: 100px;
  font-weight: 100;
  margin-bottom: 35px;
  //border: 1px solid black;
  @media (max-width: 900px) {
    font-size: 40px;
    margin-bottom: 0px;
    margin-top: 120px;
  }
`;

const H2 = styled.p`
  font-family: spotify-light;
  font-size: 16px;
  margin-top: -30px;
  margin-bottom: 30px;
  //color: #3c3a3a;
  color: black;
  text-align: center;
  //border: 1px solid black;
  @media (max-width: 900px) {
    font-size: 14px;
    margin-top: 20px;
  }
`;

const Cont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  //width: 22%;
  width: 300px;
  //border: 1px solid black;
  @media (max-width: 800px) {
    width: 300px;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #ffbcae;
  position: relative;
  @media (min-width: 1100px) {
    display: none;
  }
`;
