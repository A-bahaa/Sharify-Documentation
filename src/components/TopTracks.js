import React from "react";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import TrackCard from "./TrackCard";
import { ToastContainer } from "react-toastify";
import { FastAverageColor } from "fast-average-color";
import TopTracksMenue from "./TopTracksMenue";
const TopTracks = ({
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
  topTracks,
  setTopTracks,
  tgmap,
  tlmap,
  setShowModal,
  setTlmap,
  user,
  ttsortOpt,
  setTtSortOpt,
  otherLmap,
  setOtherLmap,
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
    setImgPrev(topTracks[0]?.album.images[0].url);
    setTitle(topTracks[0]?.name);
    setOrder(1);
    setGenre(
      tgmap[topTracks[0]?.artists[0].id]?.toUpperCase() ||
        "not classified yet".toUpperCase()
    );
    setPopularity(topTracks[0]?.popularity);
    setArtist(topTracks[0]?.artists[0].name);
    setYear(topTracks[0]?.album.release_date.substring(0, 4));
    fac
      .getColorAsync(topTracks[0]?.album.images[0].url, {
        algorithm: "dominant",
      })
      .then((color) => {
        setDomColor(color.hex);
        color.isLight ? setLight(true) : setLight(false);
      });
    // eslint-disable-next-line
  }, [topTracks, tgmap]);

  return (
    <Container ref={contRef}>
      {topTracks.length === 1 ? (
        <h1
          style={{
            color: "white",
            fontSize: "22px",
            fontFamily: "sotify-black",
            marginBottom: "70px",
          }}
        >
          Hmmm...it looks like you didn't use Spotify that much lately, here is
          a song to get your tunes back!
        </h1>
      ) : null}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          //border: "1px solid green",
        }}
      >
        {topTracks.map((track, index) => (
          <TrackCard
            track={track}
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
            gmap={tgmap}
            lmap={tlmap}
            setLmap={setTlmap}
            setShowModal={setShowModal}
            otherLmap={otherLmap}
            setOtherLmap={setOtherLmap}
          ></TrackCard>
        ))}
      </div>
      <ToastContainer />
      <TopTracksMenue
        setShowModal={setShowModal}
        user={user}
        topTracks={topTracks}
        setTopTracks={setTopTracks}
        ttsortOpt={ttsortOpt}
        setTtSortOpt={setTtSortOpt}
        setDomColor={setDomColor}
        setImgPrev={setImgPrev}
        setLight={setLight}
        setTitle={setTitle}
        setOrder={setOrder}
        setYear={setYear}
        setGenre={setGenre}
        setPopularity={setPopularity}
        setArtist={setArtist}
        tgmap={tgmap}
      />
    </Container>
  );
};

export default TopTracks;

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
