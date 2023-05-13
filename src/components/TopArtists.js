import React from "react";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { FastAverageColor } from "fast-average-color";
import ArtistCard from "./ArtistCard";
import TopArtistsMenue from "./TopArtistsMenue";
const TopArtists = ({
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
  apmap,
  setShowModal,
  setAlmap,
  user,
  tasortOpt,
  setTaSortOpt,
}) => {
  const contRef = useRef();
  const [dim, setDim] = useState(1373);
  const fac = new FastAverageColor();

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

  useEffect(() => {
    setImgPrev(topArtists[0]?.images[0].url);
    setTitle(topArtists[0]?.name);
    setOrder(1);
    setGenre(
      topArtists[0].genres[0]?.toUpperCase() ||
        "not classified yet".toUpperCase()
    );
    setPopularity(topArtists[0]?.popularity);
    setArtist(null);
    setYear(null);
    fac
      .getColorAsync(topArtists[0]?.images[0].url, {
        algorithm: "dominant",
      })
      .then((color) => {
        setDomColor(color.hex);
        color.isLight ? setLight(true) : setLight(false);
      });
    // eslint-disable-next-line
  }, [topArtists]);

  return (
    <Container ref={contRef}>
      {topArtists.length === 1 ? (
        <h1
          style={{
            color: "white",
            fontSize: "22px",
            fontFamily: "sotify-black",
            marginBottom: "70px",
          }}
        >
          Hmm...it looks like you didn't obsess with any artist lately, here's a
          star to follow!
        </h1>
      ) : null}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          //border: "1px solid green",
        }}
      >
        {topArtists.map((artist, index) => (
          <ArtistCard
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
            apmap={apmap}
            setShowModal={setShowModal}
          ></ArtistCard>
        ))}
      </div>
      <ToastContainer />
      <TopArtistsMenue
        setShowModal={setShowModal}
        user={user}
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
        apmap={apmap}
      />
    </Container>
  );
};

export default TopArtists;

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
