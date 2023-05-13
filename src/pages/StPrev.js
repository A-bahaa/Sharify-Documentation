import React, { useEffect, useState } from "react";
import axios from "axios";
import RefreshModal from "../modals/RefreshModal";
import Loading from "../components/Loading";
import PreviewSideBar from "../components/PreviewSideBar";
import { FastAverageColor } from "fast-average-color";
import PrevLoadingSideBar from "../components/PrevLoadingSideBar";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import StPrevBody from "../components/StPrevBody";
import styled from "styled-components";
import SmallScreen from "../components/SmallScreen";
const StPrev = ({ Auth }) => {
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
  const [slmap, setSlmap] = useState({});
  const [user, setUser] = useState({});
  const [stLikes, setStLikes] = useState([]);
  const [savedTracks, setSavedTracks] = useState([]);
  // eslint-disable-next-line
  const [stIds, setStIds] = useState([
    "0tOQdr6q6NZFHrywSQSVJP",
    "5Oc0vLGWdEWeCqIU8zyELt",
    "4woTEX1wYOTGDqNXuavlRC",
  ]);
  const [stsortOpt, setStSortOpt] = useState("Date added");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
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

  /*fetching preview savedtracks from mongoDB Atlas*/
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
          setSavedTracks(res.data.cards);
          setMeta(res.data.meta);
          setStIds(ids);
          localStorage.setItem(
            "prevSavedTracks",
            JSON.stringify(res.data.cards)
          );
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

    if (savedTracks.length > 0) intiatePrev();

    // eslint-disable-next-line
  }, [savedTracks]);

  /*Checking what the current user like from the preview tracks */
  useEffect(() => {
    let LikesArr = [];
    const fetchStLikes = async () => {
      try {
        for (let i = 0; i < stIds.length; i += 50) {
          let ids = "";
          for (let j = i; j < i + 50 && j < stIds.length; j++) {
            ids += stIds[j];
            ids += ",";
          }
          ids = ids.substring(0, ids.length - 1);
          const responce = await axios.get(
            `https://api.spotify.com/v1/me/tracks/contains?ids=${ids}`,
            {
              headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
              },
            }
          );

          for (let k = 0; k < responce.data.length; k++) {
            LikesArr.push(responce.data[k]);
          }
        }

        setStLikes(LikesArr);
        //console.log(LikesArr);
      } catch (err) {}
    };
    if (window.localStorage.getItem("token")) fetchStLikes();
    // eslint-disable-next-line
  }, [stIds]);

  /*make the track-liked map*/
  useEffect(() => {
    const obj = {};
    stIds.forEach((element, index) => {
      obj[element] = stLikes[index];
    });
    setSlmap(obj);
    //eslint-disable-next-line
  }, [stLikes]);

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
                type={"Liked Tracks"}
              ></PreviewSideBar>
              <StPrevBody
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
                slmap={slmap}
                setShowModal={setShowModal}
                setSlmap={setSlmap}
                user={user}
                stsortOpt={stsortOpt}
                setStSortOpt={setStSortOpt}
                meta={meta}
              ></StPrevBody>
            </div>
          </>
        ) : null}
      </Wrap>
      <SmallScreen></SmallScreen>
    </>
  );
};

export default StPrev;

const Wrap = styled.div`
  @media (max-width: 1100px) {
    display: none;
  }
`;

/*
{
      artist: "Asmahan",
      genre: "CLASSIC ARAB POP",
      img: "https://i.scdn.co/image/ab67616d0000b2735e386e1555ec2cc9b24b2642",
      popularity: 37,
      preview_url:
        "https://p.scdn.co/mp3-preview/02989db0228cb3df8dc7eb7ff22984e7803f5dcc?cid=5bb9526f55034e9da5b76af815696e62",
      title: "Ya habibi taala (Mon amour, viens vite)",
      year: "2005",
      id: "0tOQdr6q6NZFHrywSQSVJP",
    },
    {
      title: "Superman",
      artist: "Eminem",
      year: "2002",
      popularity: 88,
      genre: "DETROIT HIP HOP",
      img: "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
      preview_url:
        "https://p.scdn.co/mp3-preview/8625034728d0e1a6971ab17f003fecaad74f63b4?cid=5bb9526f55034e9da5b76af815696e62",
      id: "4woTEX1wYOTGDqNXuavlRC",
    },
    {
      artist: "Big Mama Thornton",
      genre: "ACOUSTIC BLUES",
      img: "https://i.scdn.co/image/ab67616d0000b273f25345e400eb77c2d49f8558",
      popularity: 57,
      preview_url:
        "https://p.scdn.co/mp3-preview/8a36fef7cc58e415b09f472062d529ad75f6888a?cid=5bb9526f55034e9da5b76af815696e62",
      title: "Hound Dog",
      year: "1989",
      id: "5Oc0vLGWdEWeCqIU8zyELt",
    },

*/
