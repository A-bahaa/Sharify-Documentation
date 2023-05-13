import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Yours from "./pages/Yours";
import TtPrev from "./pages/TtPrev";
import StPrev from "./pages/StPrev";
import TaPrev from "./pages/TaPrev";

const App = () => {
  const Auth = {
    CLIENT_ID: process.env.REACT_APP_CLIENT_ID,
    REDIRECT_URI: process.env.REACT_APP_REDIRECT_URI,
    SCOPE: process.env.REACT_APP_SCOPE,
    AUTH_ENDPOINT: process.env.REACT_APP_AUTH_ENDPOINT,
    RESPONSE_TYPE: process.env.REACT_APP_RESPONSE_TYPE,
  };
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing Auth={Auth} />} />
        <Route path="/Yours" element={<Yours Auth={Auth} />} />
        <Route path="/TopTracks" element={<TtPrev Auth={Auth} />} />
        <Route path="/LikedTracks" element={<StPrev Auth={Auth} />} />
        <Route path="/TopArtists" element={<TaPrev Auth={Auth} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
