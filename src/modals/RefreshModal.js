import React from "react";
import ReactDom from "react-dom";
import { Howl } from "howler";
import Rating from "@mui/material/Rating";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

const MODAL_STYLES = {
  width: "900px",
  height: "556px",
  position: "fixed",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#ff9e0e",
  zIndex: 1000,
  display: "flex",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

const sound = new Howl({
  src: "https://p.scdn.co/mp3-preview/b2e21cfd47e2a0be2d618f121c5420b3114be82a?cid=774b29d4f13844c495f206cafdad9c86",
  html5: true,
});
export default function Modal({ Auth, onClose }) {
  const navigate = useNavigate();
  const returnHome = () => {
    navigate("/");
  };
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <div
          style={{
            width: "50%",
            heigth: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "350px",
              height: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img
              src="https://i.scdn.co/image/ab67616d0000b273a46fe09547e7c8fe49e67c1e"
              style={{ width: "350px", height: "350px", cursor: "pointer" }}
              alt="refresh track card"
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
                color: "black",
              }}
            >
              Refresh
            </h2>
            <h4
              style={{
                fontFamily: "spotify-light",
                marginTop: "10px",
                fontSize: "16px",
                color: "black",
              }}
            >
              Sutton - 2023
            </h4>
            <h4
              style={{
                fontFamily: "spotify-light",
                marginTop: "5px",
                fontSize: "14px",
                color: "black",
              }}
            >
              Popularity{" "}
              <Rating
                value={4}
                name="half-rating"
                style={{
                  color: "black",
                  fontSize: "14px",
                }}
                readOnly
              />
            </h4>
          </div>
        </div>

        <div
          style={{
            width: "50%",
            heigth: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <RotLogo
            src="./assets/logo.png"
            alt="logo"
            onClick={returnHome}
          ></RotLogo>
          <h1
            style={{
              color: "white",
              fontFamily: "spotify-black",
              fontSize: "40px",
              marginBottom: "30px",
              marginLeft: "-40px",
            }}
          >
            Refresh Spotify Token !
          </h1>
          <Btn onClick={onClose}>
            <a
              href={`${Auth.AUTH_ENDPOINT}?client_id=${Auth.CLIENT_ID}&redirect_uri=${Auth.REDIRECT_URI}&scope=${Auth.SCOPE}&response_type=${Auth.RESPONSE_TYPE}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              Refresh token
            </a>
          </Btn>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

const shine = keyframes`
0% {left: -100px}
20% {left: 100%}
100% {left: 100%}
`;

const Btn = styled.button`
  background-color: #191414;
  color: white;
  cursor: pointer;
  font-size: 30px;
  font-family: spotify-light;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border: none;
  margin-left: -40px;
  position: relative;
  overflow: hidden;
  &:before {
    content: "";
    position: absolute;
    width: 100px;
    height: 100%;
    background-image: linear-gradient(
      150deg,
      rgba(255, 255, 255, 0) 20%,
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0) 60%
    );
    top: 0;
    left: -100px;

    animation: ${shine} 3s infinite ease-out; /* Animation */
  }
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
  width: 150px;
  margin-right: 35px;
  margin-bottom: 30px;
  margin-top: 60px;
  cursor: pointer;
  animation: ${rotate} 0.8s ease-out;
`;
