import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

import { TfiMicrophone, TfiMusicAlt, TfiBookmark } from "react-icons/tfi";

import { FcLike } from "react-icons/fc";

const SideBar = ({
  itemSelected,
  setItemSelected,
  imgPrev,
  rotateLogo,
  light,
  title,
  order,
  year,
  genre,
  artist,
  popularity,
}) => {
  const IconStyle = { width: "100%", height: "100%" };
  const ItemSelectedStyle = {
    color: light ? "white" : "black",
    backgroundColor: light ? "black" : "white",
  };

  const Items = [
    {
      icon: <TfiMusicAlt style={IconStyle} />,
      title: "Monthly Top Tracks",
    },
    {
      icon: <TfiMicrophone style={IconStyle} />,
      title: "Monthly Top Artists",
    },

    {
      icon: <TfiBookmark style={IconStyle} />,
      title: "All-Time Liked Tracks",
    },
  ];
  const navigate = useNavigate();
  const returnHome = () => {
    navigate("/");
  };

  const ListItem = styled.div`
    color: ${light ? "black" : "white"};
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-style: solid;
    border-bottom-color: black;
    border-bottom-width: 1px;
    cursor: pointer;
    &:hover {
      color: ${light ? "white" : "black"};
      background-color: ${light ? "black" : "white"};
    }
  `;
  const FooterCnt = styled.h6`
    font-size: 12px;
    font-family: spotify-light;
    font-weight: 100;
    color: ${light ? "black" : "white"};
    @media (max-width: 1300px) {
      font-size: 10px;
    }
  `;

  const boxVariant = {
    visible: { opacity: 1, transition: { duration: 0.5 } },
    hidden: { opacity: 0 },
  };

  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    }
  }, [control, inView]);

  return (
    <motion.div
      variants={boxVariant}
      initial="hidden"
      animate={control}
      ref={ref}
      style={{
        width: "25%",
        height: "100vh",
        position: "sticky",
        top: "0px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <LogoContainer>
        {rotateLogo === true ? (
          <RotLogo
            src="./assets/logo.png"
            alt="logo"
            onClick={returnHome}
          ></RotLogo>
        ) : (
          <Logo src="./assets/logo.png" alt="logo" onClick={returnHome}></Logo>
        )}

        <LogoTitle
          onClick={returnHome}
          style={{ color: light ? "black" : "white" }}
        >
          Sharify
        </LogoTitle>
      </LogoContainer>
      {Items.map((item) => (
        <ListItem
          key={item}
          onClick={() => {
            setItemSelected(item.title);
          }}
          style={itemSelected === item.title ? ItemSelectedStyle : null}
        >
          <IconCont>{item.icon}</IconCont>
          <ListTitle>{item.title}</ListTitle>
        </ListItem>
      ))}
      <div
        style={{
          width: "100%",
          flex: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          //border: "1px solid black",
        }}
      >
        <div
          style={{
            width: "80%",
            height: "90%",
            display: "flex",
            flexDirection: "column",
            //border: "1px solid black",
            marginTop: "30px",
          }}
        >
          <ImgPrv src={imgPrev} alt="preview"></ImgPrv>

          <h2
            style={{
              fontFamily: "spotify-medium",
              marginTop: "20px",
              fontSize: "18px",
              color: light ? "black" : "white",
            }}
          >
            #{order} - {title}
          </h2>
          <h4
            style={{
              fontFamily: "spotify-light",
              marginTop: "10px",
              fontSize: "16px",
              color: light ? "black" : "white",
            }}
          >
            {artist}{" "}
            {itemSelected === "Monthly Top Artists" ? null : <span>-</span>}{" "}
            {year}
          </h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              // border: "1px solid black",
            }}
          >
            <h4
              style={{
                fontFamily: "spotify-light",
                marginTop: "5px",
                fontSize: "14px",
                color: light ? "black" : "white",
                //border: "1px solid black",
              }}
            >
              Popularity <span> </span>
              <Rating
                value={(popularity * 5) / 100}
                name="half-rating"
                precision={0.2}
                style={{
                  color: light ? "black" : "white",
                  fontSize: "14px",
                }}
                readOnly
              />
            </h4>
            <h4
              style={{
                fontFamily: "spotify-light",
                marginTop: "5px",
                fontSize: "12px",
                color: light ? "black" : "white",
                //border: "1px solid black",
              }}
            >
              {genre}
            </h4>
          </div>
        </div>
      </div>
      <Footer
        style={
          {
            /*border: "1px solid black"*/
          }
        }
      >
        <FooterCnt>
          Directed with <FcLike /> by{" "}
          <a
            title="Ghonim's"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/A-bahaa"
            style={{
              fontFamily: "aauto-signature",
              textDecoration: "none",
              fontSize: "20px",
              fontWeight: "bold",
              color: light ? "black" : "white",
            }}
          >
            {" "}
            Ghonim's
          </a>{" "}
          in Cairo, Egypt
        </FooterCnt>
      </Footer>
    </motion.div>
  );
};

export default SideBar;

const LogoContainer = styled.div`
  width: 100%;
  height: 130px;
  border-bottom-style: solid;
  border-bottom-color: black;
  border-bottom-width: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.h2`
  font-family: spotify-book;
  margin-top: 5px;
  @media (max-width: 1300px) {
    font-size: 20px;
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

const Logo = styled.img`
  width: 110px;
  margin-right: 10px;
  cursor: pointer;
  //border: 1px solid black;
  @media (max-width: 1300px) {
    width: 97px;
    margin-right: 8px;
  }
`;

const RotLogo = styled.img`
  width: 110px;
  margin-right: 10px;
  cursor: pointer;
  //border: 1px solid black;
  animation: ${rotate} 3s linear infinite;
  @media (max-width: 1300px) {
    width: 97px;
    margin-right: 8px;
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

const IconCont = styled.div`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  @media (max-width: 1300px) {
    width: 23px;
    height: 23px;
    margin-right: 4px;
  }
`;

const Footer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgPrv = styled.img`
  width: 85%;
  max-height: 315px;
  align-self: center;
`;
