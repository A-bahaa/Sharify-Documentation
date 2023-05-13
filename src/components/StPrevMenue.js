import React, { useEffect } from "react";
import { useState } from "react";
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

const StPrevMenue = ({
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
  meta,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorNestEl, setAnchorNestEl] = useState(null);
  const [playlistId, setPlaylistId] = useState(null);
  const [fouthLight, setFourtLight] = useState(false);
  const open = Boolean(anchorEl);
  const openNest = Boolean(anchorNestEl);
  const fac = new FastAverageColor();

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("Preview link copied to clipboard", toastifyOps);
  };

  /* Playlist Creation*/
  const handleSave = async () => {
    try {
      const { data } = await axios({
        method: "post",
        url: `https://api.spotify.com/v1/users/${user.id}/playlists`,
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          "content-type": "application/json",
        },
        data: {
          name: `${meta.date_month} - ${meta.date_day} ${meta.user_name}'s Liked Tracks`,
          description: `${meta.user_name}'s all time Liked tracks as recorded at ${meta.date_month} - ${meta.date_day} by Sharify Web app (Sorted by ${stsortOpt})`,
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
            tracksIds += savedTracks[j].id;
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
        .getColorAsync(savedTracks[3].img, {
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
    setImgPrev(savedTracks[0].img);
    setTitle(savedTracks[0].title);
    setOrder(1);
    setGenre(savedTracks[0].genre);
    setPopularity(savedTracks[0].popularity);
    setArtist(savedTracks[0].artist);
    setYear(savedTracks[0].year);
    fac
      .getColorAsync(savedTracks[0].img, {
        algorithm: "dominant",
      })
      .then((color) => {
        setDomColor(color.hex);
        color.isLight ? setLight(true) : setLight(false);
      });
  };

  /* Soring  */
  const sortPopA = () => {
    setStSortOpt("Popularity Asc");
    const temp = savedTracks;
    temp.sort((a, b) => {
      return a.popularity - b.popularity;
    });
    setSavedTracks(temp);
    resetPrev();
  };
  const sortPopD = () => {
    setStSortOpt("Popularity Desc");
    const temp = savedTracks;
    temp.sort((a, b) => {
      return b.popularity - a.popularity;
    });
    setSavedTracks(temp);
    resetPrev();
  };

  const sortDa = () => {
    setStSortOpt("Date added");
    setSavedTracks(JSON.parse(localStorage.getItem("prevSavedTracks")));
  };
  const sortDateA = () => {
    setStSortOpt("Release Date Asc");
    const temp = savedTracks;
    temp.sort((a, b) => {
      return a.year - b.year;
    });
    setSavedTracks(temp);
    resetPrev();
  };

  const sortDateD = () => {
    setStSortOpt("Release Date Desc");
    const temp = savedTracks;
    temp.sort((a, b) => {
      return a.year - b.year;
    });
    setSavedTracks(temp.reverse());
    resetPrev();
  };

  /*Styling objects*/
  const MenuItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    fontFamily: "spotify-light",
    fontSize: "25px",
  };

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
              {window.localStorage.getItem("token") ? (
                <MenuItem
                  onClick={() => {
                    handleCloseMenu();
                    handleSave();
                  }}
                  style={MenuItemStyle}
                >
                  Save to playlist <TfiList />
                </MenuItem>
              ) : null}
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
                  Date added(default)
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
                  {stsortOpt === "Release Date Asc" ? <TfiCheck /> : null}
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
                  {stsortOpt === "Release Date Desc" ? <TfiCheck /> : null}
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

export default StPrevMenue;

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
