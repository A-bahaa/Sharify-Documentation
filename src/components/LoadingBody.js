import React from "react";
import styled, { keyframes } from "styled-components";
import { useState, useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";

const LandingBody = () => {
  const contRef = useRef();
  const [dim, setDim] = useState(1373);
  const getContSize = () => {
    const newWidth = contRef.current.clientWidth;
    setDim(newWidth);
  };
  useEffect(() => {
    getContSize();
  }, []);
  useEffect(() => {
    window.addEventListener("resize", getContSize);
  }, []);
  const placeHolderItems = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
  ];
  const placeHolderShimmer = keyframes`
  0%{
      background-position: -468px 0
  }
  100%{
      background-position: 468px 0
  }
  `;

  const LoadingCard = styled.div`
    border-bottom-style: solid;
    border-bottom-color: black;
    border-bottom-width: 1px;
    border-right-style: solid;
    border-right-color: black;
    border-right-width: 1px;
    animation: ${placeHolderShimmer} 1.25s linear infinite;
    background: darkgray;
    background: linear-gradient(
      to right,
      #eeeeee 10%,
      #dddddd 18%,
      #eeeeee 33%
    );
    background-size: 800px 104px;
    position: relative;
  `;
  return (
    <Container ref={contRef}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {placeHolderItems.map((item) => (
          <LoadingCard
            style={{
              width: `${Math.floor(dim / 4)}px`,
              height: `${Math.floor(dim / 4)}px`,
            }}
          />
        ))}
      </div>
    </Container>
  );
};

export default LandingBody;

const Container = styled.div`
  width: 75%;
  border: 1px solid black;
  position: relative;
  border-right-width: 3px;
  border-right-style: solid;
  border-right-color: black;
  border-bottom-width: 0px;
  border-top-width: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
