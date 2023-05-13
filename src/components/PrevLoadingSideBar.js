import React from "react";
import styled, { keyframes } from "styled-components";
import Rating from "@mui/material/Rating";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { FcLike } from "react-icons/fc";

const PrevLoadingSideBar = () => {
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
        <Logo src="./assets/logo.png" alt="logo"></Logo>
        <LogoTitle style={{ color: "black" }}>Sharify</LogoTitle>
      </LogoContainer>
      <ListItem></ListItem>
      <div
        style={{
          width: "100%",
          flex: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "80%",
            height: "90%",
            display: "flex",
            flexDirection: "column",
            marginTop: "30px",

            justifyContent: "center",
          }}
        >
          <ImgPrev /> <TitlePrev />
          <SubTitlePrev />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h4
              style={{
                fontFamily: "spotify-light",
                marginTop: "5px",
                fontSize: "14px",
              }}
            >
              Popularity<span> </span>
              <Rating
                value={0}
                name="half-rating"
                precision={0.2}
                style={{
                  fontSize: "14px",
                }}
                readOnly
              />
            </h4>
            <GenrePrev />
          </div>
        </div>
      </div>
      <Footer>
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
              color: "black",
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

export default PrevLoadingSideBar;

const LogoContainer = styled.div`
  width: 100%;
  height: 200px;
  border-bottom-style: solid;
  border-bottom-color: black;
  border-bottom-width: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 130px;
  margin-right: 10px;
  cursor: pointer;
  //border: 1px solid black;
  @media (max-width: 1300px) {
    width: 115px;
    margin-right: 8px;
  }
`;

const LogoTitle = styled.h1`
  font-family: "spotify-black";
  font-size: 55px;
  font-family: "spotify-black";
  letter-spacing: -4px;
  margin-top: 16px;
  @media (max-width: 1300px) {
    font-size: 45px;
  }
`;

const Footer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const placeHolderShimmer = keyframes`
0%{
    background-position: -468px 0
}
100%{
    background-position: 468px 0
}
`;

const ImgPrev = styled.div`
  width: 85%;
  height: 310px;
  align-self: center;
  animation: ${placeHolderShimmer} 1.25s linear infinite;
  background: darkgray;
  background: linear-gradient(to right, #eeeeee 10%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 104px;
  position: relative;
`;

const TitlePrev = styled.div`
  margin-top: 20px;
  height: 23px;
  animation: ${placeHolderShimmer} 1.25s linear infinite;
  background: darkgray;
  background: linear-gradient(to right, #eeeeee 10%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 104px;
  position: relative;
`;

const SubTitlePrev = styled.h4`
  margin-top: 10px;
  width: 60%;
  height: 18px;
  animation: ${placeHolderShimmer} 1.25s linear infinite;
  background: darkgray;
  background: linear-gradient(to right, #eeeeee 10%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 104px;
  position: relative;
`;

const GenrePrev = styled.h4`
  margin-top: 5px;
  width: 20%;
  height: 18px;
  animation: ${placeHolderShimmer} 1.25s linear infinite;
  background: darkgray;
  background: linear-gradient(to right, #eeeeee 10%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 104px;
  position: relative;
`;

const ListItem = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-style: solid;
  border-bottom-color: black;
  border-bottom-width: 1px;
  animation: ${placeHolderShimmer} 1.25s linear infinite;
  background: darkgray;
  background: linear-gradient(to right, #eeeeee 10%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 104px;
  position: relative;
`;
const FooterCnt = styled.h6`
  font-size: 12px;
  font-family: spotify-light;
  font-weight: 100;
`;
