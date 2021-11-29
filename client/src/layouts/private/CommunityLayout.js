import { Route } from "react-router-dom";
import AppHeader from "./AppHeader";
import CommunityPage from "../../pages/communities/CommunityPage";
import "./CommunityLayout.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import CommunityContext from "../../contexts/CommunityContext";

import ReactLoading from "react-loading";

import CommunityDataService from "../../services/community";

export default function CommunityLayout() {
  const [currentCommunity, setCurrentCommunity] = useState({});
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    CommunityDataService.get(params.id)
      .then((res) => {
        setCurrentCommunity(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);

  return (
    <>
      <CommunityContext.Provider value={{ currentCommunity }}>
        <AppHeader className="CommunityHeader" />
        <main className="CommunityLayout">
          {isLoading || !currentCommunity ? (
            // <div className="mt-2 fs-1_5">
            //   Holy cow! Can't load that community!
            // </div>

            <ReactLoading
              type={"bars"}
              color={"#9773a7"}
              height={100}
              width={100}
              className="PageLoadingAnimation"
            />
          ) : (
            // <Switch>
            <Route path="/communities/:id" component={CommunityPage} />
            // </Switch>
          )}
        </main>
      </CommunityContext.Provider>
    </>
  );
}
