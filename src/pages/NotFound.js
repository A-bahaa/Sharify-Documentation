import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Howl } from "howler";

const sound = new Howl({
  src: "https://p.scdn.co/mp3-preview/2346c4d266f4e0233fc69d2491e3ed2cfe34ba66?cid=cfe923b2d660439caf2b557b21f31221",
  html5: true,
});

const NotFound = () => {
  const navigate = useNavigate();
  const returnHome = () => {
    navigate("/");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d700ff",
        position: "relative",
      }}
    >
      <LogoContainer>
        <RotLogo
          src="./assets/logo.png"
          alt="logo"
          onClick={returnHome}
        ></RotLogo>
        <LogoTitle onClick={returnHome}>Sharify</LogoTitle>
      </LogoContainer>
      <H1>404 Page Not Found</H1>
      <Cont>
        <img
          src="https://i.scdn.co/image/ab67616d0000b273f0835de9f055fde54e0d01d2"
          alt="404 pic"
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
          404
        </h2>
        <h4
          style={{
            fontFamily: "spotify-light",
            marginTop: "10px",
            fontSize: "16px",
          }}
        >
          One South Lark - 2018
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
              value={(41 * 5) / 100}
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
            new orleans indie
          </h4>
        </div>
      </Cont>
    </div>
  );
};

export default NotFound;

const LogoContainer = styled.div`
  width: 300px;
  height: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 40px;
  left: 40px;
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
  @media (max-width: 1300px) {
    font-size: 45px;
  }
`;

const H1 = styled.div`
  font-family: Zen Tokyo Zoo;
  font-size: 100px;
  font-weight: 100;
  margin-bottom: 40px;
  @media (max-width: 800px) {
    font-size: 45px;
    margin-bottom: 10px;
    margin-top: 50px;
  }
`;

const Cont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 22%;
  @media (max-width: 800px) {
    width: 300px;
  }
`;
