import React from "react";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import TrackCard from "./TrackCard";
import { ToastContainer } from "react-toastify";
import { FastAverageColor } from "fast-average-color";
import SavedTracksMenue from "./SavedTracksMenue";

const SavedTracks = ({
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
  savedTracks,
  setSavedTracks,
  sgmap,
  setShowModal,
  user,
  slmap,
  setSlmap,
  otherLmap,
  setOtherLmap,
  stsortOpt,
  setStSortOpt,
  savedIsEmpty,
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
    setImgPrev(savedTracks[0]?.track.album.images[0].url);
    setTitle(savedTracks[0]?.track.name);
    setOrder(1);
    setGenre(
      sgmap[savedTracks[0]?.track.artists[0].id]?.toUpperCase() ||
        "not classified yet".toUpperCase()
    );
    setPopularity(savedTracks[0]?.track.popularity);
    setArtist(savedTracks[0]?.track.artists[0].name);
    setYear(savedTracks[0]?.track.album.release_date.substring(0, 4));
    fac
      .getColorAsync(savedTracks[0]?.track.album.images[0].url, {
        algorithm: "dominant",
      })
      .then((color) => {
        setDomColor(color.hex);
        color.isLight ? setLight(true) : setLight(false);
      });
    // eslint-disable-next-line
  }, [savedTracks, sgmap]);

  return (
    <Container ref={contRef}>
      {savedIsEmpty ? (
        <h1
          style={{
            color: "white",
            fontSize: "22px",
            fontFamily: "sotify-black",
            marginBottom: "70px",
          }}
        >
          Hmmm...it looks like you didn't save any traks to your library, here
          is a song to try!
        </h1>
      ) : null}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          //border: "1px solid green",
        }}
      >
        {savedTracks.map((track, index) => (
          <TrackCard
            track={track.track}
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
            gmap={sgmap}
            lmap={slmap}
            setLmap={setSlmap}
            setShowModal={setShowModal}
            otherLmap={otherLmap}
            setOtherLmap={setOtherLmap}
          ></TrackCard>
        ))}
      </div>
      <ToastContainer />
      <SavedTracksMenue
        setShowModal={setShowModal}
        user={user}
        savedTracks={savedTracks}
        setSavedTracks={setSavedTracks}
        stsortOpt={stsortOpt}
        setStSortOpt={setStSortOpt}
        setDomColor={setDomColor}
        setImgPrev={setImgPrev}
        setLight={setLight}
        setTitle={setTitle}
        setOrder={setOrder}
        setYear={setYear}
        setGenre={setGenre}
        setPopularity={setPopularity}
        setArtist={setArtist}
        sgmap={sgmap}
      />
    </Container>
  );
};

export default SavedTracks;

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
