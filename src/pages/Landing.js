import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import LandingBody from "../components/LandingBody";
import { FcLike } from "react-icons/fc";

const Landing = ({ Auth }) => {
  const [domColor, setDomColor] = useState("white");
  const [light, setLight] = useState(true);
  const FooterCnt = styled.h6`
    font-size: 14px;
    font-family: spotify-light;
    font-weight: 100;
    color: "black";
    @media (max-width: 1300px) {
      font-size: 10px;
    }
  `;
  document.getElementById("myHtml").style.backgroundColor = domColor;

  return (
    <Wrap style={{ backgroundColor: `${domColor}` }}>
      <Head>
        <LogoCnt>
          <Logo>
            <RotLogo src="./assets/logo.png" alt="logo"></RotLogo>
          </Logo>
          <LogoTitle>
            <H1 style={{ color: light ? "black" : "white" }}>Sharify</H1>
          </LogoTitle>
        </LogoCnt>
        <NavCnt>
          <NavItem
            title="About"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/A-bahaa/Sharify-Documentation"
            style={{ color: light ? "black" : "white" }}
          >
            About
          </NavItem>
        </NavCnt>
      </Head>
      <LandingBody
        setDomColor={setDomColor}
        setLight={setLight}
        light={light}
        Auth={Auth}
      ></LandingBody>
      <Footer
        style={
          {
            //border: "1px solid black",
          }
        }
      >
        <FooterCnt style={{ color: light ? "black" : "white" }}>
          Directed with <FcLike /> by{" "}
          <a
            title="Ghonim's"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/A-bahaa"
            style={{
              fontFamily: "aauto-signature",
              textDecoration: "none",
              fontSize: "25px",
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
    </Wrap>
  );
};

export default Landing;

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  //border: 1px solid black;
`;

const Head = styled.div`
  width: 100%;
  height: 25%;
  //border: 1px solid red;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1000px) {
    justify-content: center;
  }
`;

const LogoCnt = styled.div`
  height: 100%;
  width: 50%;
  //border: 1px solid red;
  display: flex;
  margin-left: 13%;
  @media (max-width: 1000px) {
    justify-content: center;
    margin-left: -15px;
  }
`;
const Logo = styled.div`
  width: 180px;
  height: 100%;
  //border: 1px solid green;
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
  width: 180px;
  margin-right: 10px;
  //border: 1px solid green;
  animation: ${rotate} 3s linear infinite;
  @media (max-width: 1000px) {
    width: 100px;
    margin-right: 8px;
  }
`;

const LogoTitle = styled.div`
  width: 50%;
  height: 100%;
  //border: 1px solid blue;
  display: flex;
  align-items: center;
`;

const H1 = styled.h1`
  //border: 1px solid blue;
  font-family: "spotify-black";
  letter-spacing: -4px;
  font-size: 65px;
  @media (max-width: 1000px) {
    font-size: 40px;
  }
`;

const NavCnt = styled.div`
  height: 100%;
  width: 10%;
  //border: 1px solid red;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 13%;
  @media (max-width: 1000px) {
    display: none;
  }
`;

const NavItem = styled.a`
  font-family: "spotify-light";
  text-decoration: none;
  color: black;
  font-size: 40px;
  //border: 1px solid black;
`;

const Footer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;
  @media (max-width: 1000px) {
    display: none;
  }
`;

/*


      <h1 style={{ fontFamily: "spotify-black", fontSize: "100px" }}>SOON</h1>
 <Btn>
        <a
          href={`${Auth.AUTH_ENDPOINT}?client_id=${Auth.CLIENT_ID}&redirect_uri=${Auth.REDIRECT_URI}&scope=${Auth.SCOPE}&response_type=${Auth.RESPONSE_TYPE}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          Refresh token
        </a>
      </Btn>
*/
