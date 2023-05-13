import React from "react";
import { FastAverageColor } from "fast-average-color";
import { Howl } from "howler";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";
import axios from "axios";

const ArtistCard = ({
  artist,
  dim,
  setDomColor,
  setImgPrev,
  setRotateLogo,
  setLight,
  setTitle,
  setOrder,
  order,
  setYear,
  setPopularity,
  setArtist,
  setGenre,
  lmap,
  setLmap,
  apmap,
  setShowModal,
}) => {
  const fac = new FastAverageColor();
  const sound = new Howl({
    src: [apmap[artist.id]],
    html5: true,
  });

  const handleHover = (image, title, popularity, order, genre) => {
    fac.getColorAsync(image, { algorithm: "dominant" }).then((color) => {
      setDomColor(color.hex);
      color.isLight ? setLight(true) : setLight(false);
    });

    setImgPrev(image);
    setTitle(title);
    setOrder(order + 1);
    setYear(null);
    setArtist(null);
    setGenre(genre?.toUpperCase() || "not classified yet".toUpperCase());
    setPopularity(popularity);
  };

  const toastifyOps = {
    position: "bottom-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide,
    closeButton: false,
  };

  const handleClick = () => {
    if (apmap[artist.id]) {
      sound.stop();
      sound.play();
    } else {
      toast.error("Preview not available", toastifyOps);
    }
  };

  const handleUnfollow = async (event) => {
    event.stopPropagation();
    const nwlmap = { ...lmap, [artist.id]: false };
    try {
      const responce = await axios.delete(
        `https://api.spotify.com/v1/me/following?type=artist&&ids=${artist.id}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            "content-type": "application/json",
          },
        }
      );
      console.log(responce.status);
      setLmap(nwlmap);
      toast.success(`Unfollowed ${artist.name}`, toastifyOps);
    } catch (err) {
      setShowModal(true);
    }
  };

  const handleFollow = async (event) => {
    event.stopPropagation();
    const nwlmap = { ...lmap, [artist.id]: true };
    try {
      const { data } = await axios({
        method: "put",
        url: `https://api.spotify.com/v1/me/following?type=artist&&ids=${artist.id}`,
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          "content-type": "application/json",
        },
      });
      console.log(data);
      setLmap(nwlmap);
      toast.success(`Followed ${artist.name}`, toastifyOps);
    } catch (err) {
      setShowModal(true);
    }
  };

  return (
    <Card
      onMouseEnter={() => {
        setRotateLogo(true);
      }}
      onMouseLeave={() => {
        setRotateLogo(false);
      }}
    >
      <div
        style={{
          width: `${Math.floor(dim / 4)}px`,
          height: `${Math.floor(dim / 4)}px`,
        }}
        onMouseEnter={() => {
          handleHover(
            artist.images[0].url,
            artist.name,
            artist.popularity,
            order,
            artist.genres[0]
          );
        }}
        onMouseLeave={() => {
          sound.stop();
        }}
        onClick={handleClick}
      >
        <Img src={artist.images[0].url}></Img>
      </div>
      {lmap[artist.id] ? (
        <LikeImg
          title="Unfollow"
          onClick={(e) => {
            handleUnfollow(e);
          }}
          src="./assets/Liked.png"
          alt="likeIcon"
        ></LikeImg>
      ) : (
        <LikeImg
          title="Follow"
          onClick={(e) => {
            handleFollow(e);
          }}
          src="./assets/Like.svg"
        ></LikeImg>
      )}
    </Card>
  );
};

export default ArtistCard;

const Card = styled.div`
  transition: all 0.2s ease-out;
  cursor: pointer;
  position: relative;
  &:hover {
    transform: translateY(-12px) translateX(-12px) scale(1.08);
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const LikeImg = styled.img`
  width: 30px;
  top: 13px;
  left: 10px;
  position: absolute;
  transition: all 0.2s ease-in-out 0s;
  &:hover {
    transform: scale(1.3);
  }
`;
