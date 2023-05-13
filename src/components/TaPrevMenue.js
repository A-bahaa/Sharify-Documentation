import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { toastifyOps } from "../helperVars";
import {
  TfiAlignJustify,
  TfiAngleDown,
  TfiArrowTopRight,
  TfiCheck,
} from "react-icons/tfi";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FastAverageColor } from "fast-average-color";

const TaPrevMenue = ({
  topArtists,
  setTopArtists,
  tasortOpt,
  setTaSortOpt,
  setDomColor,
  setImgPrev,
  setLight,
  setTitle,
  setOrder,
  setYear,
  setGenre,
  setPopularity,
  setArtist,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorNestEl, setAnchorNestEl] = useState(null);
  const [fouthLight, setFourtLight] = useState(false);
  const open = Boolean(anchorEl);
  const openNest = Boolean(anchorNestEl);
  const fac = new FastAverageColor();

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("Preview link copied to clipboard", toastifyOps);
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
        .getColorAsync(topArtists[3].img[0].url, {
          algorithm: "dominant",
        })
        .then((color) => {
          color.isLight ? setFourtLight(true) : setFourtLight(false);
        });
    };
    if (topArtists[3]) resetMenueColor();
    // eslint-disable-next-line
  }, [tasortOpt]);

  /* Reset preview */
  const resetPrev = () => {
    setImgPrev(topArtists[0].img);
    setTitle(topArtists[0].title);
    setOrder(1);
    setGenre(topArtists[0].genre);
    setPopularity(topArtists[0].popularity);
    setArtist(null);
    setYear(null);
    fac
      .getColorAsync(topArtists[0].img, {
        algorithm: "dominant",
      })
      .then((color) => {
        setDomColor(color.hex);
        color.isLight ? setLight(true) : setLight(false);
      });
  };

  /*  Soring  */
  const sortPopA = () => {
    setTaSortOpt("Popularity Asc");
    const temp = topArtists;
    temp.sort((a, b) => {
      return a.popularity - b.popularity;
    });
    setTopArtists(temp);
    resetPrev();
  };
  const sortPopD = () => {
    setTaSortOpt("Popularity Desc");
    const temp = topArtists;
    temp.sort((a, b) => {
      return b.popularity - a.popularity;
    });
    setTopArtists(temp);
    resetPrev();
  };
  const sortAff = () => {
    setTaSortOpt("Affinity");
    setTopArtists(JSON.parse(localStorage.getItem("prevTopArtists")));
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
      {topArtists.length > 1 ? (
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
                  {tasortOpt === "Affinity" ? <TfiCheck /> : null}
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
                  {tasortOpt === "Popularity Asc" ? <TfiCheck /> : null}
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
                  {tasortOpt === "Popularity Desc" ? <TfiCheck /> : null}
                </MenuItem>
              </Menu>
            </Menu>
          </IconCnt>
        </IconList>
      ) : null}
    </>
  );
};

export default TaPrevMenue;

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
