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

const TtPrevMenue = ({
  setShowModal,
  user,
  topTracks,
  setTopTracks,
  ttsortOpt,
  setTtSortOpt,
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
          name: `${meta.date_month} - ${meta.date_day} ${meta.user_name}'s Top Tracks`,
          description: `${meta.user_name}'s top monthly tracks as recorded at ${meta.date_month} - ${meta.date_day} by Sharify Web app (Sorted by ${ttsortOpt})`,
          public: false,
        },
      });
      setPlaylistId(data.id);
    } catch (err) {
      setShowModal(true);
    }
  };

  useEffect(() => {
    let ids = "";
    for (let i = 0; i < topTracks.length; i++) {
      ids += "spotify:track:";
      ids += topTracks[i].id;
      if (i < topTracks.length - 1) ids += ",";
    }
    const idsArr = ids.split(",");
    const saveTracks = async () => {
      try {
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
        toast.success("Playlist saved to Spotify library", toastifyOps);
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
        .getColorAsync(topTracks[3].img, {
          algorithm: "dominant",
        })
        .then((color) => {
          color.isLight ? setFourtLight(true) : setFourtLight(false);
        });
    };
    if (topTracks[3]) resetMenueColor();
    // eslint-disable-next-line
  }, [ttsortOpt]);

  /* Reset preview */
  const resetPrev = () => {
    setImgPrev(topTracks[0].img);
    setTitle(topTracks[0].title);
    setOrder(1);
    setGenre(topTracks[0].genre);
    setPopularity(topTracks[0].popularity);
    setArtist(topTracks[0].artist);
    setYear(topTracks[0].year);
    fac
      .getColorAsync(topTracks[0].img, {
        algorithm: "dominant",
      })
      .then((color) => {
        setDomColor(color.hex);
        color.isLight ? setLight(true) : setLight(false);
      });
  };

  /* Soring  */
  const sortPopA = () => {
    setTtSortOpt("Popularity Asc");
    const temp = topTracks;
    temp.sort((a, b) => {
      return a.popularity - b.popularity;
    });
    setTopTracks(temp);
    resetPrev();
  };
  const sortPopD = () => {
    setTtSortOpt("Popularity Desc");
    const temp = topTracks;
    temp.sort((a, b) => {
      return b.popularity - a.popularity;
    });
    setTopTracks(temp);
    resetPrev();
  };
  const sortAff = () => {
    setTtSortOpt("Affinity");
    setTopTracks(JSON.parse(localStorage.getItem("prevTopTracks")));
  };
  const sortDateA = () => {
    setTtSortOpt("Release Date Asc");
    const temp = topTracks;
    temp.sort((a, b) => {
      return a.year - b.year;
    });
    setTopTracks(temp);
    resetPrev();
  };

  const sortDateD = () => {
    setTtSortOpt("Release Date Desc");
    const temp = topTracks;
    temp.sort((a, b) => {
      return a.year - b.year;
    });
    setTopTracks(temp.reverse());
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
      {topTracks.length > 1 ? (
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
                    sortAff();
                    handleCloseNest();
                    handleCloseMenu();
                  }}
                  style={MenuItemStyle}
                >
                  Affinity (default)
                  {ttsortOpt === "Affinity" ? <TfiCheck /> : null}
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
                  {ttsortOpt === "Release Date Asc" ? <TfiCheck /> : null}
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
                  {ttsortOpt === "Release Date Desc" ? <TfiCheck /> : null}
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
                  {ttsortOpt === "Popularity Asc" ? <TfiCheck /> : null}
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
                  {ttsortOpt === "Popularity Desc" ? <TfiCheck /> : null}
                </MenuItem>
              </Menu>
            </Menu>
          </IconCnt>
        </IconList>
      ) : null}
    </>
  );
};

export default TtPrevMenue;

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
