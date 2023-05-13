import React from "react";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ArtistPrevCard from "./ArtistPrevCard";
import TaPrevMenue from "./TaPrevMenue";
const TaPrevBody = ({
  setDomColor,
  setImgPrev,
  setRotateLogo,
  setLight,
  setTitle,
  setOrder,
  setYear,
  setGenre,
  setPopularity,
  setArtist,
  topArtists,
  setTopArtists,
  almap,
  setShowModal,
  setAlmap,
  user,
  tasortOpt,
  setTaSortOpt,
  meta,
}) => {
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

  return (
    <Container ref={contRef}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          //border: "1px solid green",
        }}
      >
        {topArtists.map((artist, index) => (
          <ArtistPrevCard
            artist={artist}
            dim={dim}
            setDomColor={setDomColor}
            setImgPrev={setImgPrev}
            setRotateLogo={setRotateLogo}
            setLight={setLight}
            setTitle={setTitle}
            setOrder={setOrder}
            order={index}
            setYear={setYear}
            setPopularity={setPopularity}
            setArtist={setArtist}
            setGenre={setGenre}
            lmap={almap}
            setLmap={setAlmap}
            setShowModal={setShowModal}
          ></ArtistPrevCard>
        ))}
      </div>
      <ToastContainer />
      <TaPrevMenue
        topArtists={topArtists}
        setTopArtists={setTopArtists}
        tasortOpt={tasortOpt}
        setTaSortOpt={setTaSortOpt}
        setDomColor={setDomColor}
        setImgPrev={setImgPrev}
        setLight={setLight}
        setTitle={setTitle}
        setOrder={setOrder}
        setYear={setYear}
        setGenre={setGenre}
        setPopularity={setPopularity}
        setArtist={setArtist}
      ></TaPrevMenue>
    </Container>
  );
};

export default TaPrevBody;

const Container = styled.div`
  width: 75%;
  //flex: 1;
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
