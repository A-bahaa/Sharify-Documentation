import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { toastifyOps } from "../helperVars";
import axios from "axios";
import {
  TfiAlignJustify,
  TfiAngleDown,
  TfiArrowTopRight,
  TfiList,
  TfiCheck,
} from "react-icons/tfi";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FastAverageColor } from "fast-average-color";

const SavedTracksMenue = ({
  setShowModal,
  user,
  savedTracks,
  setSavedTracks,
  stsortOpt,
  setStSortOpt,
  setDomColor,
  setImgPrev,
  setLight,
  setTitle,
  setOrder,
  setYear,
  setGenre,
  setPopularity,
  setArtist,
  sgmap,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorNestEl, setAnchorNestEl] = useState(null);
  const [playlistId, setPlaylistId] = useState(null);
  const [fouthLight, setFourtLight] = useState(false);
  const open = Boolean(anchorEl);
  const openNest = Boolean(anchorNestEl);
  const fac = new FastAverageColor();

  /*Styling objects*/
  const MenuItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    fontFamily: "spotify-light",
    fontSize: "25px",
  };

  const handleShare = () => {
    const defaultSavedTracks = JSON.parse(localStorage.getItem("savedTracks"));
    const DateArr = new Date().toString().split(" ");
    const songsArr = [];
    const meta = {};
    for (let i = 0; i < defaultSavedTracks.length; i++) {
      const obj = {};
      obj["title"] = defaultSavedTracks[i].track.name;
      obj["artist"] = defaultSavedTracks[i].track.artists[0].name;
      obj["year"] = defaultSavedTracks[i].track.album.release_date.substring(
        0,
        4
      );
      obj["popularity"] = defaultSavedTracks[i].track.popularity;
      obj["genre"] =
        sgmap[defaultSavedTracks[i].track.artists[0].id]?.toUpperCase() ||
        "not classified yet".toUpperCase();
      obj["img"] = defaultSavedTracks[i].track.album.images[0].url;
      obj["preview_url"] = defaultSavedTracks[i].track.preview_url;
      obj["id"] = defaultSavedTracks[i].track.id;
      songsArr.push(obj);
    }
    meta["user_name"] = user.display_name;
    meta["date_month"] = DateArr[1];
    meta["date_day"] = DateArr[2];
    const PostDb = async () => {
      try {
        const res = await axios({
          method: "post",
          url: process.env.REACT_APP_DB_POST,
          headers: {},
          data: {
            cards: songsArr,
            meta: meta,
          },
        });
        //console.log(res);
        await navigator.clipboard.writeText(
          `https://sharify-gh.netlify.app/LikedTracks?id=${res.data.insertedId}`
        );
        toast.success("Preview link copied to clipboard", toastifyOps);
      } catch (err) {
        console.log(err);
        toast.error("Error connecting to database", toastifyOps);
      }
    };
    PostDb();
  };

  /* Menue Actions*/
  const handleClickMenue = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickNest = (event) => {
    setAnchorNestEl(event.currentTarget);
  };
  const handleCloseNest = () => {
    setAnchorNestEl(null);
  };

  useEffect(() => {
    const resetMenueColor = () => {
      fac
        .getColorAsync(savedTracks[3].track.album.images[0].url, {
          algorithm: "dominant",
        })
        .then((color) => {
          color.isLight ? setFourtLight(true) : setFourtLight(false);
        });
    };
    if (savedTracks[3]) resetMenueColor();
    // eslint-disable-next-line
  }, [stsortOpt]);

  /* Reset preview */
  const resetPrev = () => {
    setImgPrev(savedTracks[0].track.album.images[0].url);
    setTitle(savedTracks[0].track.name);
    setOrder(1);
    setGenre(
      sgmap[savedTracks[0].track.artists[0].id]?.toUpperCase() ||
        "not classified yet".toUpperCase()
    );
    setPopularity(savedTracks[0].track.popularity);
    setArtist(savedTracks[0].track.artists[0].name);
    setYear(savedTracks[0].track.album.release_date.substring(0, 4));
    fac
      .getColorAsync(savedTracks[0].track.album.images[0].url, {
        algorithm: "dominant",
      })
      .then((color) => {
        setDomColor(color.hex);
        color.isLight ? setLight(true) : setLight(false);
      });
  };

  /*  Soring  */
  const sortPopA = () => {
    setStSortOpt("Popularity Asc");
    const temp = savedTracks;
    temp.sort((a, b) => {
      return a.track.popularity - b.track.popularity;
    });
    setSavedTracks(temp);
    resetPrev();
  };
  const sortPopD = () => {
    setStSortOpt("Popularity Desc");
    const temp = savedTracks;
    temp.sort((a, b) => {
      return b.track.popularity - a.track.popularity;
    });
    setSavedTracks(temp);
    resetPrev();
  };

  const sortDateA = () => {
    setStSortOpt("Release date Asc");
    const temp = savedTracks;
    temp.sort((a, b) => {
      return (
        a.track.album.release_date.substring(0, 4) -
        b.track.album.release_date.substring(0, 4)
      );
    });
    setSavedTracks(temp);
    resetPrev();
  };

  const sortDateD = () => {
    setStSortOpt("Release date Desc");
    const temp = savedTracks;
    temp.sort((a, b) => {
      return (
        a.track.album.release_date.substring(0, 4) -
        b.track.album.release_date.substring(0, 4)
      );
    });
    setSavedTracks(temp.reverse());
    resetPrev();
  };
  const sortDa = () => {
    setStSortOpt("Date added");
    setSavedTracks(JSON.parse(localStorage.getItem("savedTracks")));
  };

  /* Playlist Creation*/
  const handleSave = async () => {
    const DateArr = new Date().toString().split(" ");
    try {
      const { data } = await axios({
        method: "post",
        url: `https://api.spotify.com/v1/users/${user.id}/playlists`,
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          "content-type": "application/json",
        },
        data: {
          name: `${DateArr[1]} - ${DateArr[2]} ${user.display_name}'s Liked Tracks`,
          description: `${user.display_name}'s all time Liked tracks as recorded at ${DateArr[1]} - ${DateArr[2]} by Sharify Web app (Sorted by ${stsortOpt})`,
          public: false,
        },
      });
      setPlaylistId(data.id);
      toast.success("Playlist saved to Spotify library", toastifyOps);
    } catch (err) {
      setShowModal(true);
    }
  };

  useEffect(() => {
    const saveTracks = async () => {
      try {
        for (let i = 0; i < savedTracks.length; i += 100) {
          let tracksIds = "";
          for (let j = i; j < savedTracks.length && j < i + 100; j++) {
            tracksIds += "spotify:track:";
            tracksIds += savedTracks[j].track.id;
            tracksIds += ",";
          }
          tracksIds = tracksIds.substring(0, tracksIds.length - 1);
          const idsArr = tracksIds.split(",");
          await axios({
            method: "post",
            url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
              "content-type": "application/json",
            },
            data: {
              uris: idsArr,
            },
          });
        }
      } catch (err) {}
    };
    saveTracks();
    // eslint-disable-next-line
  }, [playlistId]);

  return (
    <>
      {savedTracks.length > 1 ? (
        <IconList>
          <IconCnt>
            <TfiAlignJustify
              style={{
                width: "100%",
                height: "auto",
                color: fouthLight ? "black" : "white",
              }}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClickMenue}
            />

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              PaperProps={{ sx: { width: "350px" } }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                  handleShare();
                }}
                style={MenuItemStyle}
              >
                Share <TfiArrowTopRight />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                  handleSave();
                }}
                style={MenuItemStyle}
              >
                Save to playlist <TfiList />
              </MenuItem>
              <MenuItem onClick={handleClickNest} style={MenuItemStyle}>
                Sort <TfiAngleDown />
              </MenuItem>
              <Menu
                id="basic-menu"
                anchorEl={anchorNestEl}
                open={openNest}
                onClose={handleCloseNest}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                PaperProps={{ sx: { width: "350px" } }}
              >
                <MenuItem
                  onClick={() => {
                    sortDa();
                    handleCloseNest();
                    handleCloseMenu();
                  }}
                  style={MenuItemStyle}
                >
                  Date added (default)
                  {stsortOpt === "Date added" ? <TfiCheck /> : null}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    sortDateA();
                    handleCloseNest();
                    handleCloseMenu();
                  }}
                  style={MenuItemStyle}
                >
                  Release date Asc
                  {stsortOpt === "Release date Asc" ? <TfiCheck /> : null}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    sortDateD();
                    handleCloseNest();
                    handleCloseMenu();
                  }}
                  style={MenuItemStyle}
                >
                  Release date Desc
                  {stsortOpt === "Release date Desc" ? <TfiCheck /> : null}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    sortPopA();
                    handleCloseNest();
                    handleCloseMenu();
                  }}
                  style={MenuItemStyle}
                >
                  Popularity Asc
                  {stsortOpt === "Popularity Asc" ? <TfiCheck /> : null}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    sortPopD();
                    handleCloseNest();
                    handleCloseMenu();
                  }}
                  style={MenuItemStyle}
                >
                  Popularity Desc
                  {stsortOpt === "Popularity Desc" ? <TfiCheck /> : null}
                </MenuItem>
              </Menu>
            </Menu>
          </IconCnt>
        </IconList>
      ) : null}
    </>
  );
};

export default SavedTracksMenue;

const IconList = styled.div`
  width: 70px;
  height: auto;
  //border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: 30px;
  right: 30px;
  @media (max-width: 1300px) {
    width: 40px;
  }
`;

const IconCnt = styled.div`
  width: 100%;
  height: auto;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out 0s;
  &:hover {
    transform: translateY(-10px) translateX(-10px) scale(1.09);
    //box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
      rgba(0, 0, 0, 0.22) 0px 15px 12px;
  }
`;
