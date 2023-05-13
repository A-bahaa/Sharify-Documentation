import React, { useEffect, useState } from "react";
import axios from "axios";
import RefreshModal from "../modals/RefreshModal";
import Loading from "../components/Loading";
import PreviewSideBar from "../components/PreviewSideBar";
import TtPrevBody from "../components/TtPrevBody";
import PrevLoadingSideBar from "../components/PrevLoadingSideBar";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FastAverageColor } from "fast-average-color";
import styled from "styled-components";
import SmallScreen from "../components/SmallScreen";
const TtPrev = ({ Auth }) => {
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
  const [tlmap, setTlmap] = useState({});
  const [user, setUser] = useState({});
  const [ttLikes, setTtLikes] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [ttIds, setTtIds] = useState([
    "0tOQdr6q6NZFHrywSQSVJP",
    "5Oc0vLGWdEWeCqIU8zyELt",
    "4woTEX1wYOTGDqNXuavlRC",
  ]);
  const [ttsortOpt, setTtSortOpt] = useState("Affinity");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [meta, setMeta] = useState({
    user_name: "Ahmed Ghonim",
    date_month: "Apr",
    date_day: 18,
  });
  const fac = new FastAverageColor();

  document.getElementById("myHtml").style.backgroundColor = domColor;

  /* loading period*/
  setTimeout(() => {
    setLoading(false);
  }, 3000);

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
    if (window.localStorage.getItem("token")) fetchUser();
  }, []);

  /*fetching preview toptracks from mongoDB Atlas*/
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        let ids = [];
        const res = await axios({
          method: "get",
          url: `https://eu-west-1.aws.data.mongodb-api.com/app/application-0-uvvbg/endpoint/Getcards?id=${searchParams.get(
            "id"
          )}`,
          headers: {},
        });
        if (res.data) {
          for (let i = 0; i < res.data.cards.length; i++) {
            ids.push(res.data.cards[i].id);
          }
          setTopTracks(res.data.cards);
          setMeta(res.data.meta);
          setTtIds(ids);
          localStorage.setItem("prevTopTracks", JSON.stringify(res.data.cards));
        } else {
          navigate("/notFound");
        }
        //console.log(res);
      } catch (err) {
        console.log(err);
        navigate("/notFound");
      }
    };
    fetchTracks();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const intiatePrev = () => {
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
    if (topTracks.length > 0) intiatePrev();
    // eslint-disable-next-line
  }, [topTracks]);

  /*Checking what the current user like from the preview tracks */
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

    if (window.localStorage.getItem("token")) fetchTtLikes();
    //eslint-disable-next-line
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

  return (
    <>
      <Wrap>
        {loading && <Loading LSB={<PrevLoadingSideBar />} />}

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
              <PreviewSideBar
                imgPrev={imgPrev}
                rotateLogo={rotateLogo}
                light={light}
                title={title}
                order={order}
                year={year}
                genre={genre}
                popularity={popularity}
                artist={artist}
                meta={meta}
                type={"Top Tracks"}
              ></PreviewSideBar>
              <TtPrevBody
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
                tlmap={tlmap}
                setShowModal={setShowModal}
                setTlmap={setTlmap}
                user={user}
                ttsortOpt={ttsortOpt}
                setTtSortOpt={setTtSortOpt}
                meta={meta}
              ></TtPrevBody>
            </div>
          </>
        ) : null}
      </Wrap>
      <SmallScreen></SmallScreen>
    </>
  );
};

export default TtPrev;

const Wrap = styled.div`
  @media (max-width: 1100px) {
    display: none;
  }
`;
