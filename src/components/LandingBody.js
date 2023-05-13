import React from "react";
import styled, { keyframes } from "styled-components";
import { FcLike } from "react-icons/fc";
import { CiWarning } from "react-icons/ci";
import LandingCard from "./LandingCard";
import { darkCards, lightCards } from "../helperVars";

const idx1 = Math.floor(Math.random() * lightCards.length);
const idx2 = Math.floor(Math.random() * darkCards.length);
const idx3 = Math.floor(Math.random() * darkCards.length);
const idx4 = Math.floor(Math.random() * lightCards.length);

const LandingBody = ({ setDomColor, setLight, light, Auth }) => {
  const FooterCnt = styled.h6`
    font-size: 12px;
    font-family: spotify-light;
    font-weight: 100;
    color: "black";
    @media (max-width: 1300px) {
      font-size: 10px;
    }
  `;

  return (
    <Wrap>
      <Kalam>
        <TitleCnt>
          <H1 style={{ color: light ? "black" : "white" }}>Sharify </H1>
          <Span style={{ color: light ? "black" : "white" }}>YOUR</Span>{" "}
          <H1 style={{ color: light ? "black" : "white" }}>Spotify</H1>
        </TitleCnt>
        <DescCnt>
          <H6 style={{ color: light ? "black" : "white" }}>
            Don't Wait until the end of the year to share your terrible music
            taste, use Sharify and get embarrassed all year long{" "}
            <span style={{ fontStyle: "italic" }}>!</span>
          </H6>
        </DescCnt>

        <Btn>
          <a
            href={`${Auth.AUTH_ENDPOINT}?client_id=${Auth.CLIENT_ID}&redirect_uri=${Auth.REDIRECT_URI}&scope=${Auth.SCOPE}&response_type=${Auth.RESPONSE_TYPE}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            {window.localStorage.getItem("token") ? (
              <>Refresh token</>
            ) : (
              <>Login with Spotify</>
            )}
          </a>
        </Btn>
        {window.localStorage.getItem("token") ? null : (
          <H3
            style={{
              color: light ? "black" : "white",
              fontFamily: "spotify-light",
              marginTop: "20px",
              marginLeft: "26%",
              fontWeight: "100",
            }}
          >
            {" "}
            <CiWarning /> Make sure your spotify acc is added to Sharify's
            allowlist
          </H3>
        )}
      </Kalam>
      <Visual>
        <Cnt
          onMouseLeave={() => {
            setDomColor("white");
            setLight(true);
          }}
        >
          <LandingCard
            Imgsrc={lightCards[idx1].Imgsrc}
            PrevLink={lightCards[idx1].PrevLink}
            setDomColor={setDomColor}
            setLight={setLight}
          ></LandingCard>
          <LandingCard
            Imgsrc={darkCards[idx2].Imgsrc}
            PrevLink={darkCards[idx2].PrevLink}
            setDomColor={setDomColor}
            setLight={setLight}
          ></LandingCard>
          <LandingCard
            Imgsrc={darkCards[idx3].Imgsrc}
            PrevLink={darkCards[idx3].PrevLink}
            setDomColor={setDomColor}
            setLight={setLight}
          ></LandingCard>
          <LandingCard
            Imgsrc={lightCards[idx4].Imgsrc}
            PrevLink={lightCards[idx4].PrevLink}
            setDomColor={setDomColor}
            setLight={setLight}
          ></LandingCard>
        </Cnt>
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
      </Visual>
    </Wrap>
  );
};

export default LandingBody;

const Wrap = styled.div`
  width: 100%;
  height: 70%;
  //border: 1px solid green;
  display: flex;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const Kalam = styled.div`
  width: 50%;
  height: 100%;
  //border: 1px solid black;
  padding-top: 50px;
  @media (max-width: 1000px) {
    width: 100%;
    padding-top: 0px;
  }
`;

const TitleCnt = styled.div`
  width: auto;
  margin-left: 26%;
  height: auto;
  //border: 1px solid green;
  display: flex;
  flex-direction: column;
  @media (max-width: 1000px) {
    margin-left: auto;
  }
`;
const H1 = styled.h1`
  font-family: spotify-book;
  font-size: 110px;
  //border: 1px solid red;
  @media (max-width: 1000px) {
    font-size: 80px;
    text-align: center;
  }
`;

const Span = styled.span`
  font-family: houstelly;
  font-size: 50px;
  //border: 1px solid black;
  margin-left: 1.4em;
  @media (max-width: 1000px) {
    font-size: 30px;
    text-align: center;
    margin-left: 0px;
  }
`;

const DescCnt = styled.div`
  width: 50%;
  margin-left: 26%;
  height: auto;
  margin-top: 20px;
  //border: 1px solid green;
  @media (max-width: 1000px) {
    width: 80%;
    margin: auto;
    margin-top: 20px;
  }
`;
const H6 = styled.p`
  font-family: spotify-light;
  font-size: 25px;
  letter-spacing: -1px;
  //font-weight: bold;
  @media (max-width: 1000px) {
    font-size: 20px;
  }
`;

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
  margin-top: 20px;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border: none;
  margin-left: 26%;

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

    animation: ${shine} 2s infinite ease-out; /* Animation */
  }
  @media (max-width: 1000px) {
    display: none;
  }
`;

const Visual = styled.div`
  width: 50%;
  height: 100%;
  padding-top: 50px;
  //border: 1px solid red;
  @media (max-width: 1000px) {
    width: 100%;
    padding-top: 20px;
  }
`;

const Cnt = styled.div`
  width: 54%;
  height: auto;
  //border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  margin-left: 20%;
  @media (max-width: 1000px) {
    width: 250px;
    margin: auto;
  }
`;

const Footer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 1000px) {
    display: none;
  }
`;
const H3 = styled.h3`
  @media (max-width: 1000px) {
    display: none;
  }
`;
