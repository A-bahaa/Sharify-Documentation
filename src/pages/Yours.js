import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import SideBar from "../components/SideBar";
import TopTracks from "../components/TopTracks";
import TopArtists from "../components/TopArtists";
import SavedTracks from "../components/SavedTracks";
import RefreshModal from "../modals/RefreshModal";
import {
  tResponceFallback,
  sResponceFallback,
  taResponceFallback,
} from "../helperVars";
import Loading from "../components/Loading";
import LoadingSideBar from "../components/LoadingSideBar";
import styled from "styled-components";
import SmallScreen from "../components/SmallScreen";
const Yours = ({ Auth }) => {
  const hash = window.location.hash;
  const StoredToken = window.localStorage.getItem("token");
  const [itemSelected, setItemSelected] = useState("Monthly Top Tracks");
  const [domColor, setDomColor] = useState("white");
  const [imgPrev, setImgPrev] = useState("");
  const [rotateLogo, setRotateLogo] = useState(false);
  const [light, setLight] = useState(false);
  const [title, setTitle] = useState("title");
  const [order, setOrder] = useState(0);
  const [year, setYear] = useState("****");
  const [popularity, setPopularity] = useState(0);
  const [artist, setArtist] = useState("artist");
  const [genre, setGenre] = useState("genre");
  const [ttArtists, setTtArtists] = useState([]);
  const [ttGenre, setTtGenre] = useState([]);
  const [ttIds, setTtIds] = useState([]);
  const [ttLikes, setTtLikes] = useState([]);
  const [tgmap, setTgmap] = useState({});
  const [tlmap, setTlmap] = useState({});
  const [user, setUser] = useState({});
  const [topTracks, setTopTracks] = useState(
    JSON.parse(localStorage.getItem("topTracks")) || []
  );
  const [ttsortOpt, setTtSortOpt] = useState("Affinity");
  const [savedTracks, setSavedTracks] = useState(
    JSON.parse(localStorage.getItem("savedTracks")) || []
  );
  const [stArtists, setStArtists] = useState([]);
  const [stIds, setStIds] = useState([]);
  const [stGenre, setStGenre] = useState([]);
  const [sgmap, setSgmap] = useState({});
  const [slmap, setSlmap] = useState({});
  const [stsortOpt, setStSortOpt] = useState("Date added");
  const [savedIsEmpty, setSavedIsEmpty] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [topArtists, setTopArtists] = useState(
    JSON.parse(localStorage.getItem("topArtists")) || []
  );
  const [topArtistsIds, setTopArtistsIds] = useState([]);
  const [topArtistsFoll, setTopArtistsFoll] = useState([]);
  const [topArtistsPrev, setTopArtistsPrev] = useState([]);
  const [almap, setAlmap] = useState({});
  const [apmap, setApmap] = useState({});
  const [tasortOpt, setTaSortOpt] = useState("Affinity");

  document.getElementById("myHtml").style.backgroundColor = domColor;

  /* loading period*/
  setTimeout(() => {
    setLoading(false);
  }, 2000);

  /*Check for token and Parse it*/
  useEffect(() => {
    if (hash) {
      let ParsedToken = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", ParsedToken);
    }
    // eslint-disable-next-line
  }, []);

  // Get the current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responce = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        });
        setUser(responce.data);
      } catch (err) {
        setShowModal(true);
      }
    };
    fetchUser();
  }, []);

  //TOP TRACKS
  /*Get top tracks and if token expired show modal*/
  useEffect(() => {
    const artistsId = [];
    const tracksId = [];
    const fetchTopTracks = async () => {
      try {
        const responce = await axios.get(
          "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=48",
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        );
        if (responce.data.total === 0) {
          setTopTracks(tResponceFallback);
          setTtArtists(["3fyyPt5BZ20BkmqVcQV6wS"]);
          setTtIds(["4LsRw6dxmKwQBdVhO0TuJl"]);
        } else {
          for (let i = 0; i < responce.data.items.length; i++) {
            artistsId.push(responce.data.items[i].artists[0].id);
            tracksId.push(responce.data.items[i].id);
          }
          setTopTracks(responce.data.items);
          setTtArtists(artistsId);
          setTtIds(tracksId);
          localStorage.setItem(
            "topTracks",
            JSON.stringify(responce.data.items)
          );
        }
      } catch (err) {
        console.log("show modal");
        setShowModal(true);
      }
    };
    fetchTopTracks();
    // eslint-disable-next-line
  }, []);

  /*Get top tracks genres from their artists*/
  useEffect(() => {
    let ids = "";
    let artistsGen = [];
    for (let i = 0; i < ttArtists.length; i++) {
      ids += ttArtists[i];
      if (i < ttArtists.length - 1) ids += ",";
    }
    const fetchTtGenre = async () => {
      try {
        const responce = await axios.get(
          `https://api.spotify.com/v1/artists?ids=${ids}`,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        );
        for (let i = 0; i < responce.data.artists.length; i++) {
          if (responce.data.artists[i].genres[0])
            artistsGen.push(responce.data.artists[i].genres[0]);
          else artistsGen.push(null);
        }
        setTtGenre(artistsGen);
      } catch (err) {}
    };
    if (topTracks.length > 0) fetchTtGenre();
    // eslint-disable-next-line
  }, [ttArtists]);

  /*make the track-genre map*/
  useEffect(() => {
    const obj = {};
    ttArtists.forEach((element, index) => {
      obj[element] = ttGenre[index];
    });
    setTgmap(obj);
    //eslint-disable-next-line
  }, [ttGenre]);

  /*check which of the top tracks is saved to the user library*/
  useEffect(() => {
    let ids = "";
    for (let i = 0; i < ttIds.length; i++) {
      ids += ttIds[i];
      if (i < ttIds.length - 1) ids += ",";
    }
    const fetchTtLikes = async () => {
      try {
        const responce = await axios.get(
          `https://api.spotify.com/v1/me/tracks/contains?ids=${ids}`,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        );
        setTtLikes(responce.data);
      } catch (err) {}
    };
    if (topTracks.length > 0) fetchTtLikes();
    // eslint-disable-next-line
  }, [ttIds]);

  /*make the track-liked map*/
  useEffect(() => {
    const obj = {};
    ttIds.forEach((element, index) => {
      obj[element] = ttLikes[index];
    });
    setTlmap(obj);

    //eslint-disable-next-line
  }, [ttLikes]);

  //SAVED TRACKS
  useEffect(() => {
    const artistsId = [];
    const tracksId = [];
    let itemsph = [];
    let reqUrl = "https://api.spotify.com/v1/me/tracks?limit=50&offset=0";
    const fetchSavedTracks = async () => {
      try {
        while (true) {
          const responce = await axios.get(reqUrl, {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          });
          for (let j = 0; j < responce.data.items.length; j++) {
            if (responce.data.items[j].track === null) {
              continue;
            } else {
              itemsph.push(responce.data.items[j]);
            }
          }
          if (responce.data.next === null) break;
          else reqUrl = responce.data.next;
        }

        if (itemsph.length === 0) {
          setSavedTracks(sResponceFallback);
          setStArtists(["3fyyPt5BZ20BkmqVcQV6wS"]);
          setStIds(["4LsRw6dxmKwQBdVhO0TuJl"]);
          setSavedIsEmpty(true);
        } else {
          setSavedTracks(itemsph);
          console.log(itemsph);
          localStorage.setItem("savedTracks", JSON.stringify(itemsph));
          for (let i = 0; i < itemsph.length; i++) {
            artistsId.push(itemsph[i].track.artists[0].id);
            tracksId.push(itemsph[i].track.id);
          }
          setStArtists(artistsId);
          setStIds(tracksId);
        }
      } catch (err) {
        console.log("show modal");
        //setShowModal(true);
      }
    };

    fetchSavedTracks();
    // eslint-disable-next-line
  }, []);

  /*Get savedtracks genres from their artists*/
  useEffect(() => {
    let artistsGen = [];
    const fetchTtGenre = async () => {
      try {
        for (let i = 0; i < stArtists.length; i += 50) {
          let ids = "";
          for (let j = i; j < i + 50 && j < stArtists.length; j++) {
            ids += stArtists[j];
            ids += ",";
          }
          ids = ids.substring(0, ids.length - 1);
          const responce = await axios.get(
            `https://api.spotify.com/v1/artists?ids=${ids}`,
            {
              headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
              },
            }
          );

          for (let k = 0; k < responce.data.artists.length; k++) {
            if (responce.data.artists[k].genres[0])
              artistsGen.push(responce.data.artists[k].genres[0]);
            else artistsGen.push(null);
          }
        }

        setStGenre(artistsGen);
      } catch (err) {}
    };
    if (savedTracks.length > 0) fetchTtGenre();
    // eslint-disable-next-line
  }, [stArtists]);

  /*make the saved-genre map*/
  useEffect(() => {
    const obj = {};
    stArtists.forEach((element, index) => {
      obj[element] = stGenre[index];
    });
    setSgmap(obj);
    //eslint-disable-next-line
  }, [stGenre]);

  /*make the saved-tracks-liked map*/
  useEffect(() => {
    const obj = {};
    if (savedIsEmpty) {
      stIds.forEach((element) => {
        obj[element] = false;
      });
    } else {
      stIds.forEach((element) => {
        obj[element] = true;
      });
    }
    setSlmap(obj);
    // eslint-disable-next-line
  }, [stIds]);

  // TOP ARTISTS
  /*Get top artists and if token expired show modal*/
  useEffect(() => {
    const artistsId = [];
    const fetchTopArtists = async () => {
      try {
        const responce = await axios.get(
          "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50",
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        );
        if (responce.data.total === 0) {
          setTopArtists(taResponceFallback);
          setTopArtistsIds(["7Ln80lUS6He07XvHI8qqHH"]);
        } else {
          for (let i = 0; i < responce.data.items.length; i++) {
            artistsId.push(responce.data.items[i].id);
          }
          setTopArtists(responce.data.items);
          setTopArtistsIds(artistsId);
          localStorage.setItem(
            "topArtists",
            JSON.stringify(responce.data.items)
          );
        }
      } catch (err) {
        console.log("show modal");
        setShowModal(true);
      }
    };
    fetchTopArtists();
    // eslint-disable-next-line
  }, []);

  /*check which of the top artists is followed by the user*/
  useEffect(() => {
    let ids = "";
    for (let i = 0; i < topArtistsIds.length; i++) {
      ids += topArtistsIds[i];
      if (i < topArtistsIds.length - 1) ids += ",";
    }
    const fetchTaFollow = async () => {
      try {
        const responce = await axios.get(
          `https://api.spotify.com/v1/me/following/contains?type=artist&&ids=${ids}`,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        );
        setTopArtistsFoll(responce.data);
      } catch (err) {}
    };
    if (topArtists.length > 0) fetchTaFollow();
    // eslint-disable-next-line
  }, [topArtistsIds]);

  /*make the artist-follow map*/
  useEffect(() => {
    const obj = {};
    topArtistsIds.forEach((element, index) => {
      obj[element] = topArtistsFoll[index];
    });
    setAlmap(obj);

    //eslint-disable-next-line
  }, [topArtistsFoll]);

  /*Get the preview song for each artist*/
  useEffect(() => {
    let artistsPrev = [];
    const fetchTaPrev = async () => {
      try {
        for (let i = 0; i < topArtistsIds.length; i++) {
          const responce = await axios.get(
            `https://api.spotify.com/v1/artists/${topArtistsIds[i]}/top-tracks?market=EG`,
            {
              headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
              },
            }
          );
          artistsPrev.push(responce.data.tracks[0].preview_url);
        }
        setTopArtistsPrev(artistsPrev);
      } catch (err) {}
    };
    fetchTaPrev();
    // eslint-disable-next-line
  }, [topArtistsIds]);

  /*make the artist-preview map*/
  useEffect(() => {
    const obj = {};
    topArtistsIds.forEach((element, index) => {
      obj[element] = topArtistsPrev[index];
    });
    setApmap(obj);
    // eslint-disable-next-line
  }, [topArtistsPrev]);

  return (
    <>
      {" "}
      <Wrap>
        {/*If user isn't authenticated, redirect to landing page*/}
        {!hash && !StoredToken ? <Navigate to="/" /> : null}
        {loading && <Loading LSB={<LoadingSideBar />} />}

        {!loading && showModal ? (
          <RefreshModal
            Auth={Auth}
            onClose={() => {
              setShowModal(false);
            }}
          ></RefreshModal>
        ) : null}

        {!loading ? (
          <>
            <div
              style={{
                width: "100%",
                height: "auto",
                display: "flex",
                backgroundColor: `${domColor}`,
              }}
            >
              <SideBar
                itemSelected={itemSelected}
                setItemSelected={setItemSelected}
                imgPrev={imgPrev}
                rotateLogo={rotateLogo}
                light={light}
                title={title}
                order={order}
                year={year}
                genre={genre}
                popularity={popularity}
                artist={artist}
              ></SideBar>
              {itemSelected === "Monthly Top Tracks" ? (
                <TopTracks
                  setDomColor={setDomColor}
                  setImgPrev={setImgPrev}
                  setRotateLogo={setRotateLogo}
                  setLight={setLight}
                  setTitle={setTitle}
                  setOrder={setOrder}
                  setYear={setYear}
                  setGenre={setGenre}
                  setPopularity={setPopularity}
                  setArtist={setArtist}
                  topTracks={topTracks}
                  setTopTracks={setTopTracks}
                  tgmap={tgmap}
                  tlmap={tlmap}
                  setShowModal={setShowModal}
                  setTlmap={setTlmap}
                  otherLmap={slmap}
                  setOtherLmap={setSlmap}
                  user={user}
                  ttsortOpt={ttsortOpt}
                  setTtSortOpt={setTtSortOpt}
                />
              ) : null}

              {itemSelected === "Monthly Top Artists" ? (
                <TopArtists
                  setDomColor={setDomColor}
                  setImgPrev={setImgPrev}
                  setRotateLogo={setRotateLogo}
                  setLight={setLight}
                  setTitle={setTitle}
                  setOrder={setOrder}
                  setYear={setYear}
                  setGenre={setGenre}
                  setPopularity={setPopularity}
                  setArtist={setArtist}
                  topArtists={topArtists}
                  setTopArtists={setTopArtists}
                  almap={almap}
                  setAlmap={setAlmap}
                  apmap={apmap}
                  setShowModal={setShowModal}
                  user={user}
                  tasortOpt={tasortOpt}
                  setTaSortOpt={setTaSortOpt}
                />
              ) : null}
              {itemSelected === "All-Time Liked Tracks" ? (
                <SavedTracks
                  setDomColor={setDomColor}
                  setImgPrev={setImgPrev}
                  setRotateLogo={setRotateLogo}
                  setLight={setLight}
                  setTitle={setTitle}
                  setOrder={setOrder}
                  setYear={setYear}
                  setGenre={setGenre}
                  setPopularity={setPopularity}
                  setArtist={setArtist}
                  savedTracks={savedTracks}
                  setSavedTracks={setSavedTracks}
                  sgmap={sgmap}
                  setShowModal={setShowModal}
                  user={user}
                  slmap={slmap}
                  setSlmap={setSlmap}
                  otherLmap={tlmap}
                  setOtherLmap={setTlmap}
                  stsortOpt={stsortOpt}
                  setStSortOpt={setStSortOpt}
                  savedIsEmpty={savedIsEmpty}
                />
              ) : null}
            </div>
          </>
        ) : null}
      </Wrap>
      <SmallScreen></SmallScreen>
    </>
  );
};

export default Yours;

const Wrap = styled.div`
  @media (max-width: 1100px) {
    display: none;
  }
`;
